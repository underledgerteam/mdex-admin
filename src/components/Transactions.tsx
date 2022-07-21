import { FC, useContext } from "react";
import { ActionContext } from "../context/action.context";
import { AdminContext } from "src/context/AdminContext";
import { shortenAddress } from "../utils/shortenAddress.util";

const Transactions: FC = () => {
  const {
    transaction,
    voteConfirmTransaction,
    voteNotConfirmTransaction,
    cancelTransaction,
    executeTransaction
  } = useContext(ActionContext);
  const admin = useContext(AdminContext);

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
            {transaction.length > 1 ? (
              transaction.map((txn) => {
                return (
                  <tr key={`${txn.id}`} className="text-center">
                    <td>{txn.id}</td>
                    <td>{shortenAddress(txn.caller)}</td>
                    <td>{shortenAddress(txn.to)}</td>
                    <td>{txn.value}</td>
                    <td>{txn.timestamp}</td>
                    <td>{txn.status}</td>
                    <td>{txn.vote}</td>
                    <td>
                      {
                        txn.status === "WAITING" ?
                          (admin?.adminAccount != txn.caller.toLowerCase() && (
                            <>
                              <button className="btn mx-2" onClick={() => voteConfirmTransaction(txn.id)}>Yes</button>
                              <button className="btn mx-2" onClick={() => voteNotConfirmTransaction(txn.id)}>No</button>
                            </>
                          )) :
                          txn.status === "READY" ?
                            (admin?.adminAccount != txn.caller.toLowerCase() && (
                              <>
                                <button className="btn" onClick={() => executeTransaction(txn.id)}>Execute</button>
                              </>
                            )) :
                            txn.status === "QUEUE" ?
                              (<>
                                <button className="btn" onClick={() => cancelTransaction(txn.id)}>Cancel</button>
                              </>) :
                              txn.status === "FAIL" ?
                                ("Fail") :
                                txn.status === "SUCCESS" ?
                                  ("Success") : ("Error")
                      }
                    </td>
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
