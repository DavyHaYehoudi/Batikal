import React, { useEffect, useState } from "react";
import InvisibleZone from "./componants/InvisibleZone";
import QuoteFooter from "./componants/QuoteFooter";
import AccountPartner from "./componants/AccountPartner";
import AccountClient from "./componants/AccountClient";
import QuoteRespDate from "./componants/QuoteRespDate";
import QuoteZoneCumac from "./componants/QuoteZoneCumac";
import QuoteHeaders from "./componants/QuoteHeaders";
import CheetCEE from "./componants/CheetCEE";
import Totals from "./componants/Totals";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectedUserInfo } from "../../feature/connectedUserSlice";
import {
  addQuoteField,
  quoteCreatorGet,
  quoteGetOne,
} from "../../feature/quotesSlice";
import { getStatusNameList } from "../../feature/statusNameSlice";
import { quoteDatingDeadline } from "../../utils";
import { RotatingSquare } from "react-loader-spinner";

const Redacting = () => {
  const quote = useSelector((state) => state.quotes.quote);
  const quoteCreator = useSelector((state) => state.quotes.quoteCreator);
  const loadingPage = useSelector((state) => state.quotes.loadingPage);
  const statusName = useSelector((state) => state.statusName.statusName);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const dispatch = useDispatch();
  const [addNotes, setAddNotes] = useState(false);

  const handleDate = (e) => {
    let dateData = { content: e.target.value, property: "quoteDate" };
    dispatch(addQuoteField(dateData));
  };
  const handleDisplayNotes = (e) => {
    e.target.nextSibling.classList.toggle("d-none");
    setAddNotes(!addNotes);
  };

  let { id } = useParams();
  //id = quote_FK de simulationsTable = id de la simulation

  useEffect(() => {
    let connectedUserInfoData = {
      id: connectedUser.DBuserId,
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(connectedUserInfo(connectedUserInfoData));
    let data = {
      id,
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(quoteGetOne(data));
    dispatch(getStatusNameList(data));
  }, []);

  useEffect(() => {
    if (quote && quote[0].id_creator && quote[0].id_creator !== "") {
      let quoteCreatorData = {
        id_creator: quote[0].id_creator,
        authorizationToken: connectedUser.authorizationToken,
      };
      dispatch(quoteCreatorGet(quoteCreatorData));
    }
  }, [quote]);

  const handleNotes = (e) => {
    let notesData = {
      content: e.target.value,
      property: "notes",
    };
    dispatch(addQuoteField(notesData));
  };

  if (loadingPage) {
    return (
      <>
        <p className="fs-1 text-center text-black">Veuillez patienter...</p>
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
    );
  } else {
    return (
      quote &&
      statusName && (
        <div
          id={
            quote[0].quoteStatus !== statusName[5].name &&
            quote[0].quoteStatus !== statusName[8].name
              ? "noPrint"
              : ""
          }
          className="print-content-only header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed p-5 quotePrint"
          style={{ backgroundColor: "rgb(14,74,112)" }}
          // onbeforeunload="return noRecord()"
        >
          <div className="container-xxl card bg-white p-lg-20">
            {quote && quoteCreator && statusName && connectedUser && (
              <InvisibleZone
                partner_Name={quoteCreator.societyName}
                foldCEENumber={quote[0].foldCEENumber}
                quoteStatus={quote[0].quoteStatus}
                recoveryRate={quote[0].recoveryRate}
                statusName={statusName}
                isAdmin={connectedUser.isAdmin}
              />
            )}
            <div className="d-flex flex-stack pb-10">
              {quoteCreator && (
                <img
                  src={quoteCreator.logo}
                  alt="Logo"
                  width="125"
                  height="125"
                  className="rounded img-fluid"
                />
              )}
            </div>
            <div className="m-0">
              {quoteCreator && (
                <div className="fw-bolder fs-3 text-black mb-8">
                  {quoteCreator.societyName}
                </div>
              )}
              <div className="d-flex justify-content-between text-black">
                {quoteCreator && (
                  <AccountPartner
                    address={quoteCreator.address}
                    postalCodeCity={quoteCreator.postalCodeCity}
                    email={quoteCreator.email}
                    TVA={quoteCreator.TVA}
                    siret={quoteCreator.siret}
                    NAFcode={quoteCreator.NAFcode}
                    RCS={quoteCreator.RCS}
                    decennial_insurance={quoteCreator.decennial_insurance}
                  />
                )}
                {quote && (
                  <AccountClient
                    name_Client={quote[0].name_Client}
                    address_Client={quote[0].address_Client}
                    addressAdditional_Client={quote[0].addressAdditional_Client}
                    postalCode_Client={quote[0].postalCode_Client}
                    city_Client={quote[0].city_Client}
                    siret_Client={quote[0].siret_Client}
                    quoteNumber={quote[0].quoteNumber}
                  />
                )}
              </div>
              <div className="d-flex justify-content-between fw-bolder fs-7 text-black">
                <QuoteRespDate
                  address_Site={quote[0].address_Site}
                  addressAdditional_Site={quote[0].addressAdditional_Site}
                  postalCode_Site={quote[0].postalCode_Site}
                  city_Site={quote[0].city_Site}
                  contact_Name={quote[0].contact_Name}
                  contact_Tel={quote[0].contact_Tel}
                  contact_Mail={quote[0].contact_Mail}
                  startWorksDate={quote[0].startWorksDate}
                  deadlineWorks={quote[0].deadlineWorks}
                />
              </div>
              <div className=" d-flex justify-content-end fw-bolder fs-7 text-gray-800">
                <span className="btn btn-warning text-black p-2">
                  Date butoir à ne pas dépasser :{" "}
                  {quoteDatingDeadline(quote[0].quoteDate)}{" "}
                </span>
                <label className="text-black m-2">Le </label>
                <input
                  type="date"
                  className="border-0 rounded p-2 quoteField"
                  onChange={(e) => handleDate(e)}
                  value={quote[0].quoteDate}
                />
              </div>
              <QuoteZoneCumac
                quoteCumac={quote[0].quoteCumac}
                activityZone={quote[0].activityZone}
                climaticZone={quote[0].climaticZone}
              />
            </div>
            <div>
              <div className="table-responsive border-bottom mb-9 w-95">
                {/* <table className="table mb-3"> */}
                <table className="mb-3">
                  <QuoteHeaders />
                  <tbody>
                    <tr>
                      <td className="fs-8" colSpan="6">
                        {addNotes ? (
                          <p
                            onClick={(e) => handleDisplayNotes(e)}
                            className="btn text-black btn-warning "
                          >
                            Masquer les notes
                          </p>
                        ) : (
                          <p
                            onClick={(e) => handleDisplayNotes(e)}
                            className="btn text-black btn-warning "
                          >
                            Ajouter des notes au devis
                          </p>
                        )}

                        <textarea
                          placeholder=" Insérer des notes générales du chantier"
                          className="d-none rounded quoteField w-100 "
                          value={quote ? quote[0].notes : ""}
                          onChange={(e) => handleNotes(e)}
                        ></textarea>
                      </td>
                    </tr>
                    <tr className="border-bottom fs-6 fw-bolder text-muted"></tr>
                    {quote[0].cheets.length > 0 ? (
                      quote[0].cheets.map((cheet, index) => (
                        <CheetCEE
                          key={cheet.id}
                          cheet_id={cheet.id}
                          index={index}
                          name={cheet.cheetName}
                          unit={cheet.unit}
                          quantity={cheet.quantity}
                          TVA={cheet.TVA}
                          PU={cheet.PU}
                          HT={cheet.HT}
                          TTC={cheet.TTC}
                          descriptive={cheet.descriptive}
                        />
                      ))
                    ) : (
                      <tr className="text-black">
                        Aucune fiche CEE sur le portail 3E EDF
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Totals
                cheets={quote[0].cheets}
                comments={quote[0].comments}
                totalPrimeCEE={quote[0].totalPrimeCEE}
              />
            </div>

            {quoteCreator && (
              <QuoteFooter
                societyName={quoteCreator.societyName}
                address={quoteCreator.address}
                postalCodeCity={quoteCreator.postalCodeCity}
                siret={quoteCreator.siret}
                NAFcode={quoteCreator.NAFcode}
                decennial_insurance={quoteCreator.decennial_insurance}
              />
            )}
          </div>
        </div>
      )
    );
  }
};

export default Redacting;
