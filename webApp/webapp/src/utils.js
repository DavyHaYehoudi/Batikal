import { Link } from "react-router-dom";

// Date et heure sur la messagerie
export const dateParser = (date) => {
  let newDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return newDate;
};

export const dateConfig = (date) => {
  let dateConfig = date.toISOString();
  dateConfig = dateConfig.split("T")[0];
  return dateConfig;
};

// Configuration de la date de création du devis au format AAAA-MM-JJ
export const quoteDating = (date) => {
  let dateFormat = [];
  let dateBrut = date.split("/");
  dateFormat.push(dateBrut[2], dateBrut[1], dateBrut[0]);
  dateFormat = dateFormat.join("-");
  return dateFormat;
};
// Affichage date butoir du devis
export const quoteDatingDeadline = (date) => {
  let dateFormat = [];
  let dateBrut = date.split("-");
  dateFormat.push(dateBrut[2], dateBrut[1], dateBrut[0]);
  dateFormat = dateFormat.join("/");
  return dateFormat;
};

export const delayBetween2Dates = (date1, date2) => {
  //date1 et date2 sont au format date française JJ/MM/AAAA
  let firstDateFrench = date1;
  let firstDateFormat = [];
  let ff = firstDateFrench.split("/");
  firstDateFormat.push(ff[1], ff[0], ff[2]);
  firstDateFormat = firstDateFormat.join("/");

  let secondDateFrench = date2;
  let secondDateFormat = [];
  let ss = secondDateFrench.split("/");
  secondDateFormat.push(ss[1], ss[0], ss[2]);
  secondDateFormat = secondDateFormat.join("/");

  let x = new Date(firstDateFormat);
  let y = new Date(secondDateFormat);

  let diffInDays = Math.abs((x - y) / (1000 * 60 * 60 * 24));
  diffInDays = Math.round(diffInDays);
  return diffInDays;
};

export const indexCheet = (cheets, cheet_id, cheetIndex) => {
  let cheet = cheets.find((item) => item.id === cheet_id);
  cheetIndex = cheets.indexOf(cheet);
  return cheetIndex;
};

export const amountTTC = (a, b) => {
  let amountTTC = a * b; //.toFixed(2);
  return amountTTC;
};

export const amountHT = (a, b) => {
  let amountHT = a - (a * b) / 100; //.toFixed(2);

  return amountHT;
};

export const unitPrice = (a, b) => {
  //a = amountHT et b = quantité
  let unitPrice = (a / b).toFixed(2);
  return unitPrice;
};

export const amountTVA = (a, b) => {
  let amountTVA = (a * b) / 100; //.toFixed(2);
  return amountTVA;
};

export const cumulationTVA = (cheets) => {
  let cumulationTVA = {
    cumulationTVA_550: 0,
    cumulationTVA_10: 0,
    cumulationTVA_20: 0,
  };

  for (let i = 0; i < cheets.length; i++) {
    let cheetsValueNumber = Number(cheets[i].TVA.value);
    switch (cheets[i].TVA.rate) {
      case "5.50":
        cumulationTVA.cumulationTVA_550 += Number(cheetsValueNumber);
        break;
      case "10":
        cumulationTVA.cumulationTVA_10 += Number(cheetsValueNumber);
        break;
      case "20":
        cumulationTVA.cumulationTVA_20 += Number(cheetsValueNumber);
        break;
      default:
        console.log("default case cumulationTVA");
    }
  }
  let cumulationTotalTVA =
    cumulationTVA.cumulationTVA_550 +
    cumulationTVA.cumulationTVA_10 +
    cumulationTVA.cumulationTVA_20;

  cumulationTVA.cumulationTotalTVA = cumulationTotalTVA;
  return cumulationTVA;
};

export const numberFormat = (number) => {
  let n = Number.parseFloat(number);

  let nFormat = n.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });
  return nFormat;
};

export const numberThousand = (number) => {
  let nb = new Intl.NumberFormat().format(number);
  return nb;
};

export const recoveryRate = (a, b) => {
  //a = montant total TTC   et b = cumac total du devis
  let newRecoveryRate = Number(a / b).toFixed(2);
  return newRecoveryRate;
};

// Pour vérifier dans la page compte si des changements ont eu lieu entre deux enregistrements
export const ObjCompare = (obj1, obj2) => {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);

  for (let k of Obj1_keys) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
};

export const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link
      to="#"
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
};
