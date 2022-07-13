import { FC, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { shortenAddress } from "../utils/shortenAddress.util";
import { DEFAULT_CHAIN } from "../utils/constants";

// Assets
import MdexLogo from "../assets/images/logo/mdex_logo.png";
import ButtonConnect from "../components/ButtonConnect";


const CheckConnectWallet: FC = () => {
  const admin = useContext(AdminContext);
  if (admin?.isConnected && admin?.isSupported && admin?.isAdmin) {
    return (
      <div
        id="walletAddress"
        className="inline-block text-xl px-4 py-2 leading-none border rounded-lg text-white mx-2 lg:mt-0 cursor-pointer"
        onClick={() => { }}
      >
        {shortenAddress(admin?.adminAccount)}
      </div>
    );
  } else if (admin?.isConnected && !admin?.isSupported && admin?.isAdmin) {
    return (
      <div
        id="networkError"
        className="inline-block text-xl px-4 py-2 leading-none border rounded-lg text-white mx-2 lg:mt-0 cursor-pointer"
        onClick={() => admin?.updateSwitchChain(DEFAULT_CHAIN)}
      >
        Network Error
      </div>
    );
  } else if (admin?.isConnected && admin?.isSupported && !admin?.isAdmin) {
    return (
      <div
        id="networkError"
        className="inline-block text-xl px-4 py-2 leading-none border rounded-lg text-white mx-2 lg:mt-0 cursor-pointer"
      >
        Access Denied
      </div>
    );
  }
  return (
    <ButtonConnect />
  );
};


const Navbar: FC = () => {
  
  return (<div className="flex flex-col">
  <div className="navbar bg-custom-navbar w-full lg:mx-auto justify-between items-center font-bold lg:px-8 py-3">
    <div className="navbar-start">
      
      <div className="w-14">
        <div className="text-xl flex text-2xl text-white uppercase font-bold cursor-pointer"><img src={MdexLogo} alt="MDex Admin" /><span className="mt-3 ml-3 italic">Admin</span></div>
      </div>
    </div>
    <div className="lg:flex navbar-end">
      <CheckConnectWallet />
    </div>
  </div>
</div>
  );
};

export default Navbar;
