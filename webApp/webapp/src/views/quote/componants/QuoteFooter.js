import React from "react";

const QuoteFooter = ({
  societyName,
  address,
  postalCodeCity,
  siret,
  NAFcode,
  decennial_insurance,
}) => {
  return (
    <div className="border-bottom fs-6 fw-boldest text-black mt-5 mb-5 bg-white">
      <div>
        <p className="fw-bolder">Termes et conditions</p>
        <p className="fs-8">
          Les travaux ou prestations objet du présent document donneront lieu à
          une contribution financière de EDF France dans le cadre de son rôle
          incitatif, directement ou via BATIKAL, sous réserve de l'engagement de
          fournir exclusivement à EDF France les documents nécessaires à la
          valorisation des opérations au titre du dispositif des Certificats
          d'Economies d'Energie et sous réserve de la validation de
          l'éligibilité du dossier par EDF France puis par l'autorité
          administrative compétente. Cette offre comprend la prime versée par
          EDF France ou BATIKAL au titre du dispositif des Certificats
          d'Economies d'Energie d'un montant de 23559.52 €. Le client accepte
          que BATIKAL, collecte et traite ses données à caractère personnel pour
          les besoins du dépôt d'un dossier CEE sur le registre EMMY
          conformément aux dispositions réglementaires en vigueur et qu'il
          communique ces données à EDF France à des fins de contrôle de la
          conformité des opérations réalisées chez le client.
          <br />
          EDF France s'engage à respecter la réglementation française et
          européenne relative à la protection des données à caractère personnel.
        </p>
      </div>
      <div>
        <p className="fw-boldest">
          Date, signature et tampon du client précédés de la mention "Bon pour
          accord"
        </p>
        <p>Nom :</p>
        <p>Prénom</p>
        <p>Qualité :</p>
      </div>
      <div className="border-bottom fs-6 fw-boldest text-black mt-15"></div>
      <div className="mt-2 mb-15 h-350px fs-8 text-black">
        <p>Je soussigné,</p>
        <p>
          vous notifie par la présente utiliser mon droit de rétractation pour
          le contrat portant sur la prestation commandé le
        </p>
        <p>Nom du consommateur : </p>
        <p>Adresse du consommateur</p>
        <p>Date :</p>
        <p>Signature du consommateur :</p>
      </div>
      <div className="mt-15 text-black">
        <p className="text-center">
          {societyName} - {address}, {postalCodeCity}, France SIRET :{siret} -
          Code APE : {NAFcode} Assurance décennale : {decennial_insurance}
        </p>
      </div>
    </div>
  );
};

export default QuoteFooter;
