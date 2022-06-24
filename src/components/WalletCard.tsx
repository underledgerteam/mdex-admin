import React, {useState} from 'react';
import { ethers } from "ethers";

declare var window: any // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const WalletCard = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet')
  const {ethereum} = window;

  const connectWallet = async () => {
    alert("Connect to Metamask!!")
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const account = await provider.send("eth_requestAccounts", []);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setDefaultAccount(accounts[0]);
    }
  }

  return (
    <div className="bg-sky-500 flex flex-col w-full justify-center items-center">
      <button 
        type="button"
        onClick={connectWallet}
        className="flex flex-row justify-center item-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <p className="text-white text-base font-semibold">{connectButtonText}</p>
      </button>

      <div className="flex flex-col">
        <p>
          Address: {defaultAccount}
        </p>
        <p>
          Balance: {userBalance}
        </p>
        {errorMessage}
      </div>
      
    </div>
  );
}

export default WalletCard;
