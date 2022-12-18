import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import TitlePage from "../../components/TitlePage";
import Footer from "../../layout/Footer";
import Search from "../../components/Search";
import { archivesTable } from "../../structures/lists/archivesTable";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getArchivesList,
  searchFilterArchives,
  searchFilterSimulations,
} from "../../feature/simulationsSlice";
import FiltersListSimulations from "./components/FiltersListSimulations";
import { BallTriangle } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";
import { getStatusNameList } from "../../feature/statusNameSlice";

const RecordsView = () => {
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const statusName = useSelector((state) => state.statusName.statusName);
  const loading = useSelector((state) => state.simulations.loading);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e) => {
    e.preventDefault();
    let searchFilterData = {
      searchValue,
      archivedBy_id: connectedUser.DBuserId,
      authorizationToken: connectedUser.authorizationToken,
      partner_Name: connectedUser.partner_Name,
    };

    dispatch(searchFilterSimulations(searchFilterData));
    dispatch(searchFilterArchives(searchFilterData));
  };

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value.trimStart());
    let bodu = {
      authorizationToken: connectedUser.authorizationToken,
      partner_Name: connectedUser.partner_Name,
      archivedBy_id: connectedUser.DBuserId,
    };
    // Quand on efface le contenu dans l'input search on veut retrouver les données initiales
    if (e.target.value === "") {
      dispatch(getArchivesList(bodu));
    }
  };

  const searchClear = () => {
    setSearchValue("");
  };

  let body = {
    archivedBy_id: connectedUser.DBuserId,
    authorizationToken: connectedUser.authorizationToken,
    partner_Name: connectedUser.partner_Name,
  };
  const dispatch = useDispatch();
  const dataTable = useSelector((state) => state.simulations.archives);

  useEffect(() => {
    dispatch(getArchivesList(body));
    let data = {
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(getStatusNameList(data));
  }, [dispatch]);

  return (
    <>
      <Navbar
        navsTo={[
          { name: "Compte", to: "/account" },
          { name: "Dossiers", to: "/folders" },
          { name: "Archives", to: "/archives" },
        ]}
      />
      <div>
        <div className=" d-flex align-items-center justify-content-around bg-white mt-5 p-10">
          <TitlePage name={"Vos archives"} />
          <Search
            handleSearchValue={(e) => handleSearchValue(e)}
            handleChangeValue={(e) => handleChangeValue(e)}
            searchValue={searchValue}
          />
          <FiltersListSimulations
            domain={"archives"}
            searchClear={searchClear}
          />
        </div>
        {loading && (
          <>
            <p className="fs-1 text-center text-black">Chargement en cours</p>
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
          </>
        )}
        <div style={{ backgroundColor: "rgb(14,74,112)" }}>
          <div className="pt-3" style={{marginBottom:"120px"}}>
            {dataTable && statusName && archivesTable && (
              <Table
                columns={archivesTable}
                data={dataTable}
                isAdmin={connectedUser.isAdmin}
                statusName={statusName}
              />
            )}
          </div>
        </div>
      </div>
      {loading && (
        <>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="rgb(255, 158, 94)"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
            }}
            visible={false}
          />
          <p
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "black",
              margin: "50px",
            }}
          >
            Veuillez patienter ...
          </p>
        </>
      )}
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
      <Footer />
      </div>
    </>
  );
};

export default RecordsView;
