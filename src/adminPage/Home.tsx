import React, { useContext, Fragment } from "react";
import ButtonConnect from "../components/ButtonConnect";
import TransferBalance from "../components/TransferBalance";
import { AdminContext } from "../context/AdminContext";
import Transactions from "../components/Transactions";
import Card from "../components/shared/Card";

import InputSelectNetwork from "../components/shared/InputSelectNetwork";
import { SWAP_CONTRACTS } from "../utils/constants";

const Home = () => {
  
  const admin = useContext(AdminContext);
  const listOptionNetwork = Object.keys(SWAP_CONTRACTS).map((key) => {
    return { value: key, label: (<Fragment><img className="mask mask-squircle mr-1" src="https://placeimg.com/160/160/arch" width={30} /> {SWAP_CONTRACTS[Number(key)].NETWORK_SHORT_NAME}</Fragment>) };
  });


  return (
    <Card
      className="glass w-full md:w-3/4 overflow-visible"
      titleClassName="text-4xl mb-5"
    >
      <Fragment>

        <div className="w-full h-screen text-center">
        {admin?.adminAccount ? (
          <>
          <InputSelectNetwork 
            listOption={listOptionNetwork}
            selectionUpdate={"Select Network"}
            selectLabel="Select Network"
          />
          <TransferBalance />
          <Transactions />
          </>
        ) : ( 
          <ButtonConnect />
        )}
        </div>
        
      </Fragment>
    </Card>
  );
};

export default Home;
