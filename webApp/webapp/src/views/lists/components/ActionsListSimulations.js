import React from "react";
import Dropdown from "../../../components/Dropdown";
import { useDispatch } from "react-redux";
import {
  archived,
  deleteSimulations,
  modalQuoteCreate,
  quoteStatusChange,
  reactived,
  unarchived,
} from "../../../feature/simulationsSlice";
import {
  handleQuoteCreated,
  quoteGenerate,
} from "../../../feature/quotesSlice";
import { quoteDating } from "../../../utils";
import { useSelector } from "react-redux";
import {
  actionsSimulations,
  subDropdown,
} from "../../../structures/lists/actionsSimulations";
import { actionsArchives } from "../../../structures/lists/actionsArchives";

const ActionsListSimulations = ({
  quoteStatus,
  quote_FK,
  partner_Name,
  foldCEENumber,
  currentPage,
  deletedByUser,
  rowMessages,
  idFolderEDF,
  creationDate,
  folderStep,
}) => {
  //La variable quote_FK a la même valeur que l'id de la simulation
  const dispatch = useDispatch();
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const userConnected = useSelector((state) => state.connectedUser.userInfo);
  const statusName = useSelector((state) => state.statusName.statusName);

  const handleActions = (item_id, subItemIndex) => {
    switch (item_id) {
      // Consulter
      case "0":
        let idConsult = quote_FK;
        window.open(`/quote/${idConsult}`, "_blanck", "noopener,noreferrer");
        break;
      // Supprimer
      case "1":
        let confirm = window.confirm(
          "Voulez-vous vraiment supprimer ce dossier ?"
        );
        if (confirm) {
          let deleteData = {
            quote_FK,
            authorizationToken: connectedUser.authorizationToken,
          };
          dispatch(deleteSimulations(deleteData));
        }
        break;
      // Archiver
      case "2":
        let archivedData = {
          id: quote_FK,
          reasonArchived: subDropdown[subItemIndex].name,
          archivedBy_id: connectedUser.DBuserId,
          authorizationToken: connectedUser.authorizationToken,
        };
        if (connectedUser.isAdmin) {
          let confirm = window.confirm(
            "Voulez-vous vraiment archiver ce dossier ?"
          );
          if (confirm) {
            dispatch(archived(archivedData));
          }
        } else {
          dispatch(archived(archivedData));
        }
        break;
      // Replacer dans la liste dossiers
      case "3":
        let unarchivedData = {
          id: quote_FK,
          authorizationToken: connectedUser.authorizationToken,
        };
        if (connectedUser.isAdmin) {
          let confirm = window.confirm(
            "Voulez-vous vraiment replacer ce dossier dans la liste principale ?"
          );
          if (confirm) {
            dispatch(unarchived(unarchivedData));
          }
        } else {
          dispatch(unarchived(unarchivedData));
        }
        break;
      // Réactiver dossier supprimé
      case "4":
        let reactivedData = {
          id: quote_FK,
          authorizationToken: connectedUser.authorizationToken,
        };
        if (connectedUser.isAdmin) {
          let confirm = window.confirm(
            "Voulez-vous vraiment réactiver ce dossier ?"
          );
          if (confirm) {
            dispatch(reactived(reactivedData));
          }
        } else {
          dispatch(reactived(reactivedData));
        }

        break;
      // Générer devis
      case "5":
        let quoteDate = quoteDating(creationDate);

        let dataCreate = {
          idFolderEDF,
          id_creator: connectedUser.DBuserId,
          partner_Name,
          foldCEENumber,
          quoteStatus: statusName[1].name,
          quote_FK,
          quoteDate,
          authorizationToken: connectedUser.authorizationToken,
          rowMessages,
          buttons: [
            {
              id: 0,
              name: "Enregistrer",
              classActive: "btn btn-success my-1 me-12",
              classDisabled: "btn btn-secondary my-1 me-12 disabled",
              isActive: true,
            },
            {
              id: 1,
              name: "Soumettre à Batikal pour vérification",
              nameSubmit: "Devis soumis à Batikal, en attente de validation",
              nameValidate: "Informer Batikal : devis signé et envoyé",
              nameAnomaly: "Anomalie relevée par Batikal",
              nameSubmitEDF: "En attente de validation EDF",
              classActive: "btn btn-success my-1 me-12",
              classDisabled: "btn btn-secondary my-1 me-12 disabled",
              isActive: false,
              isSubmit: false,
              isValidate: false,
              isAnomaly: false,
              isSubmitEDF: false,
            },
            {
              id: 2,
              name: "Modifier",
              classActive: "btn btn-success my-1 me-12",
              classDisabled: "btn btn-secondary my-1 me-12 disabled",
              isActive: false,
            },
            {
              id: 3,
              name: "Imprimer",
              classActive: "btn btn-success btn-active-light my-1 me-12",
              classDisabled: "btn btn-secondary my-1 me-12 disabled",
              isActive: false,
            },
          ],
        };

        dispatch(modalQuoteCreate(true));
        dispatch(handleQuoteCreated());
        dispatch(quoteGenerate(dataCreate)).then((res) => {
          if (res.payload.name === "AxiosError") {
            // Fermeture modale patienter création devis
            dispatch(modalQuoteCreate(false));
            return;
          }
          // Statut simulation à "en cours de rédaction"
          let quoteStatusChangeData = {
            id: quote_FK,
            number: "1",
            authorizationToken: connectedUser.authorizationToken,
          };
          dispatch(quoteStatusChange(quoteStatusChangeData));
          // Fermeture modale patienter création devis
          dispatch(modalQuoteCreate(false));
          // Ouverture page devis s'il peut être généré et une fois que la dataEDF est chargée dans MongoDB
          let idCreate = quote_FK;
          window.open(`/quote/${idCreate}`, "_blanck", "noopener,noreferrer");
        });

        break;
      default:
        console.log("I am in the default case");
    }
  };
  return currentPage === "simulations" ? (
    <Dropdown
      actions={actionsSimulations}
      quoteStatus={quoteStatus}
      mainDropDirection={"down"}
      subDropDirection={"end"}
      element={"..."}
      arrowDisplay={"arrowDisplayNone"}
      onClick={handleActions}
      deletedByUser={deletedByUser}
      isAdmin={connectedUser.isAdmin}
      folderStep={folderStep}
    />
  ) : (
    currentPage === "archives" && (
      <Dropdown
        actions={actionsArchives}
        quoteStatus={quoteStatus}
        mainDropDirection={"down"}
        subDropDirection={"end"}
        element={"..."}
        arrowDisplay={"arrowDisplayNone"}
        onClick={handleActions}
        deletedByUser={deletedByUser}
        isAdmin={connectedUser.isAdmin}
        folderStep={folderStep}
      />
    )
  );
};

export default ActionsListSimulations;
