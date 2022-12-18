import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuoteField } from "../../../feature/quotesSlice";
import { ButtonMailto, delayBetween2Dates } from "../../../utils";

const QuoteRespDate = ({
  address_Site,
  addressAdditional_Site,
  postalCode_Site,
  city_Site,
  contact_Name,
  contact_Tel,
  contact_Mail,
  startWorksDate,
  deadlineWorks,
}) => {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quotes.quote);
  const [technicalVisit, setTechnicalVisit] = useState("");

  const handleTechnicalVisit = (e) => {
    setTechnicalVisit(e.target.value);
    let technicalVisitData = {
      content: e.target.value,
      property: "technicalVisit",
    };
    dispatch(addQuoteField(technicalVisitData));
  };

  useEffect(() => {
    if (quote) {
      setTechnicalVisit(quote[0].technicalVisit);
    }
  }, [quote]);


  return (
    <>
      <div className="text-black">
        <div>
          <span>Date Visite Technique :</span>
          {quote && (
            <input
              type="date"
              className="rounded border-0 quoteField m-1 p-1 text-black"
              onChange={(e) => handleTechnicalVisit(e)}
              value={technicalVisit}
            />
          )}
        </div>
        <p>
          Adresse du site : {address_Site}
          {addressAdditional_Site !== "" && (
            <>
              <br />
              {addressAdditional_Site}
            </>
          )}
          <br /> {postalCode_Site} {city_Site}
          <br />
          Contact : {contact_Name}
          <br />
          Numéro Tél : {contact_Tel}
          <br />        
          Mail : {contact_Mail}
          
        </p>
      </div>
      <div className="text-black">
        <p>
          Date prévisionnelle de démarrage des travaux : {startWorksDate}
          <br />
          Délai prévisionnel des travaux :{" "}
          {delayBetween2Dates(startWorksDate, deadlineWorks)} jours (
          {deadlineWorks})
        </p>
      </div>
    </>
  );
};

export default QuoteRespDate;
