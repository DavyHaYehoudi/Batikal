import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import { addQuoteField } from "../../../feature/quotesSlice";

const AccountClient = ({
  name_Client,
  address_Client,
  addressAdditional_Client,
  postalCode_Client,
  city_Client,
  siret_Client,
  quoteNumber,
}) => {
  const dispatch = useDispatch();
  const [quoteNbr, setQuoteNbr] = useState("");

  const handleQuoteNumber = (e) => {
    setQuoteNbr(e.target.value);
    let quoteNumberData = {
      content: e.target.value,
      property: "quoteNumber",
    };
    dispatch(addQuoteField(quoteNumberData));
  };
  useEffect(() => {
    setQuoteNbr(quoteNumber);
  }, []);
  return (
    <div className="row g-5 mb-12 text-black">
      <div>
        <div className="fw-bolder fs-6 text-black mb-1">{name_Client}</div>
        <div className="fw-bold fs-7  d-flex align-items-center flex-wrap">
          <span>
            {address_Client}
            <br />
            {addressAdditional_Client}
          </span>
        </div>
        <div className="fw-bold fs-7 text-gray-600 mb-1">
          {postalCode_Client} {city_Client}
        </div>
        <div className="fw-bold fs-7 text-gray-600">
          SIRET : {siret_Client}{" "}
        </div>
        <div className="fw-bolder fs-6 ">
          <span>DEVIS N°</span>

          <input
            type="text"
            className="rounded border-0 quoteField text-black"
            placeholder="85668237053"
            onChange={(e) => handleQuoteNumber(e)}
            value={quoteNbr}
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default AccountClient;
