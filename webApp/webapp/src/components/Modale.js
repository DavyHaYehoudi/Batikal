import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

export const Modale = ({ title, content, animation, btn1, btn2 }) => {
  const [show, setShow] = useState(true);

  /* fonctions basiques pour le composant */
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary d-none" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content} {animation}{" "}
        </Modal.Body>
        <Modal.Footer>
          {btn1 && (
            <Button variant="secondary" onClick={handleClose}>
              {btn1}
            </Button>
          )}
          {btn2 && (
            <Button variant="primary" onClick={handleClose}>
              {btn2}{" "}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
