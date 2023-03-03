import React from "react";
import { useEffect } from "react";

import "./List.css";

import Job from "../job/Job";

function List({ listaTrabajos }) {
  console.log("render listaaaa", listaTrabajos);
  return (
    <div className="list-container">
      {listaTrabajos.map((trabajo, index) => {
        return <Job key={index} trabajo={trabajo} />;
      })}
    </div>
  );
}

export default List;
