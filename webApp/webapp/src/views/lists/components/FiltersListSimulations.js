import React, { Fragment, useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { filtersListSimulations as dataFilter } from "../../../structures/lists/filtersListSimulations";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import logoFilter from "../../../medias/logo-filter.svg";
import { useDispatch } from "react-redux";
import {
  filterBlock,
  getArchivesList,
  getSimulationsList,
} from "../../../feature/simulationsSlice";
import OptionsFilterBlock from "./OptionsFilterBlock";

const FiltersListSimulations = ({
  domain,
  searchClear,
  setReinitFilterBlock,
  reinitFilterBlock,
}) => {
  const [selectedValueId, setSelectedValueId] = useState("0");
  const [selectedFilter, setSelectedFilter] = useState({});
  const [inputInjectActive, setInputInjectActive] = useState(false);
  const [filterApplicate, setFilterApplicate] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const dispatch = useDispatch();

  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  let body = {
    domain,
    authorizationToken: connectedUser.authorizationToken,
    archivedBy_id: connectedUser.DBuserId,
    partner_Name: connectedUser.partner_Name,
  };

  useEffect(() => {
    for (let i = 0; i < dataFilter.length; i++) {
      dataFilter[i].disabled = false;
    }
  }, []);

  const handleOptions = (e) => {
    setSelectedValueId(e.target.value);
    setInputInjectActive(true);
    setSelectedFilter(dataFilter[e.target.value]);
    if (dataFilter[e.target.value].type !== "empty") {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  };
  const inputInject = () => {
    switch (selectedFilter.type) {
      case "text":
      case "date":
      case "numeric":
        return (
          <input
            type={selectedFilter.type}
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder={selectedFilter.header}
            className="search-input rounded p-2"
            onChange={(e) => handleChange(e)}
            autoFocus
          />
        );

      case "radio":
        return selectedFilter.options.map((option, i) => (
          <div className="d-flex" key={option}>
            <input
              type="radio"
              value={option}
              name={"name"}
              className="form-check-input mb-3"
              onChange={(e) => handleChange(e)}
            />
            <label className="form-check-label px-2">{option}</label>
            <br />
          </div>
        ));

      case "checkbox":
        return selectedFilter.options.map((option, i) => (
          <Fragment key={option}>
            <input
              type="checkbox"
              value={option}
              className="form-check-input mb-2"
              onChange={(e) => handleChange(e)}
            />
            <label className="form-check-label px-2">{option}</label>
            <br />
          </Fragment>
        ));

      default:
        return "";
    }
  };
  const handleChange = (e) => {
    setButtonActive(true);

    if (selectedFilter.type === "date") {
      let dateInput = e.target.value;
      let dateArray = dateInput.split("-");
      let dateFr = [dateArray[2], dateArray[1], dateArray[0]].join("/");
      selectedFilter.value = dateFr;
      setSelectedFilter(selectedFilter);
    } else if (selectedFilter.type === "checkbox") {
      let checked = selectedFilter.value;

      if (checked.includes(e.target.value)) {
        let duplicateChecked = checked.findIndex((db) => db === e.target.value);
        checked.splice(duplicateChecked, 1);
        selectedFilter.value = checked;
        setSelectedFilter(selectedFilter);
      } else {
        checked.push(e.target.value);
        selectedFilter.value = checked;
        setSelectedFilter(selectedFilter);
      }
    } else {
      if (e.target.value.trim() === "" || e.target.value.trim() === undefined) {
        setButtonActive(false);
      }
      selectedFilter.value = e.target.value.trim();
      setSelectedFilter(selectedFilter);
    }
  };

  const handleFilterApplicate = () => {
    setInputInjectActive(false);
    let duplicate = filterApplicate.some((s) => s.id === selectedValueId);

    if (!duplicate) {
      selectedFilter.disabled = true;
      setFilterApplicate([...filterApplicate, selectedFilter]);
      let filterBlockAddData = {
        filter: [...filterApplicate, selectedFilter],
        domain,
        archivedBy_id: connectedUser.DBuserId,
        authorizationToken: connectedUser.authorizationToken,
        partner_Name: connectedUser.partner_Name,
      };
      dispatch(filterBlock(filterBlockAddData));
    }
    setButtonActive(false);
    setSelectedValueId("0");
    searchClear();
  };

  const handleFilterDelete = (fl_id) => {
    setInputInjectActive(false);
    let filterTmp = [...filterApplicate];
    let filterIndex = filterApplicate.findIndex((f) => f.id === fl_id);
    if (filterApplicate[filterIndex].type === "checkbox") {
      filterApplicate[filterIndex].value = [];
    }
    filterTmp.splice(filterIndex, 1);
    setFilterApplicate(filterTmp);
    setSelectedValueId("0");
    filterApplicate[filterIndex].disabled = false;
    if (filterTmp.length > 0) {
      let filterBlockDeleteData = {
        filter: filterTmp,
        domain,
        archivedBy_id: connectedUser.DBuserId,
        authorizationToken: connectedUser.authorizationToken,
        partner_Name: connectedUser.partner_Name,
      };

      dispatch(filterBlock(filterBlockDeleteData));
    } else {
      dispatch(getSimulationsList(body));
      dispatch(getArchivesList(body));
    }
  };

  const reset = () => {
    filterApplicate.map((a) =>
      setFilterApplicate(
        ...filterApplicate,
        a.type === "checkbox"
          ? ((a.value = []), (a.disabled = false))
          : a.type !== "empty"
          ? ((a.value = ""), (a.disabled = false))
          : (a.disabled = false)
      )
    );
    setFilterApplicate([]);
    setInputInjectActive(false);
    setSelectedValueId("0");
    setButtonActive(false);
    dispatch(getSimulationsList(body));
    dispatch(getArchivesList(body));
    searchClear();
  };

  //Lors de l'action d'un des 3 Boutons raccourcis filtre Admin
  useEffect(() => {
    if (reinitFilterBlock) {
      filterApplicate.map((a) =>
        setFilterApplicate(
          ...filterApplicate,
          a.type === "checkbox"
            ? ((a.value = []), (a.disabled = false))
            : a.type !== "empty"
            ? ((a.value = ""), (a.disabled = false))
            : (a.disabled = false)
        )
      );
      setFilterApplicate([]);
      setInputInjectActive(false);
      setSelectedValueId("0");
      setButtonActive(false);
      searchClear();
      setReinitFilterBlock(false);
    }
  }, [reinitFilterBlock]);

  const filters = (
    <Popover>
      <PopoverHeader as="h3">
        <div className="px-7 py-5">
          <div className="fs-5 fw-bolder">Options de filtrages</div>
          <div className="mb-5 mt-5">
            {filterApplicate.map((fl, i) => (
              <div
                className="d-flex align-items-start list-unstyled border border-white rounded mt-2"
                key={i}
              >
                <p
                  className="btn btn-danger btn-active-light p-2 mx-3 mt-1"
                  onClick={() => handleFilterDelete(fl.id)}
                >
                  X
                </p>
                <div className="mt-1">
                  <span>{fl.header} </span>

                  {fl.type === "checkbox" ? (
                    fl.value.map((fv, i) => (
                      <p key={i} className="mt-2">
                        {"-"} {fv}
                      </p>
                    ))
                  ) : (
                    <p className="mt-1">{fl.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverHeader>
      <PopoverBody>
        <div className="bg-light rounded">
          <div className="separator border-gray-200"></div>
          <div className="px-7 py-5">
            <div className="mb-10">
              <label className="form-label fw-bold">Choisir un filtre :</label>
              <div>
                <select
                  className="form-select form-select-solid"
                  value={selectedValueId}
                  onChange={(e) => handleOptions(e)}
                >
                  {connectedUser && (
                    <OptionsFilterBlock
                      isAdmin={connectedUser.isAdmin}
                      domain={domain}
                      dataFilter={dataFilter}
                    />
                  )}
                </select>

                <div className="mt-3">
                  {inputInjectActive && inputInject(selectedValueId)}{" "}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="reset"
                className={" btn btn-sm btn-light btn-active-light-white mx-5"}
                onClick={reset}
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                className={
                  buttonActive ? "btn btn-sm btn-success " : "btn disabled"
                }
                onClick={handleFilterApplicate}
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      </PopoverBody>
    </Popover>
  );

  return (
    <div className="m-0">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={filters}
        rootClose
      >
        <button className="btn btn-active-warning text-black border border-primary fw-boldest ">
          <span className="svg-icon svg-icon-5 svg-icon-gray-600 me-1">
            <img src={logoFilter} alt="logo filtre" />
          </span>
          FILTRER
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default FiltersListSimulations;
