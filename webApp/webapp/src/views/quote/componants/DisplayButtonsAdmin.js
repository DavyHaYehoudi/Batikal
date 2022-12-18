import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import { quoteBtnAdminControl } from "../../../feature/quotesSlice";
import { quoteStatusChange } from "../../../feature/simulationsSlice";

const DisplayButtonsAdmin = ({ statusName }) => {
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const quote = useSelector((state) => state.quotes.quote);
  const dispatch = useDispatch();

  const handleBtnAdmin = (params) => {
    let quoteStatus;
    let buttonsActive;
    let quoteStatusChangeData;
    let quoteStatusNumber;


    //Bouton ANOMALIE
    if (params === "0") {
      if (quote[0].quoteStatus === statusName[3].name) {
        quoteStatus = statusName[4].name;
        quoteStatusNumber = "4";
      }
      if (quote[0].quoteStatus === statusName[6].name) {
        quoteStatus = statusName[7].name;
        quoteStatusNumber = "7";
      }
      buttonsActive = quote[0].buttons.map((element) =>
        element.id === 0
          ? { ...element, isActive: false }
          : element.id === 1
          ? {
              ...element,
              isSubmit: false,
              isValidate: false,
              isActive: false,
              isAnomaly: true,
            }
          : element.id === 2
          ? { ...element, isActive: true }
          : element.id === 3
          ? { ...element, isActive: false }
          : element
      );
      let quoteBtnAnomalyAdminData = {
        id_quote: quote[0]._id,
        quote_FK: quote[0].quote_FK,
        quoteStatus,
        buttons: buttonsActive,
        authorizationToken: connectedUser.authorizationToken,
      };
      quoteStatusChangeData = {
        id: quote[0].quote_FK,
        number: quoteStatusNumber,
        quoteStatusOptions:quoteStatus,
        authorizationToken: connectedUser.authorizationToken,
      };
      dispatch(quoteBtnAdminControl(quoteBtnAnomalyAdminData)).then(() =>
        dispatch(quoteStatusChange(quoteStatusChangeData)).catch((err) =>
          console.log(err)
        )
      );
    }
    // Bouton VALIDER
    if (params === "1") {
      if (quote[0].quoteStatus === statusName[3].name) {
        quoteStatus = statusName[5].name;
        quoteStatusNumber = "5";
      }
      buttonsActive = quote[0].buttons.map((element) =>
        element.id === 0
          ? { ...element, isActive: false }
          : element.id === 1
          ? { ...element, isSubmit: false, isValidate: true }
          : element.id === 2
          ? { ...element, isActive: true }
          : element.id === 3
          ? { ...element, isActive: true }
          : element
      );
      if (quote[0].quoteStatus === statusName[6].name) {
        quoteStatus = statusName[8].name;
        quoteStatusNumber = "8";
        buttonsActive = quote[0].buttons.map((element) =>
          element.id === 0
            ? { ...element, isActive: false }
            : element.id === 1
            ? {
                ...element,
                isSubmit: false,
                isValidate: false,
                isSubmitEDF: true,
              }
            : element.id === 2
            ? { ...element, isActive: true }
            : element.id === 3
            ? { ...element, isActive: true }
            : element
        );
      }
      let quoteBtnValidateAdminData = {
        id_quote: quote[0]._id,
        quote_FK: quote[0].quote_FK,
        quoteStatus,
        buttons: buttonsActive,
        authorizationToken: connectedUser.authorizationToken,
      };

      quoteStatusChangeData = {
        id: quote[0].quote_FK,
        number: quoteStatusNumber,
        quoteStatusOptions:quoteStatus,
        authorizationToken: connectedUser.authorizationToken,
      };
      dispatch(quoteBtnAdminControl(quoteBtnValidateAdminData)).then(() =>
        dispatch(quoteStatusChange(quoteStatusChangeData)).catch((err) =>
          console.log(err)
        )
      );
    }
  };

  return (
    connectedUser.isAdmin &&
    (quote[0].quoteStatus === statusName[3].name ||
      quote[0].quoteStatus === statusName[6].name) && (
      <div className="d-flex justify-content-center">
        <Button
          buttonName={"ANOMALIE"}
          buttonClass={"btn btn-danger my-1 me-12"}
          onClick={() => {
            handleBtnAdmin("0");
          }}
        />
        <Button
          buttonName={"VALIDER"}
          buttonClass={"btn btn-success my-1 me-12"}
          onClick={() => {
            handleBtnAdmin("1");
          }}
        />
      </div>
    )
  );
};

export default DisplayButtonsAdmin;
