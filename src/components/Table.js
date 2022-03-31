import React from "react";
import millify from "millify";
import "./Table.css";

const Table = ({ data }) => {
  const sortData = data.sort((a, b) => b.cases - a.cases);
  return (
    <div className="table-list shadow p-5 rounded-md">
      <h2 className="font-bold text-2xl mb-2">Cases by Country</h2>
      {sortData.map((el, index) => (
        <tr key={index}>
          <td>{el.country}</td>
          <td>
            <strong>{el.cases.toLocaleString()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
