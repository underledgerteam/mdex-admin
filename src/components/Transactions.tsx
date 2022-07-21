import { FC, useContext } from "react";
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
  } = useContext(ActionContext);
  const admin = useContext(AdminContext);

  const renderVoteColumn = (txn: TransactionInterface) => {
    const { id, caller, status, isVoted } = txn;
    if (status === "WAITING") {
      if (admin?.adminAccount != caller.toLowerCase() && !isVoted) {
        return (
          <>
            <button className="btn mx-2" onClick={() => voteConfirmTransaction(id)}>Yes</button>
            <button className="btn mx-2" onClick={() => voteNotConfirmTransaction(id)}>No</button>
          </>
        );
      } else {
        return ("Voted");
      }
    } else if (status === "READY") {
      if (admin?.adminAccount === caller.toLowerCase()) {
        return (
          <>
            <button className="btn" onClick={() => executeTransaction(txn.id)}>Execute</button>
          </>
        );
      }
    } else if (status === "QUEUE") {
      return (
        <>
          <button className="btn" onClick={() => cancelTransaction(txn.id)}>Cancel</button>
        </>
      );
    } else if (status === "FAIL") {
      return ("Fail");
    } else if (status === "SUCCESS") {
      return ("Success");
    } else {
      return ("Error");
    }
    return null;
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
            {transactions.length > 0 ? (
              transactions.slice(0).reverse().map((txn) => {
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
