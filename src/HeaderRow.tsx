import React, { useCallback, memo } from 'react';

import HeaderCell from './HeaderCell';
import { CalculatedColumn } from './types';
import { assertIsValidKeyGetter } from './utils';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, SR>,
  | 'rows'
  | 'onSelectedRowsChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'rowKeyGetter'
>;

export interface HeaderRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

function HeaderRow<R, SR>({
  columns,
  rows,
  rowKeyGetter,
  onSelectedRowsChange,
  allRowsSelected,
  onColumnResize,
  sortColumn,
  sortDirection,
  onSort
}: HeaderRowProps<R, SR>) {
  const handleAllRowsSelectionChange = useCallback((checked: boolean) => {
    if (!onSelectedRowsChange) return;

    assertIsValidKeyGetter(rowKeyGetter);

    const newSelectedRows = new Set<React.Key>();
    if (checked) {
      for (const row of rows) {
        newSelectedRows.add(rowKeyGetter(row));
      }
    }

    onSelectedRowsChange(newSelectedRows);
  }, [onSelectedRowsChange, rows, rowKeyGetter]);

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className="rdg-header-row"
    >
      {columns.map(column => {
        return (
          <HeaderCell<R, SR>
            key={column.key}
            column={column}
            onResize={onColumnResize}
            allRowsSelected={allRowsSelected}
            onAllRowsSelectionChange={handleAllRowsSelectionChange}
            onSort={onSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        );
      })}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR>(props: HeaderRowProps<R, SR>) => JSX.Element;
