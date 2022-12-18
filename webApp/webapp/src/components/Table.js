import React from "react";

const Table = ({
  columns,
  data,
  isAdmin,
  tableClass,
  theadClass,
  trStyle,
  thClass,
  thStyle,
  tdClass,
  tdClassDeleted,
  statusName,
}) => {
  const dataDisplay = (row, i) => {
    return (
      <tr key={i} style={trStyle}>
        {columns.map((column, i) => dataDisplay2(row, column, i))}
      </tr>
    );
  };

  const dataDisplay2 = (row, column, i) => {
    if (column.content) {
      return (
        <td
          key={column.propertyName}
          className={row.deletedByUser ? tdClassDeleted : tdClass}
        >
          {column.content(row)}
        </td>
      );
    }

    if (row[column.propertyName]) {
      let statusNumber = row.quoteStatus;
    
      return isAdmin
        ? column.isAdmin && (
            <td
              key={column.propertyName}
              className={row.deletedByUser ? tdClassDeleted : tdClass}
            >
              {row[column.propertyName] === row.quoteStatus
                ? statusName[statusNumber].name
                : row[column.propertyName]}
            </td>
          )
        : column.isUser && (
            <td
              key={column.propertyName}
              className={row.deletedByUser ? tdClassDeleted : tdClass}
            >
              {row[column.propertyName] === row.quoteStatus
                ? statusName[statusNumber].name
                : row[column.propertyName]}
            </td>
          );
    } else return <td key={i}></td>;
  };

  return (
    <table className={tableClass}>
      <thead className={theadClass}>
        <tr style={trStyle}>
          {columns.map((column, i) =>
            isAdmin
              ? column.isAdmin && (
                  <th
                    key={column.columnName}
                    className={thClass}
                    style={thStyle}
                  >
                    {column.columnName}
                  </th>
                )
              : column.isUser && (
                  <th
                    key={column.columnName}
                    className={thClass}
                    style={thStyle}
                  >
                    {column.columnName}
                  </th>
                )
          )}
        </tr>
      </thead>
      <tbody>{data && data.map((row, i) => dataDisplay(row, i))}</tbody>
    </table>
  );
};

Table.defaultProps = {
  tableClass: "table table-striped gs-9 table-hover responsive",
  theadClass: "fs-5 fw-boldest",
  thClass: "text-center border-bottom border-white align-items-center ",
  thStyle: { color: "rgb(255,158,94)",verticalAlign: "middle" },
  tdClassDeleted: "text-center text-danger fw-boldest",
  tdClass: "text-center text-white",
};

export default Table;
