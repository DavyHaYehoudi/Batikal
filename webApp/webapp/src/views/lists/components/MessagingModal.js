import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Form from "react-bootstrap/Form";
import Button from "../../../components/Button";
import MessagingAuthor from "./MessagingAuthor";
import MessagingInterlocutor from "./MessagingInterlocutor";
import logoMessaging from "../../../medias/logo-messaging.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  loadMessage,
  sendMessage,
} from "../../../feature/messagingSlice";
import { dateParser } from "../../../utils";
import { edit } from "../../../feature/simulationsSlice";

const MessagingModal = ({ simulation_FK, rowMessages }) => {
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messaging.messaging);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const DBuserId = connectedUser.DBuserId;
  const userConnected = useSelector((state) => state.connectedUser.userInfo);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(clear());
  };

  const handleShow = () => {
    setShow(true);
    const data = {
      postAuthor_id: DBuserId,
      simulation_FK,
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(loadMessage(data));
    dispatch(edit(simulation_FK));
  };

  const addedPost = () => {
    if (post.trim() !== "" && post !== undefined) {
      let timePost = new Date();
      timePost = dateParser(timePost);
      const body = {
        postAuthor_id: DBuserId,
        simulation_FK,
        content: post,
        time: timePost,
        societyName: userConnected.societyName,
        logo: userConnected.logo,
        authorizationToken: connectedUser.authorizationToken,
      };

      dispatch(sendMessage(body));
      setPost("");
    }
  };

  return (
    <>
      <button
        variant=""
        onClick={handleShow}
        className="border-white rounded position-relative"
      >
        <img src={logoMessaging} alt="logo Messagerie" />
        {!rowMessages[0].read && rowMessages[0].author !== DBuserId && (
          <span className="bullet bullet-dot bg-success h-10px w-10px position-absolute translate-middle top-0 start-50 animation-blink"></span>
        )}
      </button>

      <Modal show={show} onHide={handleClose} scrollable>
        <ModalHeader closeButton style={{ backgroundColor: "aliceblue" }}>
          <ModalTitle className="text-black">Discussion</ModalTitle>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "aliceblue" }}>
          {messages &&
            messages.map((dataMessage, i) =>
              dataMessage.postAuthor_id === connectedUser.DBuserId ? (
                <MessagingAuthor
                  key={i}
                  time={dataMessage.time}
                  societyName={dataMessage.societyName}
                  content={dataMessage.content}
                  postAuthor_id={dataMessage.postAuthor_id}
                  logo={dataMessage.logo}
                />
              ) : (
                <MessagingInterlocutor
                  key={i}
                  time={dataMessage.time}
                  societyName={dataMessage.societyName}
                  content={dataMessage.content}
                  postAuthor_id={dataMessage.postAuthor_id}
                  logo={dataMessage.logo}
                />
              )
            )}

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "black" }}>
              Ecrire un message
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              autoFocus
              style={{ backgroundColor: "aliceblue", color: "black" }}
              onChange={(e) => setPost(e.target.value)}
              value={post}
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter
          style={{ backgroundColor: "aliceblue" }}
          className="d-flex align-items-center"
        >
          <Button
            variant={"warning"}
            buttonClass={"border border-primary fw-boldest"}
            buttonName={"Envoyer >>"}
            onClick={addedPost}
            style={{ color: "black" }}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MessagingModal;
