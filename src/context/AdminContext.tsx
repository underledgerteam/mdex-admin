import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const { ethereum } = window;

type AdminContextProviderType = {
  adminAccount: string;
  errorMessage: string;
  adminBalance: string;
  currentNetwork: number | string;
  handleFormData: (item: { addressTo: string; amount: string }) => void;
  connectWallet: () => Promise<void>;
  checkIfWalletIsConnected: () => Promise<void>;
  sendTransaction: () => Promise<void>;
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
  const [adminBalance, setAdminBalance] = useState<string>(""); // for test case before get treasury
  const [currentNetwork, setCurrentNetwork] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<{
    addressTo: string;
    amount: string;
  }>({
    addressTo: "",
    amount: "",
  });

  const changeHandler = (account: string): void => {
    if (account === "0x733c6f2c476bb2bae4d9d694377ef109c0a576f6"){
      // Jab address
      setAdminAccount(account);
      getAdminBalance(account);
    }
    else if (account === "0x586F45EF74679373EFAfcEF08f7035fB699F40dd"){
      // P'Jo address
      setAdminAccount(account);
      getAdminBalance(account);
    }
    else { setErrorMessage("Access denied");
    }
  };

  const handleFormData = (item: { addressTo: string; amount: string }) => {
    setFormData(item);
  };

  const getAdminBalance = async (account: string) => {
    try {
    const balance = await ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    
      setAdminBalance(ethers.utils.formatEther(balance));
    } catch(error) {
      console.log(error)
      
      throw new Error("No ethereum object.");
    }
  }

  const connectWallet = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      // const balance = await provider.getBalance(accounts[0]);
      
      // setAdminAccount(accounts[0]);
      changeHandler(accounts[0]);
      // setAdminBalance(ethers.utils.formatEther(balance));

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  
  const myNetwork = async() => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    return chainId;
  };

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");

       const accounts = await ethereum.request({ method: "eth_accounts" });// use this line of code, it just request account, not try to connect MetaMask
       const currentChain = await myNetwork();
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const accounts = await provider.send("eth_requestAccounts", []);
      // const balance = await provider.getBalance(accounts[0]);

      if (accounts.length) {
        changeHandler(accounts[0]);
        setAdminAccount(accounts[0]);
        setCurrentNetwork(currentChain);
        // setAdminBalance(ethers.utils.formatEther(balance));

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async (): Promise<void> => {
    try {
      
      if (!ethereum) return alert("Please install metamask");

      const { addressTo, amount } = formData;
      console.log("before parseAmount")
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log("I'm here!")
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

  useEffect(() => {
    checkIfWalletIsConnected();
    // console.log(formData);
  },[]);

  return (
    <AdminContext.Provider
      value={{
        adminAccount,
        errorMessage,
        adminBalance,
        handleFormData,
        connectWallet,
        checkIfWalletIsConnected,
        sendTransaction,
        currentNetwork,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};