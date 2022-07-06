import React, { useContext, Fragment } from "react";
import ButtonConnect from "../components/ButtonConnect";
import { AdminContext } from "../context/AdminContext";

import Transactions from "../components/Transactions";

const Home = () => {
  const admin = useContext(AdminContext);

  return (
    <Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <ButtonConnect />
        </div>
      </div>
      <Transactions />
    </Fragment>
  );
};

export default Home;
