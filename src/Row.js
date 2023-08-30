import React, { useMemo } from 'react';
import Cell from './Cell';

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

export default Row;
