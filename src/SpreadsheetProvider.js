import React, { useState } from 'react';
import SpreadsheetContext from './SpreadsheetContext';

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
      value={{ data, setData, addRow, removeRow, updateCell }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};

export default SpreadsheetProvider;
