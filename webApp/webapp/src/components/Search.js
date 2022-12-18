import React from "react";
import Button from "./Button";

const Search = ({handleSearchValue,handleChangeValue,searchValue}) => {

  return (
    <form className="">
      <input
        type="text"
        className="p-4 border border-white rounded"
        placeholder={" Nom du chantier ou du client"}
        id="searchList"
        style={{ backgroundColor: "rgb(22, 71, 101)", width: "400px" }}
        autoFocus
        autoComplete="off"
        onChange={(e) => handleChangeValue(e)}
        value={searchValue}
      />
      <Button
        variant={"white"}
        buttonClass={"btn btn-active-warning border border-primary rounded fw-boldest text-black"}
        buttonName={" 🔎 RECHERCHER"}
        onClick={(e)=> handleSearchValue(e)}
        isActive={true}
      />
    </form>
  );
};

export default Search;
