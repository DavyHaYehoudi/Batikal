import React from "react";

const QuoteHeaders = () => {
  return (
    <thead>
      <tr className="border-bottom fs-6 fw-bolder text-muted text-black">
        <th className="pb-2 text-black">Désignation des prestations</th>
        <th className="text-center pb-2 text-black">Unité</th>
        <th className="text-center pb-2 text-black">Quantité</th>
        <th className="text-center pb-2 text-black">TVA</th>
        <th className="text-center pb-2 text-black">PU </th>
        <th className="text-center pb-2 text-black">Montant HT </th> 
        <th className="text-center pb-2 text-black">Montant TTC</th>
      </tr>
    </thead>
 
  );
};

export default QuoteHeaders;
