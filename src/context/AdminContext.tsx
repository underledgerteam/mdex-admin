import React, { useState, createContext } from "react";
import { ethers } from "ethers";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const { ethereum } = window;

type AdminContextProviderType = {
  adminAccount: string
  errorMessage: string
  connectWallet: () => Promise<void>
  checkIfWalletIsConnected: () => Promise<void>
};

type AdminContextProviderProps = {
  children: React.ReactNode;
};
export const AdminContext = createContext<AdminContextProviderType | null>(null);

export const AdminContextProvider = ({
  children,
}: AdminContextProviderProps) => {
  const [adminAccount, setAdminAccount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const changeHandler = (account: string): void => {
    if(account === "0x733c6f2c476bb2bae4d9d694377ef109c0a576f6")
      setAdminAccount(account);
    else 
      setErrorMessage("Access denied");
  }

  const connectWallet = async (): Promise<void> => {
    alert("Connect to Metamask!!");
    console.log("hello");
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
      const accounts = await provider.send("eth_requestAccounts", []);
      //const signer = provider.getSigner(); // Holds your private key and can sign things
      changeHandler(accounts[0]);
    } else {
      alert("Please install MetaMask"); //can't assign to parameter of type 'SetStateAction<null or undefine>'
    }
  };

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setAdminAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  return (
    <AdminContext.Provider value={{ adminAccount, errorMessage, connectWallet, checkIfWalletIsConnected }}>
      {children}
    </AdminContext.Provider>
  );
};