import React from "react";
import { useRef } from "react";

import "./Search.css";

function Search({ setSearchText }) {
  const searchValue = useRef("");

  const handleChange = () => {
    setSearchText(searchValue.current.value);
  };

  return (
    <div className="search-container">
      <input
        className="searchbar"
        type="search"
        name="q"
        autoFocus
        autoComplete="off"
        ref={searchValue}
        onChange={handleChange}
        placeholder="Buscar..."
      />
    </div>
  );
}

export default Search;
