import { useState, useEffect, createContext, useContext } from "react";
import { ethers, utils } from "ethers";
import dayjs from "dayjs";
// context
import { AdminContext } from "./AdminContext";
import {
  ActionContextInterface,
  ActionProviderInterface,
  TransactionInterface
} from "../types/contexts/action.context";
// constants
import { MULTI_SIG_WALLET_CONTRACTS, MULTI_SIG_DECIMAL_SET, TRANSACTION_STATUS } from "../utils/constants";
var MULTISIG_Address = "0x392B676BAA75f5c24296B3F18991667D90756c4e";

declare var window: any;
const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  transaction: [],
  action: "",
  getTransactions: async () => { },
  submitTransaction: async (to: string, value: number) => { },
  voteConfirmTransaction: async () => { },
  voteNotConfirmTransaction: async () => { },
  cancelTransaction: async () => { },
  executeTransaction: async () => { }
};

export const ActionContext = createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const admin = useContext(AdminContext);
  const [action, setAction] = useState("");
  const [transaction, setTransaction] = useState<TransactionInterface[]>([]);
  
  const transactionFactory = (
    id: string,
    caller: string,
    to: string,
    value: string,
    timestamp: string,
    status: string,
    vote: string
  ) => {
    return {
      id: id,
      caller: caller,
      to: to,
      value: value,
      timestamp: timestamp,
      status: status,
      vote: vote,
    };
  };

  const getTransactions = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      const signer = provider.getSigner();

      const multisigContract = new ethers.Contract(
        MULTI_SIG_WALLET_CONTRACTS[chainId].ADDRESS,
        MULTI_SIG_WALLET_CONTRACTS[chainId].ABI,
        signer
      );
      let transaction = await multisigContract.getTransactions();
      setTransaction(normalizedTransaction(transaction));
    } catch (error) {
      console.error("GetTransaction", error);
    }
  };

  const normalizedTransaction = (transaction: any) => {
    let arrayTransactions = [];
    for (let i = 0; i < transaction.length; i++) {
      arrayTransactions.push(
        transactionFactory(
          ethers.BigNumber.from(transaction[i].id).toString(),
          transaction[i].caller,
          transaction[i].to,
          utils.formatEther(transaction[i].value),
          dayjs
            .unix(ethers.BigNumber.from(transaction[i].timestamp).toNumber())
            .format("DD/MM/YYYY"),
            TRANSACTION_STATUS[transaction[i].status],
          ethers.BigNumber.from(transaction[i].numConfirmations).toString()
          
        )
      );
    }
    return arrayTransactions;
  };

  const submitTransaction = async (to: string, value: number) => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      const signer = provider.getSigner();

      const multisigContract = new ethers.Contract(
        MULTI_SIG_WALLET_CONTRACTS[chainId].ADDRESS,
        MULTI_SIG_WALLET_CONTRACTS[chainId].ABI,
        signer
      );
      await multisigContract.submitWithdrawTransaction(
        to,
        ethers.utils.parseEther(value.toString())
      );
    } catch (error) {
      console.error("GetTransaction", error);
    }
  };

  const voteConfirmTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      await contract.confirmTransaction(transactionId, { gasLimit: 100000 });
    } catch (error) {
      console.log(error);
    }
  };

  const voteNotConfirmTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      await contract.noConfirmTransaction(transactionId, { gasLimit: 100000 });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      await contract.cancelTransaction(transactionId, { gasLimit: 100000 });
    } catch (error) {
      console.log(error);
    }
  };

  const executeTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(multiSigContract.ADDRESS, multiSigContract.ABI, signer);
      await contract.executeTransaction(transactionId, { gasLimit: 100000 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getTransactions();
    };
    init();
  }, []);

  return (
    <ActionContext.Provider
      value={{
        action,
        transaction,
        getTransactions,
        submitTransaction,
        voteConfirmTransaction,
        voteNotConfirmTransaction,
        cancelTransaction,
        executeTransaction
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
