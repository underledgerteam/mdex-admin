import React, { useContext } from "react";
import ButtonConnect from "../components/ButtonConnect";
import { AdminContext } from "../context/AdminContext";

const Home = () => {
  const admin = useContext(AdminContext);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <ButtonConnect />
      </div>
    </div>
  );
};

export default Home;
