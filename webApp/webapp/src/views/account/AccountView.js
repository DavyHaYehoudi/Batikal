import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "../../components/Form";
import TitlePage from "../../components/TitlePage";
import { connectedUserInfo } from "../../feature/connectedUserSlice";
import Footer from "../../layout/Footer";
import Navbar from "../../layout/Navbar";
import { accountFields } from "../../structures/account/accountFields";
import AccountLogo from "./components/AccountLogo";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const AccountView = () => {
  const dispatch = useDispatch();
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const loading = useSelector((state) => state.connectedUser.loading);

  useEffect(() => {
    let connectedUserInfoData = {
      authorizationToken: connectedUser.authorizationToken,
      id: connectedUser.DBuserId,
    };
    dispatch(connectedUserInfo(connectedUserInfoData));
  }, []);

  return (
    <>
      <Navbar
        navsTo={[
          { name: "Compte", to: "/account" },
          { name: "Dossiers", to: "/folders" },
          { name: "Archives", to: "/archives" },
        ]}
      />
      <div className="text-center m-5 p-10">
        <TitlePage name={"MON COMPTE"} />
      </div>
      <div className="col-xl-12">
        <div className="p-10" style={{ backgroundColor: "rgb(14,74,112)" }}>
          <AccountLogo />
          <Form
            lists={accountFields}
            labelClass={"fs-2 fw-bold form-label w-50"}
            groupClass={"mb-3 d-flex w-50 m-auto"}
            textClass={"text-white"}
            buttonWrapperClass={"text-end"}
            buttonName={"Enregistrer"}
            buttonClass={"btn btn-white btn-active-warning fw-boldest"}
          />
          {loading&&
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="rgb(255, 158, 94)"
              ariaLabel="three-dots-loading"
              wrapperStyle={{display:"flex",justifyContent:"end"}}
              wrapperClassName=""
              visible={true}
            />
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountView;
