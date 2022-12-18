import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  quoteBtnModify,
  quoteBtnRegister,
  quoteBtnSubmit,
} from "../../../feature/quotesSlice";
import { quoteStatusChange } from "../../../feature/simulationsSlice";

const DisplayButtonsUser = ({ button, statusName }) => {
  const quote = useSelector((state) => state.quotes.quote);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const [cheets, setCheets] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (quote) {
      setCheets(quote[0].cheets);
    }
  }, [quote]);

  const handleClickButton = (id_btn) => {
    const {
      _id,
      id_creator,
      partner_Name,
      foldCEENumber,
      quoteStatus,
      quoteDate,
      technicalVisit,
      recoveryRate,
      buttons,
      quoteNumber,
      cheets,
      cumulationTTC,
      quote_FK,
      notes,
      comments,
    } = quote[0];
    let buttonsActive;
    let quoteStatusNumber;
    let quoteStatusNumberSimulation;
    let quoteStatusChangeData;
    let quoteStatusName;
    switch (id_btn) {
      // Bouton enregistrer
      case 0:
        switch (quoteStatus) {
          case statusName[1].name:
          case statusName[2].name:
          case statusName[4].name:
          case statusName[5].name:
            buttonsActive = buttons.map((element) =>
              element.id === 1 ? { ...element, isActive: true } : element
            );
            break;

          default:
            console.log("default case from quoteStatusNumber");
        }

        let btnRegisterData = {
          id_quote: _id,
          id_creator,
          partner_Name,
          foldCEENumber,
          quoteStatus: statusName[2].name,
          quoteDate,
          technicalVisit,
          recoveryRate,
          buttons: buttonsActive,
          quoteNumber,
          cheets: cheets,
          notes,
          comments,
          cumulationTTC,
          quote_FK,
          authorizationToken: connectedUser.authorizationToken,
        };

        quoteStatusChangeData = {
          id: quote_FK,
          number: "1",
          authorizationToken: connectedUser.authorizationToken,
        };
        dispatch(quoteBtnRegister(btnRegisterData)).then(() =>
          dispatch(quoteStatusChange(quoteStatusChangeData)).catch((err) =>
            console.log(err)
          )
        );
        break;
      case 1:
        // Bouton soumettre
        buttonsActive = buttons.map((element) =>
          element.id === 0
            ? { ...element, isActive: false }
            : element.id === 1
            ? { ...element, isActive: false, isSubmit: true }
            : element.id === 2
            ? { ...element, isActive: true }
            : element.id === 3
            ? { ...element, isActive: false }
            : element
        );

        if (quoteStatus === statusName[2].name) {
          quoteStatusNumber = "3";
          quoteStatusName = statusName[3].name;
        }
        if (quoteStatus === statusName[5].name) {
          quoteStatusNumber = "6";
          quoteStatusName = statusName[6].name;
        }
        let quoteBtnSubmitData = {
          id_quote: _id,
          quote_FK,
          id_creator,
          partner_Name,
          foldCEENumber,
          quoteStatus: quoteStatusName,
          quoteDate,
          technicalVisit,
          recoveryRate,
          buttons: buttonsActive,
          quoteNumber,
          cheets,
          notes,
          comments,
          cumulationTTC,
          authorizationToken: connectedUser.authorizationToken,
        };

        quoteStatusChangeData = {
          id: quote_FK,
          number: quoteStatusNumber,
          quoteStatusOptions:quoteStatusName,
          authorizationToken: connectedUser.authorizationToken,
        };
        dispatch(quoteBtnSubmit(quoteBtnSubmitData)).then(() =>
          dispatch(quoteStatusChange(quoteStatusChangeData)).catch((err) =>
            console.log(err)
          )
        );
        break;
      case 2:
        // Bouton modifier
        let confirm;
        if (
          quote[0].quoteStatus === statusName[4].name ||
          quote[0].quoteStatus === statusName[7].name
        ) {
          confirm = true;
        } else {
          confirm = window.confirm(
            "Attention : Si vous modifiez, il vous faudra de nouveau soumettre le devis à Batikal. Etes-vous sûr de vouloir modifier ce devis ?"
          );
        }
        if (confirm) {
          buttonsActive = buttons.map((element) =>
            element.id === 0
              ? { ...element, isActive: true }
              : element.id === 1
              ? {
                  ...element,
                  isSubmit: false,
                  isValidate: false,
                  isActive: false,
                }
              : element.id === 2
              ? { ...element, isActive: false }
              : element.id === 3
              ? { ...element, isActive: false }
              : element
          );
          if (quote[0].quoteStatus === statusName[3].name) {
            quoteStatusNumber = 2;
            quoteStatusNumberSimulation = 1;
          }

          if (
            quote[0].quoteStatus === statusName[4].name ||
            quote[0].quoteStatus === statusName[6].name ||
            quote[0].quoteStatus === statusName[7].name ||
            quote[0].quoteStatus === statusName[8].name
          ) {
            quoteStatusNumber = 1;
            quoteStatusNumberSimulation = 1;
            buttonsActive = buttons.map((element) =>
              element.id === 0
                ? { ...element, isActive: true }
                : element.id === 1
                ? {
                    ...element,
                    isSubmit: false,
                    isActive: false,
                    isValidate: false,
                    isAnomaly: false,
                  }
                : element.id === 2
                ? { ...element, isActive: false }
                : element.id === 3
                ? { ...element, isActive: false }
                : element
            );
          }
          if (quote[0].quoteStatus === statusName[5].name) {
            quoteStatusNumber = 1;
            quoteStatusNumberSimulation = 1;
          }
          let quoteBtnModifyData = {
            id_quote: _id,
            quote_FK,
            quoteStatus: statusName[quoteStatusNumber].name,
            buttons: buttonsActive,
            authorizationToken: connectedUser.authorizationToken,
          };
          quoteStatusChangeData = {
            id: quote_FK,
            number: String(quoteStatusNumberSimulation),
            quoteStatusOptions:statusName[quoteStatusNumber].name,
            authorizationToken: connectedUser.authorizationToken,
          };
          dispatch(quoteBtnModify(quoteBtnModifyData)).then(() =>
            dispatch(quoteStatusChange(quoteStatusChangeData)).catch((err) =>
              console.log(err)
            )
          );
        }

        break;
      case 3:
        window.print();
        break;
      default:
        console.log("default case from handleClickButton");
    }
  };

  if (button.isActive) {
    return (
      <Button
        key={button.name}
        buttonName={button.name}
        buttonClass={button.classActive}
        onClick={() => handleClickButton(button.id)}
      />
    );
  } else {
    if (button.isSubmit) {
      return (
        <Button
          key={button.name}
          buttonName={button.nameSubmit}
          buttonClass={button.classDisabled}
        />
      );
    } else if (button.isValidate) {
      return (
        <Button
          key={button.name}
          buttonName={button.nameValidate}
          buttonClass={button.classActive}
          onClick={() => handleClickButton(button.id)}
        />
      );
    } else if (button.isAnomaly) {
      return (
        <Button
          key={button.name}
          buttonName={button.nameAnomaly}
          buttonClass={button.classDisabled}
        />
      );
    } else if (button.isSubmitEDF) {
      return (
        <Button
          key={button.name}
          buttonName={button.nameSubmitEDF}
          buttonClass={button.classDisabled}
        />
      );
    } else {
      return (
        <Button
          key={button.name}
          buttonName={button.name}
          buttonClass={button.classDisabled}
        />
      );
    }
  }
};

export default DisplayButtonsUser;
