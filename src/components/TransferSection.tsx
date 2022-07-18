import { TransferSectionInterface } from "src/types/TransferSection";

const TransferSection = (props: TransferSectionInterface): JSX.Element => {
  const { balance, token, onClickButton } = props;
  return (
    <div>
      <div className="input-group hidden md:flex">
        <span className="bg-white">Balance :</span>
        <span className="input input-bordered bg-white justify-end w-1/3">
          {`${balance} ${token}`}
        </span>
        <button className="btn btn-connect" onClick={() => onClickButton()}>
          🔀 Transfer
        </button>
      </div>
      <div className="md:hidden bg-white p-5 rounded-lg">
        <div className="bg-white text-xl">Balance :</div>
        <div className="w-full input bg-white text-2xl mt-3">
          {`${balance} ${token}`}
        </div>
        <button className="btn btn-connect mt-3" onClick={() => onClickButton()}>
          🔀 Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferSection; 