import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

const TransferModal = () => {
  const admin = useContext(AdminContext);
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
    const itemData = {
      addressTo: addressTo,
      amount: amount.toString(),
    };
    admin?.handleFormData(itemData);
    admin?.sendTransaction();
  };

  const closeModalHandler = () => {
    let element = document.getElementById("transfer-modal") as HTMLInputElement;
    element.checked = false;
    console.log("close modal: " + element.checked);
  };

  const openModalHandler = () => {
    let element = document.getElementById("transfer-modal") as HTMLInputElement;
    element.checked = true;
    console.log("open modal: " + element.checked);
  };

  useEffect(() => {
    const checkData = amount !== 0 && amount <= Number(admin?.adminBalance);
    setFormValid(checkData);
  }, [amount]);

  return (
    <>
    <div className="input-group">
      <span className="bg-white">Balance</span>
      <span className="input input-bordered bg-white justify-end w-1/3" >1,000 USDT</span>
      <button className="btn btn-connect" onClick={openModalHandler}>
      🔀 Transfer
      </button>
    </div>
      <input type="checkbox" id="transfer-modal" className="modal-toggle" />
      <div className="modal" id="transfer-modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start items-center"
          >
            <div>My balance = {admin?.adminBalance}</div>
            <input
              placeholder="Address To:"
              name="addressTo"
              type="text"
              onChange={inputAddress}
              value={addressTo}
              className="text-xl"
            />
            <input
              placeholder="Amount (ETH):"
              name="amount"
              type="number"
              step={0.00001}
              onChange={inputAmount}
              value={amount}
              className="text-xl"
            />

            <div className="flex flex-row mt-24 justify-between items-center">
              <button
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
