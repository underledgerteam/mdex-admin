import { useContext, useCallback } from "react";
import { ActionContext } from "src/context/action.context";

const InputSelectFilter = () => {
  const filterList = ["AllFilter", "from", "to"];
  const { currentFilter, updateFilter, search } = useContext(ActionContext);

  const handleShowSelectFilter = () => {
    document.getElementById("dropdown-content")?.classList.toggle("show");
  };

  const handleSelectFilter = useCallback((filter: string) => {
    updateFilter(filter);
    search("");
  }, []);
  return (
    <div>
      <div className="dropdown">
        <label
          id="dropdown-title"
          className="select select-bordered items-center w-full"
          onClick={handleShowSelectFilter}
        >
          {currentFilter === "" ? "AllFilter" : currentFilter}
        </label>
        <ul
          id="dropdown-content"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {filterList?.map((list, key) => {
            return (
              <li key={key}>
                <div
                  className={`${
                    currentFilter === list
                      ? "cursor-no-drop text-custom-black/70 bg-slate-400/30 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => handleSelectFilter(list)}
                >
                  {list}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InputSelectFilter;
