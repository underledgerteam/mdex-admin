import { useState, useEffect, createContext, useContext } from "react";
import { ethers, utils } from "ethers";
import dayjs from "dayjs";
import { useNotifier } from "react-headless-notifier";
// context
import { AdminContext } from "./AdminContext";
import {
  ActionContextInterface,
  ActionProviderInterface,
  TransactionInterface,
} from "../types/contexts/action.context";
// constants
import {
  MULTI_SIG_WALLET_CONTRACTS,
  MULTI_SIG_DECIMAL_SET,
  TRANSACTION_STATUS,
  GAS_LIMIT,
} from "../utils/constants";
import {
  SuccessNotification,
  DangerNotification,
} from "../components/shared/Notification";

declare var window: any;
const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  transactions: [],
  treasuryBalance: 0,
  getTransactions: async () => {},
  submitTransaction: async (to: string, value: number) => {},
  voteConfirmTransaction: async () => {},
  voteNotConfirmTransaction: async () => {},
  cancelTransaction: async () => {},
  executeTransaction: async () => {},
};

export const ActionContext =
  createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const admin = useContext(AdminContext);
  const { notify } = useNotifier();
  const [treasuryBalance, setTreasuryBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  const getTreasuryBalance = async (): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        multiSigContract.ADDRESS,
        multiSigContract.ABI,
        signer
      );
      const response = await contract.getBalance();
      const treasuryBalanceInEther = ethers.utils.formatUnits(response);
      setTreasuryBalance(
        Number(
          parseFloat(treasuryBalanceInEther).toFixed(MULTI_SIG_DECIMAL_SET)
        )
      );
    } catch (error) {
      console.log(error);
    }
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
      let transactions = await multisigContract.getTransactions();
      const isVotedArray = await Promise.all(
        transactions.map((txn: { id: number }) =>
          multisigContract.isConfirmed(txn.id, admin?.adminAccount)
        )
      );
      transactions = transactions.map((txn: any, index: number) => ({
        ...txn,
        isVoted: isVotedArray[index],
      }));
      setTransactions(normalizedTransaction(transactions));
    } catch (error) {
      console.error("GetTransaction", error);
    }
  };

  const normalizedTransaction = (transactions: any): TransactionInterface[] => {
    let arrayTransactions = [];
    for (let txn of transactions) {
      const countYes = ethers.BigNumber.from(txn.numConfirmations).toNumber();
      const countNo = ethers.BigNumber.from(txn.numNoConfirmations).toNumber();
      arrayTransactions.push({
        id: ethers.BigNumber.from(txn.id).toNumber(),
        caller: txn.caller,
        to: txn.to,
        value: utils.formatEther(txn.value),
        timestamp: dayjs
          .unix(ethers.BigNumber.from(txn.timestamp).toNumber())
          .format("DD/MM/YYYY"),
        status: TRANSACTION_STATUS[txn.status],
        vote: countYes + countNo,
        isVoted: txn.isVoted,
      });
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
      notify(<SuccessNotification message={"Submit Success"} />);
    } catch (error: any) {
      if (typeof error.code != "number")
        notify(<DangerNotification message={error.code} />);
      else notify(<DangerNotification message={error.message} />);
    }
  };

  const voteConfirmTransaction = async (
    transactionId: number
  ): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        multiSigContract.ADDRESS,
        multiSigContract.ABI,
        signer
      );
      await contract.confirmTransaction(transactionId, { gasLimit: GAS_LIMIT });
      notify(<SuccessNotification message={"You vote success"} />);
    } catch (error: any) {
      if (typeof error.code != "number")
        notify(<DangerNotification message={error.code} />);
      else notify(<DangerNotification message={error.message} />);
    }
  };

  const voteNotConfirmTransaction = async (
    transactionId: number
  ): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        multiSigContract.ADDRESS,
        multiSigContract.ABI,
        signer
      );
      let result = await contract.noConfirmTransaction(transactionId, {
        gasLimit: GAS_LIMIT,
      });
      await result.wait();
      notify(
        <SuccessNotification
          message={`You vote no success`}
          linkScan={`${MULTI_SIG_WALLET_CONTRACTS[chainId].BLOCK_EXPLORER_URLS?.[0]}/tx/${result.hash}`}
        />
      );
    } catch (error: any) {
      if (typeof error.code != "number")
        notify(<DangerNotification message={error.code} />);
      else notify(<DangerNotification message={error.message} />);
    }
  };

  const cancelTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        multiSigContract.ADDRESS,
        multiSigContract.ABI,
        signer
      );
      await contract.cancelTransaction(transactionId, { gasLimit: GAS_LIMIT });
      notify(<SuccessNotification message={"You cancel success"} />);
    } catch (error: any) {
      if (typeof error.code != "number")
        notify(<DangerNotification message={error.code} />);
      else notify(<DangerNotification message={error.message} />);
    }
  };

  const executeTransaction = async (transactionId: number): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const multiSigContract = MULTI_SIG_WALLET_CONTRACTS[chainId];
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        multiSigContract.ADDRESS,
        multiSigContract.ABI,
        signer
      );

      let result = await contract.executeTransaction(transactionId, {
        gasLimit: GAS_LIMIT,
      });
      await result.wait();

      notify(
        <SuccessNotification
          message={"Transaction success"}
          linkScan={`${MULTI_SIG_WALLET_CONTRACTS[chainId].BLOCK_EXPLORER_URLS?.[0]}/tx/${result.hash}`}
        />
      ); // scan link
    } catch (error: any) {
      if (typeof error.code != "number")
        notify(<DangerNotification message={error.code} />);
      else notify(<DangerNotification message={error.message} />);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getTreasuryBalance();
      await getTransactions();
    };
    if (admin?.isConnected && admin?.adminAccount) {
      init();
    }
  }, [admin?.isConnected, admin?.adminAccount]);

  return (
    <ActionContext.Provider
      value={{
        treasuryBalance,
        transactions,
        getTransactions,
        submitTransaction,
        voteConfirmTransaction,
        voteNotConfirmTransaction,
        cancelTransaction,
        executeTransaction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
