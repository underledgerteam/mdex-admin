import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

// context
import { AdminContext } from "./AdminContext";
import { ActionContextInterface, ActionProviderInterface } from "../types/contexts/action.context";

// ABI
import CALL_ABI from '../utils/CallToken.json';

// constants
import { MULTI_SIG_WALLET_CONTRACTS, TEST_TOKEN_ADDRESS, MULTI_SIG_DECIMAL_SET } from "../utils/constants";

declare var window: any;

const { ethereum } = window;

const defaultValue: ActionContextInterface = {
  balance: 0

};

export const ActionContext = createContext<ActionContextInterface>(defaultValue);

export const ActionProvider = ({ children }: ActionProviderInterface) => {

  const admin = useContext(AdminContext);

  const [balance, setBalance] = useState(0);


  const getMultisixBalance = async() => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const testTokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, CALL_ABI, provider);
      const tokenBalance = await testTokenContract.balanceOf(MULTI_SIG_WALLET_CONTRACTS[chainId].ADDRESS);
      const tokenUnits = await testTokenContract.decimals();
      const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits);

      setBalance(Number(parseFloat(tokenBalanceInEther).toFixed(MULTI_SIG_DECIMAL_SET)));
      
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    const init = async () => {
      await getMultisixBalance();
    };
    init();
  },[]);


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