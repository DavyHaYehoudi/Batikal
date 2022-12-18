import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import TitlePage from "../../components/TitlePage";
import Footer from "../../layout/Footer";
import Search from "../../components/Search";
import { simulationsTable } from "../../structures/lists/simulationsTable";
import Table from "../../components/Table";
import { ButtonGroup } from "../../components/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBlock,
  getSimulationsList,
  searchFilterArchives,
  searchFilterSimulations,
} from "../../feature/simulationsSlice";
import { connectedUserInfo } from "../../feature/connectedUserSlice";
import FiltersListSimulations from "./components/FiltersListSimulations";
import { getStatusNameList } from "../../feature/statusNameSlice";
import { BallTriangle } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";
import { Modale } from "../../components/Modale";

const SimulationsView = () => {
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const dispatch = useDispatch();
  const dataTable = useSelector((state) => state.simulations.simulations);
  const statusName = useSelector((state) => state.statusName.statusName);
  const loading = useSelector((state) => state.simulations.loading);
  const modalQuoteCreate = useSelector(
    (state) => state.simulations.modalQuoteCreate
  );

  const modalQuoteCannotBeCreated = useSelector(
    (state) => state.quotes.cannotBeCreated
  );
  const [searchValue, setSearchValue] = useState("");
  const [reinitFilterBlock, setReinitFilterBlock] = useState(false);

  // Gestion du filtre de la barre de recherche
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
    };
    // Quand on efface le contenu dans l'input search on veut retrouver les données initiales
    if (e.target.value === "") {
      dispatch(getSimulationsList(bodu));
    }
  };

  const searchClear = () => {
    setSearchValue("");
  };

  let body = {
    authorizationToken: connectedUser.authorizationToken,
    id: connectedUser.DBuserId,
    partner_Name: connectedUser.partner_Name,
  };

  useEffect(() => {
    dispatch(connectedUserInfo(body));
    dispatch(getSimulationsList(body));
    dispatch(getStatusNameList(body));
  }, [dispatch]);

  const handleFilterQuoteWritten = () => {
    let handleFilterQuoteWrittenData = {
      filter: [
        {
          id: "5",
          value: ["En attente de validation", "Anomalie", "Validé"],
        },
      ],
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(filterBlock(handleFilterQuoteWrittenData));
    setReinitFilterBlock(true);
  };

  const handleFilterQuoteSigned = () => {
    let handleFilterQuoteSignedData = {
      filter: [
        {
          id: "6",
          value: ["En attente de validation", "Anomalie", "Validé"],
        },
      ],
      authorizationToken: connectedUser.authorizationToken,
    };
    dispatch(filterBlock(handleFilterQuoteSignedData));
    setReinitFilterBlock(true);
  };

  const handleFilterInit = () => {
    dispatch(getSimulationsList(body));
    setReinitFilterBlock(true);
  };

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
          <TitlePage name={"Vos dossiers"} />
          <Search
            handleSearchValue={(e) => handleSearchValue(e)}
            handleChangeValue={(e) => handleChangeValue(e)}
            searchValue={searchValue}
          />
          {connectedUser.isAdmin && (
            <ButtonGroup
              buttonProperties={[
                {
                  variant: "danger",
                  buttonClass:
                    "btn border border-primary rounded fw-boldest m-1",
                  buttonName: "Devis rédigés",
                  type: "button",
                  isActive: true,
                  onClick: handleFilterQuoteWritten,
                },
                {
                  variant: "primary",
                  buttonClass:
                    "btn border border-primary rounded fw-boldest m-1",
                  buttonName: "Devis signés",
                  type: "button",
                  isActive: true,
                  onClick: handleFilterQuoteSigned,
                },
                {
                  variant: "success",
                  buttonClass:
                    "btn border border-success rounded fw-boldest m-1",
                  buttonName: "Réinitialiser",
                  type: "button",
                  isActive: true,
                  onClick: handleFilterInit,
                },
              ]}
            />
          )}
          <FiltersListSimulations
            domain={"simulations"}
            searchClear={searchClear}
            reinitFilterBlock={reinitFilterBlock}
            setReinitFilterBlock={setReinitFilterBlock}
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
        <div style={{ backgroundColor: "rgb(22, 71, 101)" }}>
          {/* ************ Modal création devis -start- ************ */}
          {modalQuoteCreate && (
            <Modale
              title="Génération du devis"
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
          {/* ************ Modal création devis -end- ************ */}

          {/* ************ Modal création devis impossible -start- ************ */}
          {modalQuoteCannotBeCreated && (
            <Modale
              title="Information"
              content="Le devis ne peut pas être créé. Son stade d'avancement sur le portail 3E EDF ne permet plus d'accéder aux données."
              btn2="Fermer"
            />
          )}
          {/* ************ Modal création devis impossible -end- ************ */}

          <div className="pt-3" style={{marginBottom:"120px"}}>
            {dataTable && statusName && simulationsTable && (
              <Table
                columns={simulationsTable}
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
      <div style={{ position: "fixed", bottom: "0", width: "100%"}}>
        <Footer />
      </div>
    </>
  );
};

export default SimulationsView;
