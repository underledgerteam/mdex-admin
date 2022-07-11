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
    return { value: key, label: (<Fragment><img className="mask mask-squircle mr-1" src={SWAP_CONTRACTS[Number(key)].SYMBOL} width={30} /> {SWAP_CONTRACTS[Number(key)].NETWORK_SHORT_NAME}</Fragment>) };
  });


  return (
    <div className=" flex justify-center items-center p-8">
    <Card
      className="glass w-full md:w-3/4 overflow-visible lg:overflow-hidden"
    >
      <Fragment>

        <div className="w-full min-h-[600px] text-center">
        {admin?.adminAccount ? (
          <>
          <div className="grid grid-cols-2 gap-4">
            <div><TransferBalance /></div>
            <div>
              <InputSelectNetwork 
                listOption={listOptionNetwork}
                selectionUpdate={"Select Network"}
                selectLabel="Select Network"
              />
            </div>
          </div>
          
          <Transactions />
          </>
        ) : ( 
          <ButtonConnect />
        )}
        </div>
        
      </Fragment>
    </Card>
    </div>
  );
};

export default Home;
