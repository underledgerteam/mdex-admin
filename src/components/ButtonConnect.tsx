import { useContext } from "react";
import { DEFAULT_CHAIN } from "../utils/constants";

import { AdminContext } from "../context/AdminContext";
import { shortenAddress } from "../utils/shortenAddress.util";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const ButtonConnect = (): any => {
  const admin = useContext(AdminContext);

  if (admin?.isConnected && admin?.isSupported) {
    return (
      <div
        id="walletAddress"
        className="inline-block text-xl px-4 py-2 leading-none border rounded-lg text-white mx-2 lg:mt-0 cursor-pointer"
        onClick={() => { }}
      >
        {shortenAddress(admin?.adminAccount)}
      </div>
    );
  } else if (admin?.isConnected && !admin?.isSupported) {
    return (
      <div
        id="networkError"
        className="inline-block text-xl px-4 py-2 leading-none border rounded-lg text-white mx-2 lg:mt-0 cursor-pointer"
        onClick={() => admin?.updateSwitchChain(DEFAULT_CHAIN)}
      >
        Network Error
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={admin?.connectWallet}
      className="btn btn-connect"
    >
      Connect Wallet
    </button>
  );
};

export default ButtonConnect;
