import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuoteField,
  cumulationTTCquote,
} from "../../../feature/quotesSlice";
import { cumulationTVA, numberFormat } from "../../../utils";

const Totals = ({ cheets, comments, totalPrimeCEE }) => {
  const quote = useSelector((state) => state.quotes.quote);
  const [addComments, setAddComments] = useState(false);
  const dispatch = useDispatch();
  const [tvaDuplicateFilter, setTvaDuplicateFilter] = useState([]);
  const [totals, setTotals] = useState({
    amountTTC: "...",
    amountHT: "...",
    tva_550: "",
    tva_10: "",
    tva_20: "",
    cumulationTotalTVA: "",
  });

  useEffect(() => {
    
    let cumulation_tva = cumulationTVA(cheets);
    let TTC_Values = [];
    let HT_Values = [];
    let cumulationTTC;
    let cumulationHT;
    for (let i = 0; i < cheets.length; i++) {
      TTC_Values.push(Number(cheets[i].TTC));
      cumulationTTC = TTC_Values.reduce(
        (partialSum, a) => partialSum + a,
        0
      ).toFixed(2);
      HT_Values.push(Number(cheets[i].HT));
      cumulationHT = HT_Values.reduce(
        (partialSum, a) => partialSum + a,
        0
      ).toFixed(2);
    }
    setTotals({
      ...totals,
      amountTTC: cumulationTTC,
      amountHT: cumulationHT,
      tva_550: cumulation_tva.cumulationTVA_550.toFixed(2),
      tva_10: cumulation_tva.cumulationTVA_10.toFixed(2),
      tva_20: cumulation_tva.cumulationTVA_20.toFixed(2),
      cumulationTotalTVA: cumulation_tva.cumulationTotalTVA.toFixed(2),
    });
    dispatch(cumulationTTCquote(cumulationTTC));
  }, [quote]);

  // useEffect(() => {
  //   if (quote) {
  //     dispatch(cumulationTTCquote(totals.amountTTC));
  //   }
  // }, [quote]);

  useEffect(() => {
    const tva = [];
    let tvaDuplicateFilterTmp = [];

    for (let i = 0; i < cheets.length; i++) {
      tva.push(cheets[i].TVA.rate);
    }

    tvaDuplicateFilterTmp = [...new Set(tva)];
    tvaDuplicateFilterTmp.sort(function (a, b) {
      return a - b;
    });
    setTvaDuplicateFilter(tvaDuplicateFilterTmp);
  }, [quote]);

  const handleDisplayComments = (e) => {
    e.target.nextSibling.classList.toggle("d-none");
    setAddComments(!addComments);
  };

  const handleComments = (e) => {
    let commentsData = {
      content: e.target.value,
      property: "comments",
    };
    dispatch(addQuoteField(commentsData));
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="mw-300px">
          <div className="d-flex flex-stack mb-3">
            <div className="fw-bold pe-10 text-gray-600 fs-7 text-black">Total H.T.</div>

            <div className="text-end fw-bolder fs-6 text-gray-600 text-black">
              {numberFormat(totals.amountHT)}
            </div>
          </div>

          {tvaDuplicateFilter &&
            tvaDuplicateFilter.map(
              (value, i) =>
                value !== "0" && (
                  <div className="d-flex flex-stack mb-3" key={i}>
                    <div className="fw-bold pe-10 text-gray-600 fs-7 text-black">
                      T.V.A. {value}%
                    </div>

                    <div className="text-end fw-bolder fs-6 text-gray-600 text-black">
                      {(value === "5.50" && numberFormat(totals.tva_550)) ||
                        (value === "10" && numberFormat(totals.tva_10)) ||
                        (value === "20" && numberFormat(totals.tva_20))}{" "}
                    </div>
                  </div>
                )
            )}
          <div className="d-flex flex-stack mb-3">
            <div className="pe-10 fs-5 fw-bold text-black">TOTAL T.V.A.</div>
            <div className="text-end fw-bolder fs-6 text-gray-600">
              {" "}
              {numberFormat(totals.cumulationTotalTVA)}
            </div>
          </div>
          <div className="d-flex flex-stack mb-3">
            <div className="pe-10 fs-5 fw-boldest text-black">TOTAL T.T.C</div>

            <div className="text-end fs-5 fw-boldest text-black">
              {numberFormat(totals.amountTTC)}
            </div>
          </div>

          <div className="d-flex flex-stack">
            <div className="fw-bold pe-10 text-gray-600 fs-7 text-black">
              Prime Total CEE{" "}
            </div>
            <div className="text-end fw-bolder fs-6 text-gray-600 text-black">
              - {numberFormat(totalPrimeCEE)}
            </div>
          </div>
          <div className="d-flex flex-stack mt-15 mb-5">
            <div className="fw-boldest  pe-10  fs-5 text-black">Net à payer</div>
            <div className="text-end fs-5  fw-boldest text-black">
              {numberFormat(totals.amountTTC - totalPrimeCEE)}{" "}
            </div>
          </div>
        </div>
      </div>

      <div>
        {addComments ? (
          <p
            onClick={(e) => handleDisplayComments(e)}
            className="btn text-light btn-warning"
          >
            Masquer les commentaires
          </p>
        ) : (
          <p
            onClick={(e) => handleDisplayComments(e)}
            className="btn text-light btn-warning"
          >
            Ajouter des commentaires au devis
          </p>
        )}

        <textarea
          placeholder=" Commentaires (facultatifs)"
          className="d-none rounded quoteField w-100"
          value={comments ? comments : ""}
          onChange={(e) => handleComments(e)}
        ></textarea>
      </div>
    </>
  );
};

export default Totals;
