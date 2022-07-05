import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

declare var window: any; // telling the TypeScript compiler to treat window as of type any hence ignore any warnings.

const ButtonConnect = (): any => {
  const admin = useContext(AdminContext);

  return (
    <div>
      {!admin?.adminAccount && (
        <button
          type="button"
          onClick={admin?.connectWallet}
          className="btn btn-primary btn-lg"
        >
          Connect
        </button>
      )}

    </div>
  );
};

export default ButtonConnect;
