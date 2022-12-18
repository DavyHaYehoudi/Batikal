import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { connexionEDFlogin, userLogin } from "../../feature/connectedUserSlice";
import Footer from "../../layout/Footer";
import logo from "../../medias/logo-batikal.svg";
import Form from "react-bootstrap/Form";
import { Modale } from "../../components/Modale";
import { ThreeDots } from "react-loader-spinner";
import { Alerte } from "../../components/Alerte";

const LoginView = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [required, setRequired] = useState(false);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const connexionEDF = useSelector((state) => state.connectedUser.connexionEDF);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
    localStorage.setItem("connectedUser", JSON.stringify(""));
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
    setRequired(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setRequired(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email === undefined ||
      email === "" ||
      password === undefined ||
      password === ""
    ) {
      setRequired(true);
    } else {
      let userLoginData = {
        email,
        password,
      };
      dispatch(userLogin(userLoginData));
      dispatch(connexionEDFlogin());
      localStorage.setItem("connectedUser", JSON.stringify(""));
    }
  };

  return (
    <div>
      {/* ************ Modal notification login -start- ************ */}
      <Modale
        title="Information générale"
        content=" Pour se connecter à votre application Batikal, saisissez les mêmes identifiants qui vous connectent au portail 3E EDF."
        btn2="Fermer"
      />
      {/* ************ Modal notification login -end- ************ */}
      {/* ************ Modal wait connexion EDF -start- ************ */}
      {connexionEDF && (
        <Modale
          title="Connexion au portail 3E EDF"
          content="Veuillez patienter, cette opération peut prendre quelques
              secondes."
          animation={
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="rgb(255, 158, 94)"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ display: "flex", justifyContent: "center" }}
              wrapperClassName=""
              visible={true}
            />
          }
          btn2="Fermer"
        />
      )}
      {/* ************ Modal wait connexion EDF -end- ************ */}

      {/* ************ Modal connexion EDF error -start- ************ */}
      {connectedUser && connectedUser.auth === "ERR_BAD_REQUEST" && (
        <Modale
          title="Connexion au portail 3E EDF"
          content="La connexion au portail 3E EDF a échoué. Les identifiants sur l'application Batikal doivent être identiques à ceux du portail 3E EDF."
          btn2="Fermer"
        />
      )}
      {/* ************ Modal connexion EDF error -end- ************ */}

      <div>
        <div
          className="d-flex flex-column flex-root"
          style={{ backgroundColor: "rgb(14,74,112)",  }}
        >
          <img
            src={logo}
            alt="logo"
            width="20%"
            style={{ display: "block", margin: "auto", position: "relative",}}
          />
          {/* ************ Alert connexion EDF error -start- ************ */}
          {required && (
            <Alerte
              title="Identifiants incomplets"
              content="Veuillez remplir tous les champs pour vous connecter."
            />
          )}
          {/* ************ Alert connexion EDF error -end- ************ */}

          <Form>
            <div className="d-flex flex-start flex-column flex-column-fluid  pb-lg-20 ">
              <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
                <div
                  className="form"
                  noValidate="novalidate"
                >
                  <div className="fv-row mb-10">
                    <label className="form-label fs-6 fw-boldest text-primary">
                      Email du portail 3E EDF<span className="required"></span>
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid bg-white border-primary"
                      type="text"
                      name="email"
                      autoComplete="off"
                      autoFocus="on"
                      onChange={(e) => handleEmail(e)}
                    />
                  </div>
                  <div className="fv-row mb-10">
                    <div className="d-flex flex-stack mb-2">
                      <label className="form-label fw-boldest text-primary fs-6 mb-0">
                        Mot de passe<span className="required"></span>
                      </label>
                    </div>
                    <input
                      className="form-control form-control-lg form-control-solid bg-white border-primary"
                      type="password"
                      name="password"
                      autoComplete="off"
                      onChange={(e) => handlePassword(e)}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      buttonName={"CONTINUER"}
                      buttonClass={
                        "btn btn-lg w-50 btn-outline-warning fw-boldest border border-primary fw-boldest"
                      }
                      type={"submit"}
                      onClick={(e) => handleLogin(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginView;
