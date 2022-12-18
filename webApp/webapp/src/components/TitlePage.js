import React from "react";

const TitlePage = ({ name, titleClass, titleStyle }) => {
  return (
    <h1 className={titleClass} style={titleStyle}>
      {name}
    </h1>
  );
};

TitlePage.defaultProps = {
  titleClass: "fw-boldest text-uppercase",
  titleStyle: {
    color: "#181c32",
    fontSize: "3rem",
  },
};

export default TitlePage;
