export const subDropdown = [
  { id: 0, name: "Abandon client" },
  { id: 1, name: "Non éligible" },
  { id: 2, name: "Dossier clôturé" },
];

export const actionsSimulations = [
  {
    header: "Consulter",
    id: "0",
    subDropdowns: null,
    isAdmin: true,
    isUser: true,
  },
  {
    header: "Supprimer",
    id: "1",
    subDropdowns: null,
    isAdmin: true,
    isUser: true,
  },
  {
    header: "Archiver",
    id: "2",
    subDropdowns: [
      subDropdown[0].name,
      subDropdown[1].name,
      subDropdown[2].name,
    ],
    isAdmin: true,
    isUser: true,
  },
  {
    header: "Réactiver le dossier",
    id: "4",
    subDropdowns: null,
    isAdmin: true,
    isUser: false,
  },
  {
    header: "Générer le devis",
    id: "5",
    subDropdowns: null,
    isAdmin: true,
    isUser: true,
  },
];
