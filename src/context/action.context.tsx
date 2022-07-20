import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

// context
import { ActionContextInterface, ActionProviderInterface } from "../types/contexts/action.context";

declare var window: any;

const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  balance: 0

};

export const ActionContext = createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {

  const [balance, setBalance] = useState(0);


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