import React from "react";
import "./Job.css";

import { MdLocationOn } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdPerson } from "react-icons/md";

function Job({ trabajo }) {
  return (
    <article className="job-container">
      <div className="title">
        <h1>{trabajo.descripcion}</h1>
      </div>
      <div className="body">
        <div className="location row">
          <MdLocationOn style={{ color: "#fd8a06" }} />
          <h4>{trabajo.institucion}</h4>
        </div>
        <div className="schedule row">
          <MdOutlineAccessTimeFilled style={{ color: "#fd8a06" }} />
          <p>{trabajo.horario}</p>
        </div>
        <div className="type row">
          <MdPerson style={{ color: "#fd8a06" }} />
          <p>{trabajo.revista}</p>
        </div>
      </div>
    </article>
  );
}

export default Job;
