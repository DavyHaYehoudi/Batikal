import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const Alerte = ({title,content}) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Alert show={showAlert} variant="success w-50 m-auto my-4">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{content}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
      </Alert>
    </>
  );
};
