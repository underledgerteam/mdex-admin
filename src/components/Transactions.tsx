import { useContext } from "react";
import { ActionContext } from "../context/action.context";
import { AdminContext } from "src/context/AdminContext";
import { shortenAddress } from "../utils/shortenAddress.util";

const Transactions = () => {
  const { transaction, voteConfirmTransaction, voteNotConfirmTransaction } =
    useContext(ActionContext);
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
              transaction.map((transactions) => {
                return (
                  <tr className="text-center">
                    <td>{transactions.id}</td>
                    <td>{shortenAddress(transactions.caller)}</td>
                    <td>{shortenAddress(transactions.to)}</td>
                    <td>{transactions.value}</td>
                    <td>{transactions.timestamp}</td>
                    <td>{transactions.status}</td>
                    <td>{transactions.vote}</td>
                    <td>
                      {
                        transactions.status === "WAITING" ?
                          (admin?.adminAccount != transactions.caller.toLowerCase() && (
                            <>
                              <button className="btn mx-2" onClick={() => {voteConfirmTransaction(Number(transactions.id))}}>Yes</button>
                              <button className="btn mx-2" onClick={() => {voteNotConfirmTransaction(Number(transactions.id))}}>No</button>
                            </>
                          )):
                          transactions.status === "READY" ?
                            (admin?.adminAccount != transactions.caller.toLowerCase() && (
                              <>
                                <button className="btn">Execute</button>
                              </>
                            )):
                            transactions.status === "QUEUE" ?
                              (<>
                                <button className="btn">Cancel</button>
                              </>):
                              transactions.status === "FAIL" ?
                                ("Fail") :
                                  transactions.status === "SUCCESS" ?
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
