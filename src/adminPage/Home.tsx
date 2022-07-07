import React from "react";
import ButtonConnect from "../components/ButtonConnect";
import TransferBalance from "../components/TransferBalance";

const Home = () => {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <ButtonConnect />
        <TransferBalance />
      </div>
    </div>
  );
};

export default Home;
