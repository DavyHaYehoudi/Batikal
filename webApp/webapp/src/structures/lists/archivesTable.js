import InfosStatusQuote from "../../views/lists/components/InfosStatusQuote";
import ActionsListSimulations from "../../views/lists/components/ActionsListSimulations";

export const archivesTable = [
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
    isAdmin: true,
    isUser: false,
  },
  {
    columnName: "CLIENT",
    propertyName: "client",
    id: 3,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "CHANTIER- N° DE DOSSIER CEE",
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
    columnName: "MOTIF",
    propertyName: "reasonArchived",
    id: 8,
    isUser: true,
    isAdmin: true,
  },
  {
    columnName: "ACTIONS",
    propertyName: "actionsSimulations",
    content: (row) => {
      return (
        <ActionsListSimulations currentPage={"archives"} quote_FK={row._id} />
      );
    },
    id: 9,
    isUser: true,
    isAdmin: true,
  },
];
