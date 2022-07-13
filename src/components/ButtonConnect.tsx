import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const ButtonConnect = (): any => {
  const admin = useContext(AdminContext);

  return (
    <div>
      {!admin?.adminAccount && (
        <button
          type="button"
          onClick={admin?.connectWallet}
          className="btn btn-connect"
        >
          Connect Wallet
        </button>
      )}

    </div>
  );
};

export default ButtonConnect;
