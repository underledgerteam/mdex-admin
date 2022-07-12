import React, { useEffect, useState, useContext } from "react";
import { InputSelectInterface } from "../../types/InputSelect";

import { AdminContext } from "../../context/AdminContext";


const InputSelectNetwork = ({className, listOption, selectionUpdate, defaultValue = "", selectLabel}:InputSelectInterface): JSX.Element => {
    
    const admin = useContext(AdminContext);
    const [value, setValue] = useState<number | string | JSX.Element>(defaultValue);

    const handelShowSelectNetwork = () => {
      const dropdown = document.querySelectorAll(".dropdown-content.show");
      dropdown && dropdown.forEach((list)=>{
        if(list.id !== `dropdown-content-${selectionUpdate.toLowerCase()}-chain`){
          list.classList.remove("show");
        }
      });
      document.getElementById(`dropdown-content-${selectionUpdate.toLowerCase()}-chain`)?.classList.toggle("show");
    };

    const handelSelectNetwork = (value: string | number, label: JSX.Element | string) => {
      admin?.updateSwitchChain(value);
      setValue(label);
      document.getElementById(`dropdown-content-${selectionUpdate.toLowerCase()}-chain`)?.classList.toggle("show");
    };

    useEffect(()=>{
      setValue(listOption?.find((x) => x.value == admin?.currentNetwork)?.label || "");

    },[admin]);

    useEffect(() => {
      const dropdownClose = (e: any) => {
        const dropdown = document.querySelectorAll(".dropdown-content.show");
        if (dropdown.length > 0 && !e.path[0].id) {
          dropdown.forEach((list) => {
            list.classList.remove("show");
            // document.getElementById(`root`)?.classList.remove("fix-h-screen");
          });
        }
      };
      document.body.addEventListener("click", dropdownClose);
      return () => document.body.removeEventListener("click", dropdownClose);
    }, []);

    return (
      <>
        <div className={`flex items-center justify-end ${className}`}>
          <div className="dropdown w-1/2">
            <label id="dropdown-title" className={`select select-bordered items-center m-1 w-full ${!admin?.checkIfWalletIsConnected || admin?.adminAccount === ""? "pointer-events-none bg-slate-300/60": ""}`} onClick={()=> handelShowSelectNetwork()}>{value || selectLabel}</label>
            <ul id={`dropdown-content-${selectionUpdate.toLowerCase()}-chain`} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
              { listOption?.map((list, key)=>{
                return(<li key={key}>
                  <div 
                    className={`${(admin?.currentNetwork == list.value)? "cursor-no-drop text-custom-black/70 bg-slate-400/30 pointer-events-none": ""}`}
                    onClick={() => handelSelectNetwork(list.value, list.label)}
                    >
                    {list.label}
                  </div>
                </li>);
              }) }
            </ul>
          </div>
        </div>
      </>
    );

};

export default InputSelectNetwork;