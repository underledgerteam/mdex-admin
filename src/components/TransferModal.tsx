import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { ActionContext } from "../context/action.context";

const TransferModal = () => {
  const admin = useContext(AdminContext);
  const {getTransactions, submitTransaction} = useContext(ActionContext);
  const [addressTo, setAddressTo] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const inputAddress = (e: any): void => {
    setAddressTo(e.target.value);
  };
  const inputAmount = (e: any): void => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (!addressTo || !amount) return;
    submitTransaction(addressTo, amount);

    closeModalHandler();
  };

  const clearInput = (): void => {
    setAddressTo("");
    setAmount(0);
  };

  const closeModalHandler = (): void => {
    let element = document.getElementById("transfer-modal") as HTMLInputElement;
    element.checked = false;
    clearInput();
  };

  

  useEffect(() => {
    const checkData = amount !== 0 && amount <= Number(admin?.adminBalance);
    setFormValid(checkData);
  }, [amount]);

  return (
    <>
      <input type="checkbox" id="transfer-modal" className="modal-toggle" />
      <div className="modal" id="transfer-modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start items-center"
          >
            <label className="font-bold text-2xl text-center">
              Enter address
            </label>
            <input
              placeholder="Address To:"
              name="addressTo"
              type="text"
              onChange={inputAddress}
              value={addressTo}
              className="input input-bordered w-full my-4"
            />
            <label className="font-bold text-2xl text-center">
              Enter value
            </label>
            <input
              placeholder="Amount (ETH):"
              name="amount"
              type="number"
              step={0.00001}
              onChange={inputAmount}
              value={amount}
              className="input input-bordered w-full my-4"
            />

            <div className="flex flex-row mt-10 justify-between items-center">
              <button
                type="button"
                className="btn btn-primary mx-8"
                onClick={closeModalHandler}
              >
                cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary mx-8"
                disabled={!formValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferModal;
