import React, { useState, useContext, useMemo, useCallback } from 'react';

const SpreadsheetContext = React.createContext();

const SpreadsheetProvider = ({ children }) => {
  const [data, setData] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const addRow = (numRows = 1) => {
    setData((prevData) => [
      ...prevData,
      ...Array.from({ length: numRows }, () => ['', '', '', '', '']),
    ]);
  };

  const removeRow = () => {
    setData((prevData) => prevData.slice(0, -1));
  };

  const updateCell = (rowIndex, colIndex, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  };

  return (
    <SpreadsheetContext.Provider
      value={{ data, addRow, removeRow, updateCell }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};

const Cell = ({ rowIndex, colIndex }) => {
  const { data, updateCell } = useContext(SpreadsheetContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(
    (e) => {
      updateCell(rowIndex, colIndex, e.target.value);
      setIsEditing(false);
    },
    [rowIndex, colIndex, updateCell]
  );

  return (
    <td
      className="py-4 px-6 border border-grey-light"
      onDoubleClick={handleDoubleClick}
    >
      {colIndex === 0 ? (
        rowIndex + 1
      ) : isEditing ? (
        <input
          type="text"
          className="border rounded w-full py-2 px-3"
          defaultValue={data[rowIndex][colIndex]}
          onBlur={handleBlur}
        />
      ) : (
        data[rowIndex][colIndex]
      )}
    </td>
  );
};

const Row = ({ rowIndex }) => {
  const columns = useMemo(() => [0, 1, 2, 3, 4], []);

  return (
    <tr className="hover:bg-grey-lighter">
      {columns.map((colIndex) => (
        <Cell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} />
      ))}
    </tr>
  );
};

const Spreadsheet = () => {
  const { data, addRow, removeRow } = useContext(SpreadsheetContext);

  const [numRowsToAdd, setNumRowsToAdd] = useState(1);

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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={removeRow}
        >
          Remove row
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <SpreadsheetProvider>
      <Spreadsheet />
    </SpreadsheetProvider>
  );
};
export default App;
