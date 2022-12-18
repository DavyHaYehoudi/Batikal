import ActionsListSimulations from "../../views/lists/components/ActionsListSimulations";
import InfosStatusQuote from "../../views/lists/components/InfosStatusQuote";
import MessagingModal from "../../views/lists/components/MessagingModal";

export const simulationsTable = [
  {
    columnName: "DATE DE CREATION",
    propertyName: "creationDate",
    id: 1,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "PARTENAIRE",
    propertyName: "partner_Name",
    id: 2,
    isUser: false,
    isAdmin: true,
  },
  {
    columnName: "CLIENT",
    propertyName: "client",
    id: 3,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "CHANTIER - N° DE DOSSIER CEE",
    propertyName: "foldCEENumber",
    id: 4,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "NOM DU CHANTIER",
    propertyName: "siteName",
    id: 5,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "ETAPE DU DOSSIER",
    propertyName: "folderStep",
    id: 6,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: <InfosStatusQuote />,
    propertyName: "quoteStatus",
    id: 7,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "MESSAGE",
    propertyName: "message",
    content: (row) => {
      return (
        <MessagingModal simulation_FK={row._id} rowMessages={row.messages} />
      );
    },
    id: 8,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "ACTIONS",
    propertyName: "actionsSimulations",
    content: (row) => {
      // console.log("row", row);
      return (
        <ActionsListSimulations
          quoteStatus={row.quoteStatus}
          quote_FK={row._id}
          foldCEENumber={row.foldCEENumber}
          partner_Name={row.partner_Name}
          quoteTVA={row.quoteTVA}
          currentPage={"simulations"}
          deletedByUser={row.deletedByUser}
          rowMessages={row.messages}
          idFolderEDF={row.idFolderEDF}
          creationDate={row.creationDate}
          folderStep={row.folderStep}
        />
      );
    },
    id: 9,
    isUser: true,
    isAdmin: true,
  },
];
