import React from "react";

const QuoteState = ({ title, titleValue }) => {
  return (
    <p className="btn text-black ">
      {title} : <span className="fw-boldest">{titleValue}</span>
    </p>
  );
};

export default QuoteState;
