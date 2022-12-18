import { useEffect, useState } from "react";
import BootstrapForm from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  accountProfileGet,
  accountProfileUpdate,
} from "../feature/connectedUserSlice";
import { ObjCompare } from "../utils";
import Button from "./Button";

export const Form = ({
  lists,
  labelClass,
  groupClass,
  buttonWrapperClass,
  buttonName,
  buttonClass,
  textClass,
}) => {
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.connectedUser.userInfo);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  const [record, setRecord] = useState(false);
  const [fieldsInit, setFieldsInit] = useState();

  useEffect(() => {
    let accountProfileGetData = {
      authorizationToken: connectedUser.authorizationToken,
      id: connectedUser.DBuserId,
    };
    dispatch(accountProfileGet(accountProfileGetData));
  }, [connectedUser.DBuserId, connectedUser.authorizationToken, dispatch]);

  const [fields, setFields] = useState({
    societyName: "",
    address: "",
    postalCodeCity: "",
    emailSociety: "",
    TVA: "",
    siret: "",
    NAFcode: "",
    RCS: "",
    decennial_insurance: "",
    other_information: "",
    authorizationToken: connectedUser.authorizationToken,
    id: connectedUser.DBuserId,
  });

  useEffect(() => {
    if (userConnected) {
      setFields({
        ...fields,
        ...{
          societyName: userConnected["societyName"],
          address: userConnected["address"],
          postalCodeCity: userConnected["postalCodeCity"],
          emailSociety: userConnected["emailSociety"],
          TVA: userConnected["TVA"],
          siret: userConnected["siret"],
          NAFcode: userConnected["NAFcode"],
          RCS: userConnected["RCS"],
          decennial_insurance: userConnected["decennial_insurance"],
          other_information: userConnected["other_information"],
        },
      });
      setFieldsInit({
        ...fieldsInit,
        ...{
          societyName: userConnected["societyName"],
          address: userConnected["address"],
          postalCodeCity: userConnected["postalCodeCity"],
          emailSociety: userConnected["emailSociety"],
          TVA: userConnected["TVA"],
          siret: userConnected["siret"],
          NAFcode: userConnected["NAFcode"],
          RCS: userConnected["RCS"],
          decennial_insurance: userConnected["decennial_insurance"],
          other_information: userConnected["other_information"],
        },
      });
    }
  }, [userConnected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, ...{ [name]: value } });
    setRecord(false);
  };

  const handleRecord = (e) => {
    e.preventDefault();
    dispatch(accountProfileUpdate(fields)).then((response) => {
      let objCompare = ObjCompare(fieldsInit, response.payload);

      if (response.meta.requestStatus === "fulfilled" && !objCompare)
        setRecord(true);
    });
  };

  return (
    <BootstrapForm>
      {lists.map((list) => (
        <BootstrapForm.Group key={list.header} className={groupClass}>
          <BootstrapForm.Label className={labelClass}>
            {list.header}
            {list.required && <span className="required"></span>}
          </BootstrapForm.Label>
          <BootstrapForm.Control
            type={list.type}
            name={list.name}
            placeholder={list.placeholder}
            onChange={(e) => handleChange(e)}
            value={fields[list.name]}
            className={textClass}
          />
        </BootstrapForm.Group>
      ))}
      <div className={buttonWrapperClass}>
        <Button
          buttonName={buttonName}
          buttonClass={buttonClass}
          onClick={handleRecord}
        />
        {record && (
          <p className="text-warning fs-4 m-2">
            Vos nouvelles données ont bien été prises en compte
          </p>
        )}
      </div>
    </BootstrapForm>
  );
};
