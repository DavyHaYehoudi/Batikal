/* import React from "react";
import { Overlay } from "../../../components/Overlay";

const InfosFolderStep = () => {
  return (
    <div className="d-flex align-items-end justify-content-center" >
      <span
        style={{
          color: "rgb(255,158,94)",
          marginRight: "5px",
        }}
      >
        ETAPE DU DOSSIER
      </span>
      <Overlay
        tooltipClass={"mytooltip"}
        element={
          <button className="btn btn-white btn-sm btn-active-warning fw-boldest pt-1 pb-1">
            <b>?</b>
          </button>
        }
        contain={
          <>
            {" "}
            <div className="fs-6 fw-bolder px-3 py-4">
              LES 2 ETAPES DU DOSSIER
            </div>
            <div
              className="separator mb-3 opacity-75"
              style={{ borderBottom: "1px white solid" }}
            ></div>
            <p>
              1- <b>Simulation :</b> le dossier est à l'étape de la simulation. Il peut être modifié sur le portail EDF. A ce stade, l'application ne permet pas de générer le devis.
            </p>
            <p>
              2- <b>Chantier :</b> le dossier est à l'étape de chantier. Il ne peut plus être modifié sur le portail EDF. A ce stade, l'application permet de générer le devis.
            </p>
           
          </>
        }
      />
    </div>
  );
};

export default InfosFolderStep;
 */

import { Overlay2 } from "../../../components/Overlay2"

 const InfosFolderStep=()=>{
  return(
   <Overlay2 content={"coucou"} />
  )
}
export default InfosFolderStep;