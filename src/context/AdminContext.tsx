import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { SWAP_CONTRACTS, SUPPORT_CHAIN, ADMIN_WALLET, MULTI_SIG_WALLET_CONTRACTS } from "../utils/constants";
import { DangerNotification } from "../components/shared/Notification";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const { ethereum } = window;

type AdminContextProviderType = {
  adminAccount: string;
  errorMessage: string;
  adminBalance: string;
  currentNetwork: number | string;
  isConnected: boolean;
  isSupported: boolean;
  isAdmin: boolean;
  connectWallet: () => Promise<void>;
  checkIfWalletIsConnected: () => Promise<void>;
  sendTransaction: (addressTo: string, amount: string) => Promise<void>;
  updateSwitchChain: (value: string | number) => void;
};

type AdminContextProviderProps = {
  children: React.ReactNode;
};

export const AdminContext = createContext<AdminContextProviderType | null>(
  null
);

export const AdminContextProvider = ({
  children,
}: AdminContextProviderProps) => {
  const [adminAccount, setAdminAccount] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [adminBalance, setAdminBalance] = useState<string>(""); // for test case before get treasury
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentNetwork, setCurrentNetwork] = useState<number | string>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const changeHandler = (account: string | any): void => {

    if (isAdmin) {
      setAdminAccount(account);
      getAdminBalance(account);
    }
    else {
      setErrorMessage("Access denied");
    }
  };

  const getAdminBalance = async (account: string) => {
    try {
      const balance = await ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });

      setAdminBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const provider = new ethers.providers.Web3Provider(ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);// use this line of code, it just request account, not try to connect MetaMask
      const currentChain = await myNetwork();
      const { chainId } = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      setAdminAccount(accounts[0]);
      console.log(accounts[0]);
      setAdminBalance(ethers.utils.formatEther(balance));
      setCurrentNetwork(currentChain);
      setCurrentNetwork(currentChain);
      setIsConnected(true);
      setIsSupported(SUPPORT_CHAIN.includes(chainId));
      setIsAdmin(ADMIN_WALLET.includes(accounts[0]));

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };


  // Chain Network
  const myNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    return chainId;
  };
  const updateSwitchChain = async (chain: string | number) => {
    const beforeSwitchSwapObj = currentNetwork;
    try {
      await walletSwitchChain(Number(chain));
      setCurrentNetwork(chain);
    } catch (error: any) {
      setCurrentNetwork(beforeSwitchSwapObj);
      <DangerNotification
        message={error.toString()}
      />;
    }
  };
  const walletSwitchChain = async (chainId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const currentChain = await myNetwork();
      if (chainId !== currentChain) {
        await provider.send("wallet_switchEthereumChain", [{ chainId: ethers.utils.hexValue(chainId) }]);
      }
    } catch (error: any) {
      if (error.code === 4902) {
        await walletAddChain(chainId);
      }
      throw new Error("Can't Switch Chain");
    }
  };
  const walletAddChain = async (chainId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("wallet_addEthereumChain", [{
        chainId: ethers.utils.hexValue(Number(chainId)),
        chainName: SWAP_CONTRACTS[chainId].NETWORK_NAME,
        nativeCurrency: {
          name: SWAP_CONTRACTS[chainId].NATIVE_CURRENCY!.NAME,
          symbol: SWAP_CONTRACTS[chainId].NATIVE_CURRENCY!.SYMBOL,
          decimals: SWAP_CONTRACTS[chainId].NATIVE_CURRENCY!.DECIMALS,
        },
        rpcUrls: SWAP_CONTRACTS[chainId].RPC_URLS,
        blockExplorerUrls: SWAP_CONTRACTS[chainId].BLOCK_EXPLORER_URLS,
      }]);
    } catch (error) {
      throw new Error(`Can't Add ${SWAP_CONTRACTS[chainId].NETWORK_NAME} to Wallet`);
    }
  };

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });// use this line of code, it just request account, not try to connect MetaMask
      const currentChain = await myNetwork();

      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      if (accounts.length) {
        setAdminAccount(accounts[0]);
        setAdminBalance(ethers.utils.formatEther(balance));
        setCurrentNetwork(currentChain);
        setIsConnected(true);
        setIsSupported(SUPPORT_CHAIN.includes(chainId));
        setIsAdmin(ADMIN_WALLET.includes(accounts[0]));

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async (addressTo: string, amount: string): Promise<void> => {
    console.log("before try");
    try {
      console.log("before if ethereum");
      if (!ethereum) return alert("Please install metamask");

      console.log("before parseAmount");
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log("I'm here!");
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: adminAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEL
            value: parsedAmount._hex, // eth => GWEL
          },
        ],
      });

      window.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  const handleAccountChange = (accounts: Array<string>): void => {
    if (accounts.length > 0) {
      setAdminAccount(accounts[0]);
    } else {
      window.location.reload();
    }
  };
  const handleChainChange = (chainId: string): void => {
    window.location.reload();
  };


  const getTreasuryBalance = async () => {
    try {
      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[Number(currentNetwork)];
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      const response = await contract.getBalance();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkIfWalletIsConnected();
      ethereum?.on("accountsChanged", handleAccountChange);
      ethereum?.on("chainChanged", handleChainChange);
    };
    init();
    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountChange);
      ethereum?.removeListener("chainChanged", handleChainChange);
    };
  }, [adminAccount]);

  useEffect(() => {
    const init = async () => {
      await getTreasuryBalance();
    };
    if (isConnected) {
      init();
    }
  }, [isConnected, adminAccount]);

  return (
    <AdminContext.Provider
      value={{
        adminAccount,
        errorMessage,
        adminBalance,
        connectWallet,
        checkIfWalletIsConnected,
        sendTransaction,
        currentNetwork,
        updateSwitchChain,
        isSupported,
        isAdmin,
        isConnected
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};