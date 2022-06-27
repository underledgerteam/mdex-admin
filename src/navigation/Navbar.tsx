import React from "react";
import { ButtonConnect } from "../components/ButtonConnect";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full flex justify-between items-center p-4 bg-black">
        <div className="flex flex-row items-center flex-initial">
          <h1 className="text-3xl text-white">Multisig Wallet</h1>
          <div>
            <ButtonConnect />  
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
