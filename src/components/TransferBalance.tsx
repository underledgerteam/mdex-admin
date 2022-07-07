import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

const TransferBalance = () => {
  const admin = useContext(AdminContext);
  const [modal, setModal] = useState<boolean>(false);
  const [addressTo, setAddressTo] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const toggleModal = (): void => {
    setModal(!modal);
    setAddressTo("");
    setAmount(0);
  };
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

    useEffect(()=>{
      const checkData = amount !== 0 && amount <= Number(admin?.adminBalance);
      setFormValid(checkData);

  }, [amount])

  return (
    <div>
      <div className="input-group">
        <span className="bg-white">Balance</span>
        <span className="input input-bordered bg-white justify-center w-1/3" >1 USDT</span>
        <button className="btn btn-connect" onClick={toggleModal}>
        🔀 Transfer
        </button>
      </div>

      {modal && ( // form pop-up
        <div className="flex justify-center items-center">
          <div
            onClick={toggleModal}
            className="w-screen h-screen fixed inset-0 bg-black opacity-60 "
          ></div>
          <div className="card w-96 h-96 bg-white">
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
                className="w-60 h-10 mt-14 p-2 outline rounded-sm text-xl"
              />
              <input
                placeholder="Amount (ETH):"
                name="amount"
                type="number"
                step={0.00001}
                onChange={inputAmount}
                value={amount}
                className="w-60 h-10 mt-14 p-2 outline rounded-sm text-xl"
              />

              <div className="flex flex-row mt-24 justify-between items-center">
                <button className="btn mx-8" onClick={toggleModal}>
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary mx-8" disabled={!formValid}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferBalance;
