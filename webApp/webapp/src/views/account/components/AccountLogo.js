import React, { Fragment, useEffect, useState } from "react";
import { Overlay } from "../../../components/Overlay";
import { BiPencil } from "react-icons/bi";
import { accountUploadLogo } from "../../../feature/connectedUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../medias/storage";

const AccountLogo = () => {
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.connectedUser.userInfo);
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const [displayConfirmBtn, setDisplayConfirmBtn] = useState(false);
  const [typeImageAccept, setTypeImageAccept] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (userConnected) {
      setImageUrl(userConnected.logo);
    }
  }, [userConnected]);

  const confirmPicture = () => {
    let logoRef = ref(storage, `logos/${connectedUser.DBuserId}`);
    uploadBytes(logoRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        let data = {
          DBuserId: connectedUser.DBuserId,
          url,
          authorizationToken: connectedUser.authorizationToken,
        };
        dispatch(accountUploadLogo(data));
      });
    });

    setDisplayConfirmBtn(false);
  };

  const handleChange = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpg" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      setFile(e.target.files[0]);
      setDisplayConfirmBtn(true);
      setTypeImageAccept(false);
    } else {
      setTypeImageAccept(true);
    }
  };

  return (
    <>
      <div className="mb-15 mt-5 text-center">
        <label className="fs-2 text-warning">
          Logo
          <Overlay
            contain={"Types de fichiers autorisés : png, jpg, jpeg."}
            element={
              <button className="btn btn-white btn-sm btn-active-warning fw-boldest pt-1 pb-1 m-2">
                <b>?</b>
              </button>
            }
          />
        </label>
        <div className="mt-1">
          <div className="image-input image-input-outline">
            <div className="m-1">
              {userConnected && (
                <img
                  src={imageUrl}
                  alt="logo"
                  className="border border-white rounded w-100px h-100px "
                />
              )}
            </div>
            <Overlay
              contain={"Changer de logo"}
              element={
                <Fragment>
                  <label className="btn btn-white btn-sm btn-active-warning fw-boldest p-1">
                    <i className="fs-1">
                      <BiPencil />
                    </i>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept=".png, .jpg, .jpeg"
                      className="d-none"
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  {displayConfirmBtn && (
                    <button
                      onClick={confirmPicture}
                      className="mx-1 btn btn-white btn-sm btn-active-warning fw-boldest px-1 py-2"
                    >
                      Confirmer
                    </button>
                  )}
                </Fragment>
              }
            />
          </div>
        </div>
        {typeImageAccept && (
          <p className="text-warning fs-4 m-4 text-center">
            Seuls les types png, jpg ou jpeg sont acceptés
          </p>
        )}
      </div>
    </>
  );
};

export default AccountLogo;
