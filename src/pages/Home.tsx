import React, { useContext, Fragment, FC } from "react";
import ButtonConnect from "../components/ButtonConnect";

import { AdminContext } from "../context/AdminContext";
import { ActionContext } from "src/context/action.context";
import Transactions from "../components/Transactions";
import Card from "../components/shared/Card";

import InputSelectNetwork from "../components/shared/InputSelectNetwork";
import AccessDenied from "../components/AccessDenied";
import TransferSection from "src/components/TransferSection";
import TransferModal from "src/components/TransferModal";

import { SWAP_CONTRACTS } from "../utils/constants";

const CheckConnectWallet: FC = () => {
  const admin = useContext(AdminContext);
  if (admin?.isConnected && !admin?.isAdmin) {
    return <AccessDenied />;
  }
  return <ButtonConnect />;
};

const Home: FC = () => {
  const admin = useContext(AdminContext);
  const { balance, transaction } = useContext(ActionContext);

  const openModalHandler = (): void => {
    let element = document.getElementById("transfer-modal") as HTMLInputElement;
    element.checked = true;
    console.log(transaction)
  };

  const listOptionNetwork = Object.keys(SWAP_CONTRACTS).map((key) => {
    return {
      value: key,
      label: (
        <Fragment>
          <img
            className="mask mask-squircle mr-1"
            alt="tokenSymbol"
            src={SWAP_CONTRACTS[Number(key)].SYMBOL}
            width={30}
          />{" "}
          {SWAP_CONTRACTS[Number(key)].NETWORK_SHORT_NAME}
        </Fragment>
      ),
    };
  });

  return (
    <div className=" flex justify-center items-center p-8">
      <Card className="glass w-full md:w-3/4 overflow-visible lg:overflow-hidden">
        <Fragment>
          <div className="w-full min-h-[600px] text-center">
            {admin?.adminAccount && admin?.isAdmin ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <TransferSection balance={admin.adminBalance} token={"USDT"} onClickButton={openModalHandler} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
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
              <CheckConnectWallet />
            )}
          </div>
        </Fragment>
      </Card>
      <TransferModal />
    </div>
  );
};

export default Home;
