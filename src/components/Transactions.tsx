import { FC, useContext, useEffect } from "react";
import { ActionContext } from "../context/action.context";
import { AdminContext } from "src/context/AdminContext";
import { shortenAddress } from "../utils/shortenAddress.util";
import { TransactionInterface } from "src/types/contexts/action.context";

const Transactions: FC = () => {
  const {
    transactions,
    voteConfirmTransaction,
    voteNotConfirmTransaction,
    cancelTransaction,
    executeTransaction,
    searchAddress,
    currentFilter,
    loading,
  } = useContext(ActionContext);
  const admin = useContext(AdminContext);

  const renderVoteColumn = (txn: TransactionInterface) => {
    const { id, caller, status, isVoted } = txn;
    if (status === "WAITING") {
      if (admin?.adminAccount !== caller.toLowerCase() && !isVoted) {
        return (
          <>
            <button
              className="btn mx-2"
              onClick={() => voteConfirmTransaction(id)}
            >
              Yes
            </button>
            <button
              className="btn mx-2"
              onClick={() => voteNotConfirmTransaction(id)}
            >
              No
            </button>
          </>
        );
      } else {
        return "Voted";
      }
    } else if (status === "READY") {
      if (admin?.adminAccount === caller.toLowerCase()) {
        return (
          <>
            <button className="btn" onClick={() => executeTransaction(txn.id)}>
              Execute
            </button>
          </>
        );
      }
    } else if (status === "QUEUE") {
      return (
        <>
          <button className="btn" onClick={() => cancelTransaction(txn.id)}>
            Cancel
          </button>
        </>
      );
    } else if (status === "FAILED") {
      return "Failed";
    } else if (status === "SUCCESS") {
      return "Success";
    } else {
      return "Error";
    }
    return null;
  };

  const checkFilter = (txn: TransactionInterface) => {
    if (currentFilter === "from" && searchAddress != "") {
      return txn.caller.includes(searchAddress);
    } else if (currentFilter === "to" && searchAddress != "") {
      return txn.to.includes(searchAddress);
    } else if (currentFilter === "AllFilter" && searchAddress != "") {
      return (
        txn.to.includes(searchAddress) || txn.caller.includes(searchAddress)
      );
    } else {
      return txn;
    }
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Vote</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={8}>
                  <div className="text-center">
                    <div role="status">
                      <svg
                        className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : transactions.filter(checkFilter).length > 0 ? (
              transactions
                .slice(0)
                .reverse()
                .filter(checkFilter)
                .map((txn) => {
                  return (
                    <tr key={`${txn.id}`} className="text-center">
                      <td>{txn.id}</td>
                      <td>{shortenAddress(txn.caller)}</td>
                      <td>{shortenAddress(txn.to)}</td>
                      <td>{txn.value}</td>
                      <td>{txn.timestamp}</td>
                      <td>{txn.status}</td>
                      <td>{txn.vote}</td>
                      <td>{renderVoteColumn(txn)}</td>
                    </tr>
                  );
                })
            ) : (
              <tr className="text-center">
                <td colSpan={8}>No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
