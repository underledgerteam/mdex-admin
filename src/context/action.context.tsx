import { useState, useEffect, createContext, useContext } from "react";

// context
import { AdminContext } from "./AdminContext";
import { ActionContextInterface, ActionProviderInterface, ActionType } from "../types/contexts/action.context" 

import Decimal from 'decimal.js';
// notification
import { useNotifier } from 'react-headless-notifier';
import { DangerNotification } from '../components/shared/Notification'

// ABI
import MULTISIX_ABI from '../utils/Multisix.json'
import CALL_ABI from '../utils/CallToken.json'

declare var window: any;

const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  action: ""

}

export const ActionContext = createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {

  const admin = useContext(AdminContext);

  const [action, setAction] = useState("");

    

  return (
    <ActionContext.Provider
      value={{
        action,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};