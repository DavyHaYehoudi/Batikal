import React from "react";
import { numberThousand } from "../../../utils";

const QuoteZoneCumac = ({ quoteCumac, activityZone, climaticZone }) => {

  return (
    <>
      <div className="fw-bolder fs-7  text-black">
        <p>
          ZONE : {climaticZone}
          <br />
          Secteur d'activité : {activityZone}
        </p>
      </div>
      <div className=" d-flex justify-content-end fw-bolder fs-7  text-black">
        <p>Nombre de Kwh/Cumac : {numberThousand(quoteCumac)}</p>
      </div>
    </>
  );
};

export default QuoteZoneCumac;
