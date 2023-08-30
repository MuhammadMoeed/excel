import React from 'react';
import SpreadsheetProvider from './SpreadsheetProvider';
import Spreadsheet from './Spreadsheet';

const App = () => {
  return (
    <SpreadsheetProvider>
      <Spreadsheet />
    </SpreadsheetProvider>
  );
};

export default App;
