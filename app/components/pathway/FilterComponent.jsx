import { CheckBoxChecked, CheckBoxUnChecked } from "../utils/Icon";

import { SearchIcon } from "../utils/Icon";

export const SearchInput = ({ searchString, setSearchString }) => {
  return (
    <label htmlFor="course-input" className="basis-0 grow">
      <div className="px-3.5 py-2.5 flex items-center gap-2 cursor-text border-gray-300 border border-solid rounded-lg input-wrapper">
        <SearchIcon />
        <input
          className="outline-none text-gray-500 text-md w-full basis-0 grow "
          type="text"
          name="course"
          id="course-input"
          value={searchString}
          placeholder="Search"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
    </label>
  );
};

export const FilterCheckBox = ({ checked, label, clickCallback }) => {
  return (
    <button
      className={`checkbox-group ${checked ? "checked" : ""}`}
      onClick={clickCallback}
    >
      {checked ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
      <label>{label}</label>
    </button>
  );
};

export const ModeRadioButton = ({ checked, label, clickCallback }) => {
  return (
    <button
      className={`checkbox-group !border-solid ${
        checked ? "checked !bg-primary-50" : ""
      }`}
      onClick={clickCallback}
    >
      {label}
    </button>
  );
};
