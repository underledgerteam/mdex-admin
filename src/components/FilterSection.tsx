import { useState, useContext } from "react";
import InputSelectFilter from "src/components/InputSelectFilter";
import { ActionContext } from "src/context/action.context";

const FilterSection = () => {
  const { search } = useContext(ActionContext);
  const [addressTo, setAddressTo] = useState<string>("");
  const inputAddress = (e: any): void => {
    setAddressTo(e.target.value);
  };
  const clearInput = (): void => {
    setAddressTo("");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    search(addressTo);
  };
  return (
    <form onSubmit={handleSubmit} className="input-group hidden md:flex my-4">
      <InputSelectFilter />
      <input
        placeholder="Search by address"
        name="filterInput"
        type="text"
        onChange={inputAddress}
        value={addressTo}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default FilterSection;
