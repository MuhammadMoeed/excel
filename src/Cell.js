import React, { useState, useContext, useCallback } from 'react';
import SpreadsheetContext from './SpreadsheetContext';

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

export default Cell;
