import React, { useState } from "react";
import { ethers } from "ethers";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const WalletCard = () => {

  const [defaultAccount, setDefaultAccount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // the inital state value can't be null
  const { ethereum } = window;

  const connectWallet = async () => {
    alert("Connect to Metamask!!");
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      changeAccountHandler(accounts[0]);

    } else {
      setErrorMessage('Please install MetaMask'); //can't assign to parameter of type 'SetStateAction<null or undefine>'
    }

  }

  const changeAccountHandler = (newAccount: string) : void =>  {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  }

  const getUserBalance = async (address: string) => {
    const balance = await ethereum.request({
      method: 'eth_getBalance', 
      params: [address, 'latest']
    });

    setUserBalance(ethers.utils.formatEther(balance));
  }

  return (
    <div className="bg-sky-500 flex flex-col w-full justify-center items-center">
      {!defaultAccount && (
        <button
          type="button"
          onClick={connectWallet}
          className="flex flex-row justify-center item-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <p className="text-white text-base font-semibold">Connect Wallet</p>
        </button>
      )}

      <div className="flex flex-col">
        <p>Address: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
        {errorMessage}
      </div>
    </div>
  );
};

export default WalletCard;
