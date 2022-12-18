import React, { useEffect, useRef } from "react";
import logoBatikal from "../../../medias/logo-batikal.svg";

const MessagingAuthor = ({
  time,
  societyName,
  content,
  postAuthor_id,
  logo,
}) => {
  const scrollToEnd = useRef();
  useEffect(() => {
    scrollToEnd.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <div ref={scrollToEnd}>
      <div className="d-flex flex-column align-items-end mb-10">
        <div className="d-flex align-items-center mb-2">
          <div className="me-3 text-black">
            <span className="text-muted fs-7 m-2">{time}</span>
            {societyName}
          </div>
          <div className="symbol symbol-35px symbol-circle">
            {postAuthor_id === "637c9e2ea0da83" ? (
              <img alt="logo-Batikal" src={logoBatikal} />
            ) : (
              <img alt="logo-unitech" src={logo} />
            )}
          </div>
        </div>
        <div className="p-5 rounded  bg-white text-black fw-bold mw-lg-400px text-end">
          {content}
        </div>
      </div>
    </div>
  );
};

export default MessagingAuthor;
