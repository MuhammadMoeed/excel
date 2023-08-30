import React, { useState, useContext } from 'react';
import SpreadsheetContext from './SpreadsheetContext';
import Row from './Row';

const Spreadsheet = () => {
  const { data, addRow, removeRow, setData } = useContext(SpreadsheetContext);
  const [numRowsToAdd, setNumRowsToAdd] = useState(1);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/data', { method: 'GET' });
    const data = await response.json();
    setData(data);
  };

  const saveData = async () => {
    await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setData([]);
  };

  return (
    <div className="container mx-auto my-5 p-5 bg-white rounded-lg shadow-md">
      <table className="w-full text-left border-collapse border">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border border-grey-light">
              S.No
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border border-grey-light">
              Input
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border border-grey-light">
              Logic
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border border-grey-light">
              Formula
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border border-grey-light">
              RGB Color
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((_, rowIndex) => (
            <Row key={rowIndex} rowIndex={rowIndex} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-start mb-4">
        <input
          type="number"
          min="1"
          className="border rounded py-2 px-3 mr-2"
          value={numRowsToAdd}
          onChange={(e) => setNumRowsToAdd(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => addRow(numRowsToAdd)}
        >
          Add row(s)
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={removeRow}
        >
          Remove row
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={fetchData}
        >
          Load data
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={saveData}
        >
          Save data
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;
