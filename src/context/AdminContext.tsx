import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { SUPPORT_CHAIN } from "../utils/constants";

import { SWAP_CONTRACTS } from "../utils/constants"

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const { ethereum } = window;

type AdminContextProviderType = {
  adminAccount: string;
  errorMessage: string;
  connectWallet: () => Promise<void>;
  checkIfWalletIsConnected: () => Promise<void>;
  walletSwitchChain: (chainId: number) => void;
};

type AdminContextProviderProps = {
  children: React.ReactNode;
};

export const AdminContext = createContext<AdminContextProviderType | null>(null);

export const AdminContextProvider = ({
  children,
}: AdminContextProviderProps) => {
  const [adminAccount, setAdminAccount] = useState<string>("");
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const changeHandler = (account: string): void => {
    if(account == "0x733c6f2c476bb2bae4d9d694377ef109c0a576f6")
      setAdminAccount(account);
    else if (account == "0x586F45EF74679373EFAfcEF08f7035fB699F40dd")
      setAdminAccount(account);
    else 
      setErrorMessage("Access denied");
  }

  const connectWallet = async (): Promise<void> => {
    
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
      const accounts = await provider.send("eth_requestAccounts", []);
      //const signer = provider.getSigner(); // Holds your private key and can sign things
      setAdminAccount(accounts[0]);
      // changeHandler(accounts[0]);
    } else {
      alert("Please install MetaMask"); //can't assign to parameter of type 'SetStateAction<null or undefine>'
    }
  };

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setAdminAccount(accounts[0]);
        setIsSupported(SUPPORT_CHAIN.includes(chainId));
      } else {
        console.log("No accounts found");
      }

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
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
  const currentNetwork = async() => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    return chainId;
  };
  const walletSwitchChain = async (chainId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const currentChain = await currentNetwork();
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

  useEffect(() => {
    const init = async () => {
      await checkIfWalletIsConnected();
    };
    init();
  }, [adminAccount]);

  return (
    <AdminContext.Provider value={{ adminAccount, errorMessage, connectWallet, checkIfWalletIsConnected, walletSwitchChain }}>
      {children}
    </AdminContext.Provider>
  );
};