import React,{useState,useContext} from "react";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const admin = useContext(AdminContext);
  return (
    <div>
      <nav className="w-full flex justify-between items-center p-4 bg-blue-500 text-white">
        <div className="text-3xl">Mdex-Admin</div>
        <div className="text-xl">{admin?.adminAccount}</div>
      </nav>
    </div>
  );
};

export default Navbar;
