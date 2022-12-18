import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MessagingModal from "../../lists/components/MessagingModal";
import DisplayButtonsAdmin from "./DisplayButtonsAdmin";
import DisplayButtonsUser from "./DisplayButtonsUser";
import QuoteState from "./QuoteState";
import { RotatingSquare } from "react-loader-spinner";

const InvisibleZone = ({
  partner_Name,
  foldCEENumber,
  quoteStatus,
  statusName,
  isAdmin,
}) => {
  const quote = useSelector((state) => state.quotes.quote);
  const loadingAction = useSelector((state) => state.quotes.loadingAction);
  const [quoteRecoveryRate, setQuoteRecoveryRate] = useState("");

  useEffect(() => {
    if (quote) {
      setQuoteRecoveryRate(quote[0].recoveryRate);
    }
  }, [quote]);

  return (
    <div className="d-flex justify-content-between bg-warning my-8 p-2 rounded">
      <div className="d-flex flex-column align-items-start">
        <QuoteState title={"Nom du partenaire"} titleValue={partner_Name} />
        <QuoteState title={"N° de dossier "} titleValue={foldCEENumber} />
        <QuoteState title={"Statut du devis "} titleValue={quoteStatus} />
        {quote && (
          <QuoteState
            title={"Taux de valorisation "}
            titleValue={quoteRecoveryRate}
          />
        )}
      </div>
      <div>
        <div className="btn border-bottom " style={{ cursor: "default" }}>
          <p>
            <i className="text-black">
              Les champs en orange n'apparaissent pas à l'impression{" "}
            </i>
          </p>
          <p>
            <i className="text-black">Les champs en bleu sont à compléter</i>
          </p>
        </div>
        {loadingAction && (
          <>
            <p className="fs-1 text-center text-black">Veuillez patienter</p>
            <RotatingSquare
              height="100"
              width="100"
              color="black"
              ariaLabel="rotating-square-loading"
              strokeWidth="4"
              wrapperStyle={{ display: "flex", justifyContent: "center" }}
              wrapperClass=""
              visible={true}
            />
          </>
        )}
      </div>
      {quote && (
        <div className="d-flex flex-column">
          {quote[0].buttons.map((button) => (
            <DisplayButtonsUser
              key={button.name}
              button={button}
              statusName={statusName}
            />
          ))}
          <DisplayButtonsAdmin statusName={statusName} />
        </div>
      )}
      {quote && (
        <div className="btn position-fixed top-0 end-0 bg-warning w-25 m-auto">
          <MessagingModal
            simulation_FK={quote[0].quote_FK}
            rowMessages={quote[0].rowMessages}
          />
          {isAdmin ? (
            <p className="text-black">
              - Laisser un message à {partner_Name} -
            </p>
          ) : (
            <p className="text-black">- Laisser un message à BATIKAL -</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InvisibleZone;
