import React from "react";

const AccountPartner = ({
  address,
  postalCodeCity,
  email,
  TVA,
  siret,
  NAFcode,
  RCS,
  decennial_insurance,
}) => {
 
  return (
    <div className="row g-5 mb-11 text-black">
      <div>
        <div className="fw-bold fs-7 text-gray-600 mb-1">
          {address} <br />
          {postalCodeCity}
        </div>

        <div className="fw-bolder fs-6 ">{email}</div>
        <div className="fw-bold fs-7 text-gray-600 mb-1">
          N° TVA Intracommunautaire : {TVA}
        </div>

        <div className="fw-bolder fs-6 ">N° SIRET : {siret}</div>

        <div className="fw-bold fs-7 text-gray-600">
          Code NAF : {NAFcode}
          <br />
          RCS : {RCS}
          <br />
          Assurance décennale : {decennial_insurance}
        </div>
      </div>
    </div>
  );
};

export default AccountPartner;
