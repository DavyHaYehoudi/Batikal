import React from "react";

const OptionsFilterBlock = ({ domain, isAdmin, dataFilter }) => {
  return (
    <>
      {
        /* *************************  ADMIN  ************************** */
        isAdmin
          ? dataFilter.map((filter, i) =>
              /* page des dossiers */
              domain === "simulations" &&
              filter.domain.includes("simulations") ? (
                <option
                  value={filter.id}
                  key={filter.id}
                  disabled={filter.disabled}
                >
                  {filter.header}
                </option>
              ) : (
                /* page des archives */
                domain === "archives" &&
                filter.domain.includes("archives") && (
                  <option
                    value={filter.id}
                    key={filter.id}
                    disabled={filter.disabled}
                  >
                    {filter.header}
                  </option>
                )
              )
            )
          : /* *************************  USER  ************************** */
          /* page des dossiers */
          domain === "simulations"
          ? dataFilter.map(
              (filter, i) =>
                filter.isUser &&
                filter.domain.includes("simulations") && (
                  <option
                    value={filter.id}
                    key={filter.id}
                    disabled={filter.disabled}
                  >
                    {filter.header}
                  </option>
                )
            )
          : /* page des archives */
            domain === "archives" &&
            dataFilter.map(
              (filter, i) =>
                filter.isUser &&
                filter.domain.includes("archives") && (
                  <option
                    value={filter.id}
                    key={filter.id}
                    disabled={filter.disabled}
                  >
                    {filter.domain.includes("archives") && filter.header}
                  </option>
                )
            )
      }
    </>
  );
};

export default OptionsFilterBlock;
