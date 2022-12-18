import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import logoBatikal from "../../../medias/logo-batikal.svg";

const MessagingInterlocutor = ({
  time,
  societyName,
  content,
  postAuthor_id,
  logo,
}) => {
  const messages = useSelector((state) => state.messaging.messaging);
  const scrollToEnd = useRef();
  useEffect(() => {
    scrollToEnd.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  return (
    <div className="mb-10" ref={scrollToEnd}>
      <div className="d-flex align-items-center mb-2">
        <div className="symbol symbol-35px symbol-circle">
          {postAuthor_id === "637c9e2ea0da83" ? (
            <img alt="logo-Batikal" src={logoBatikal} />
          ) : (
            <img alt="logo-unitech" src={logo} />
          )}
        </div>
        <div className="ms-3 text-black">
          {societyName}
          <span className="text-muted fs-7 m-2">{time} </span>
        </div>
      </div>
      <div className="p-5 rounded bg-light-primary fw-bold mw-lg-400px text-start">
        {content}
      </div>
    </div>
  );
};

export default MessagingInterlocutor;
