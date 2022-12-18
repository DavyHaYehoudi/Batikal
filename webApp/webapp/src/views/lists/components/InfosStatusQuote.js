import React from "react";
import { Overlay } from "../../../components/Overlay";

const InfosStatusQuote = () => {
  return (
    <div className="d-flex align-items-end justify-content-center" >
      <span
        style={{
          color: "rgb(255,158,94)",
          marginRight: "5px",
        }}
      >
        STATUT DU DEVIS
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
              LES 4 STATUTS DU DEVIS
            </div>
            <div
              className="separator mb-3 opacity-75"
              style={{ borderBottom: "1px white solid" }}
            ></div>
            <p>
              1- <b>A générer :</b> le devis n'a pas encore été créé
            </p>
            <p>
              2- <b>En cours de rédaction :</b> le devis est en cours de
              rédaction et n'a pas encore été envoyé à Batikal pour vérification
            </p>
            <p>
              3- <b>Rédigé :</b> le devis a été complété et envoyé à Batikal
              pour vérification. Il ne pourra être imprimé qu'après validation
              Batikal
            </p>
            <ul>
              <li>
                3.1<b> En attente de validation :</b> le devis est en attente de
                validation par Batikal
              </li>
              <li>
                3.2<b> Anomalie :</b> une anomalie relevée par Batikal invalide
                le devis qui doit être corrigé puis de nouveau soumis à Batikal
              </li>
              <li>
                3.3<b> Validé :</b> le devis est validé par Batikal et peut être
                imprimé, signé par le client puis de nouveau soumis à Batikal
                pour vérification de la signature
              </li>
            </ul>
            <p>
              4- <b>Signé :</b> le devis a été signé et il est soumis à Batikal
              pour vérification de la signature
            </p>
            <ul>
              <li>
                4.1<b> En attente de validation :</b> le devis est en attente de
                validation par Batikal
              </li>
              <li>
                4.2<b> Anomalie :</b> une anomalie relevée par Batikal invalide
                le devis qui doit être corrigé puis de nouveau soumis à Batikal
                pour vérification
              </li>
              <li>
                4.3<b> Validé :</b> la signature est validée par Batikal. Le
                devis peut être déposé sur le portail EDF. Ne pas clôturer le
                dossier, en validant la fin des travaux, tant que la facturation
                n'est pas définitive.
              </li>
            </ul>
          </>
        }
      />
    </div>
  );
};

export default InfosStatusQuote;
