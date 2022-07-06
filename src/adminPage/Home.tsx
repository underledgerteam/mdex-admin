import React, { useContext, Fragment } from "react";
import ButtonConnect from "../components/ButtonConnect";
import { AdminContext } from "../context/AdminContext";

import Transactions from "../components/Transactions";
import Card from "../components/shared/Card";

const Home = () => {
  const admin = useContext(AdminContext);

  return (
    <Card 
    className="glass w-full md:w-3/4 overflow-visible"
    titleClassName="text-4xl mb-5"
    >
      <Fragment>
        <div className="w-full h-screen flex justify-center items-center">
        {admin?.adminAccount ? (
          <Transactions />
        ) : ( 
          <ButtonConnect />
        )}
        </div>
      </Fragment>
    </Card>
  );
};

export default Home;
