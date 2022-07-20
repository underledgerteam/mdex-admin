import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

// context
import { ActionContextInterface, ActionProviderInterface } from "../types/contexts/action.context";
import { MULTI_SIG_WALLET_CONTRACTS } from "src/utils/constants"
declare var window: any;

const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  balance: 0

};

export const ActionContext = createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {

  const [balance, setBalance] = useState(0);


  const voteConfirmTransaction = async (txnId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      const response = await contract.confirmTransaction({ transactionId: txnId });
      // onSuccess call getAllTransaction
    } catch (error) {
      console.log(error);
    }
  };

  const voteNotConfirmTransaction = async (txnId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      const response = await contract.noConfirmTransaction({ transactionId: txnId });

    } catch (error) {
      console.log(error);
    }
  };

  const cancelTransaction = async (txnId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      const response = await contract.cancelTransaction({ transactionId: txnId });

    } catch (error) {
      console.log(error);
    }
  };

  const executeTransaction = async (txnId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      const response = await contract.executeTransaction({ transactionId: txnId });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {

    };
    init();
  }, []);


  return (
    <ActionContext.Provider
      value={{
        balance,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};