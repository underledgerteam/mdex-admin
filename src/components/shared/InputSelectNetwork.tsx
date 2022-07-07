import React, { useEffect, useState, useContext } from "react";
import { InputSelectInterface } from "../../types/InputSelect";


const InputSelectNetwork = ({className, listOption, selectionUpdate, defaultValue = "", selectLabel}:InputSelectInterface): JSX.Element => {
    
    const [value, setValue] = useState<string | JSX.Element>(defaultValue);

    return (
      <>
        <div className={`flex items-center justify-end ${className}`}>
          <div className="dropdown w-1/2">
            <label id="dropdown-title" className="select select-bordered items-center w-full">{selectLabel}</label>
            <ul id={`dropdown-content-${selectionUpdate.toLowerCase()}-chain`} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
              { listOption?.map((list, key)=>{
                return(<li key={key}>
                  <div 
                    className={`""`}
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