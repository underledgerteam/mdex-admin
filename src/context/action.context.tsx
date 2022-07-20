import { useState, useEffect, createContext, useContext } from "react";
import { ethers, utils } from "ethers";
import dayjs from "dayjs";
// context
import { AdminContext } from "./AdminContext";
import {
  ActionContextInterface,
  ActionProviderInterface,
  ActionType,
} from "../types/contexts/action.context";

import Decimal from "decimal.js";
import { toBigNumber } from "../utils/calculatorCurrency.util";
// notification
import { useNotifier } from "react-headless-notifier";
import { DangerNotification } from "../components/shared/Notification";

// ABI
import MULTISIG_ABI from "../utils/Multisig.json";
import CALL_ABI from "../utils/CallToken.json";
import { id } from "ethers/lib/utils";

declare var window: any;
var MULTISIG_Address = "0x392B676BAA75f5c24296B3F18991667D90756c4e";
const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  action: "",
  transactions: [],
  getTransactions: async () => {},
  submitTransaction: async (to: string, value: number) => {},
};

export const ActionContext =
  createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {
  const admin = useContext(AdminContext);
  const [action, setAction] = useState("");
  const transactionFactory = (
    id: string,
    caller: string,
    to: string,
    value: string,
    timestamp: string,
    status: number
  ) => {
    return {
      id: id,
      from: caller,
      to: to,
      value: value,
      timestamp: timestamp,
      status: status,
      vote: 0,
    };
  };

  const getTransactions = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const multisigContract = new ethers.Contract(
        MULTISIG_Address,
        MULTISIG_ABI,
        provider
      );
      let transaction = await multisigContract.getTransactions();
      
      return setTransaction(transaction);
    } catch (error) {
      console.error("GetTransaction", error);
    }
  };

  const setTransaction = (transaction: any) => {
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
          transaction[i].status
        )
      )
    }

    return arrayTransactions;
  };

  const submitTransaction = async (to: string, value: number) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const multisigContract = new ethers.Contract(
        MULTISIG_Address,
        MULTISIG_ABI,
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

  return (
    <ActionContext.Provider
      value={{
        action,
        transactions: [],
        getTransactions,
        submitTransaction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
