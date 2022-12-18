import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { FcDeleteRow } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheetDescriptive,
  addCheetField,
  recoveryRateUpdate,
  removeCheetDescriptive,
} from "../../../feature/quotesSlice";
import {
  amountHT,
  amountTVA,
  numberFormat,
  recoveryRate,
  unitPrice,
} from "../../../utils";

const CheetCEE = ({
  cheet_id,
  index,
  name,
  unit,
  quantity,
  TVA,
  PU,
  HT,
  TTC,
  descriptive,
}) => {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quotes.quote);
  const [selectedValueTVA, setSelectedValueTVA] = useState("");

  const quotedesc = useSelector(
    (state) => state.quotes.quote[0].cheets[index].descriptive
  );
  const [insert, setInsert] = useState(quotedesc);

  const displayTTCformatedT = (val) => {
    return numberFormat(val);
  };
  const [fieldsCheet, setFieldsCheet] = useState({
    unit,
    quantity,
    TVA: { rate: TVA.rate, value: TVA.value },
    PU,
    HT,
    TTC,
    ttcValue: displayTTCformatedT(TTC),
    descriptive,
  });

  const getTextArea = (value, index, cheet_id) => {
    return (
      <tr key={cheet_id}>
        <td>
          <textarea
            placeholder=" Descriptif de la fiche"
            className="rounded quoteField w-100"
            style={{ overflow: "hidden" }}
            value={value}
            onChange={(e) => handleChangeValue(index, e.target.value, cheet_id)}
          ></textarea>
        </td>
        <td>
          <p
            className="btn text-black"
            onClick={() => handleDelete(index, cheet_id)}
            title="Supprimer ce descriptif"
          >
            <FcDeleteRow size="30px" />
          </p>
        </td>
      </tr>
    );
  };

  const handleInsert = () => {
    // console.log(insert);

    let insertTmp = [...insert];

    insertTmp.push("");
    setInsert(insertTmp);
  };

  const handleChangeValue = (index, value) => {
    let insertTmp = [...insert];
    insertTmp[index] = value;
    setInsert(insertTmp);

    let cheetDescriptiveData = {
      cheet_id,
      content: insertTmp,
      cheets: quote[0].cheets,
    };
    dispatch(addCheetDescriptive(cheetDescriptiveData));
  };

  const handleDelete = (index) => {
    let insertTmp = [...insert];
    insertTmp.splice(index, 1);
    setInsert(insertTmp);
    let removeCheetDescriptiveData = {
      index,
      cheet_id,
      cheets: quote[0].cheets,
    };
    dispatch(removeCheetDescriptive(removeCheetDescriptiveData));
  };

  const handleFieldsCheet = (e) => {
    const { name, value } = e.target;

    let { TVA, TTC, quantity } = fieldsCheet;
    switch (name) {
      case "TVA":
        TVA.rate = e.target.value;
        setSelectedValueTVA(value);
        break;
      case "quantity":
        quantity = e.target.value;
        break;
      case "TTC":
        let cumulationTTCupdate =
          quote[0].cumulationTTC - TTC + Number(e.target.value);
        let newRecoveryRate = recoveryRate(
          cumulationTTCupdate,
          quote[0].quoteCumac
        );
        dispatch(recoveryRateUpdate(newRecoveryRate));

        TTC = e.target.value;
        break;
      default:
        console.log("default case handleFieldsCheet");
    }

    setFieldsCheet({
      ...fieldsCheet,
      ...{
        [name]: value,
        PU: unitPrice(amountHT(TTC, TVA.rate), quantity),
        HT: amountHT(TTC, TVA.rate),
        TTC,
        ttcValue: TTC,
        TVA: {
          ...TVA,
          value: amountTVA(TTC, TVA.rate),
        },
      },
    });
    let addCheetFieldData = {
      value,
      cheets: quote[0].cheets,
      cheet_id,
      property: name,
      PU: unitPrice(amountHT(TTC, TVA.rate), quantity),
      HT: amountHT(TTC, TVA.rate),
      TVAnewValue: {
        ...TVA,
        value: amountTVA(TTC, TVA.rate),
      },
    };
    dispatch(addCheetField(addCheetFieldData));
  };

  useEffect(() => {
    setSelectedValueTVA(TVA.rate);
  }, []);

  return (
    <>
      <tr className="fw-bolder text-gray-700 fs-5 text-end text-black">
        <td className=" pt-6 pb-0  fw-boldest text-start text-black">
          {name}{" "}
          <span
            className="btn text-black"
            onClick={handleInsert}
            title="Ajouter un descriptif "
          >
            <FcPlus size="20px" />
          </span>
        </td>

        <td className="pt-6 text-light fw-boldest text-black">
          <select
            className="border-1 cursor-pointer px-3 rounded quoteField"
            style={{ appearance: "none" }}
            value={fieldsCheet.unit}
            name="unit"
            onChange={handleFieldsCheet}
            onBlur={() =>
              setFieldsCheet({
                ...fieldsCheet,
                ttcValue: displayTTCformatedT(fieldsCheet.TTC),
              })
            }
          >
            <option value="N.C.">N.C.</option>
            <option value="nbr">nbr</option>
            <option value="m">m</option>
            <option value="mm">mm</option>
            <option value="m²">m²</option>
            <option value="ml">ml</option>
          </select>
        </td>
        <td className="pt-6 text-light fw-boldest text-black">
          <input
            type="text"
            className="w-50px cursor-pointer border-1 text-center rounded quoteField text-black"
            name="quantity"
            value={fieldsCheet.quantity}
            onChange={handleFieldsCheet}
            onBlur={() =>
              setFieldsCheet({
                ...fieldsCheet,
                ttcValue: displayTTCformatedT(fieldsCheet.TTC),
              })
            }
          />{" "}
        </td>
        <td className="pt-6 text-light fw-boldest text-black">
          <select
            className="border-1 cursor-pointer px-3 rounded quoteField text-black"
            style={{ appearance: "none" }}
            name="TVA"
            value={selectedValueTVA}
            onChange={handleFieldsCheet}
            onBlur={() =>
              setFieldsCheet({
                ...fieldsCheet,
                ttcValue: displayTTCformatedT(fieldsCheet.TTC),
              })
            }
          >
            <option value="0">N.C.</option>
            <option value="5.50">5.50%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
          </select>
        </td>
        <td className="pt-6 text-light fw-boldest text-black">
          {/*
          {numberFormat(fieldsCheet.PU)}
           Pour obtenir une cellule aux contours définis à l'impression =>input */}
          <input
            type="text"
            className="w-75px border-1 text-center rounded not-allowed text-black"
            name="PU"
            value={numberFormat(fieldsCheet.PU)}
          />
        </td>
        <td className="w-100px pt-6 fw-boldest text-center text-black">
          {" "}
          {numberFormat(fieldsCheet.HT)}{" "}
        </td>
        <td className="pt-6 text-light fw-boldest text-black">
          {" "}
          <input
            type="text"
            className="w-100px cursor-pointer border-1 text-center rounded quoteField text-black"
            name="TTC"
            value={fieldsCheet.ttcValue}
            onChange={handleFieldsCheet}
            onFocus={() =>
              setFieldsCheet({ ...fieldsCheet, ttcValue: fieldsCheet.TTC })
            }
            onBlur={() =>
              setFieldsCheet({
                ...fieldsCheet,
                ttcValue: displayTTCformatedT(fieldsCheet.TTC),
              })
            }
          />{" "}
        </td>
      </tr>
      {insert &&
        insert.length > 0 &&
        insert.map((el, index) => {
          return getTextArea(el, index, cheet_id);
        })}
    </>
  );
};

export default CheetCEE;
