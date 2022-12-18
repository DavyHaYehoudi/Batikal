import React from "react";

const Footer = () => {
  return (
    <div
      className="footer py-4 d-flex"
      style={{
        backgroundColor: "rgb(14,74,112)",
        minHeight: "100px",
        marginTop: "10px",
      }}
    >
      <div className="container-fluid">
        <div className="fs-1">
          <span className="fw-bold me-1" style={{ color: "rgb(224,224,224)" }}>
            2023©
          </span>
          <a
            href="https://www.batikal-group.com/"
            rel="noreferrer"
            target="_blank"
            className="text-hover-white"
            style={{ color: "rgb(255,158,94)" }}
          >
            Batikal
          </a>
        </div>
        <p>
          <a href="https://www.alonactiv.com/" rel="noreferrer" target="_blank" className="text-white">
            Powered by Alon Active
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
