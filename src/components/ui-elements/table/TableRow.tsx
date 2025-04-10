
import React from 'react';
import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import TableActions from './TableActions';

interface Column {
  key: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface TableRowProps {
  row: any;
  rowIndex: number;
  columns: Column[];
  actions?: (row: any, closeMenu: () => void) => React.ReactNode;
  activeRow: number | null;
  onRowAction: (index: number) => void;
  onCloseMenu: () => void;
}

const TableRowComponent: React.FC<TableRowProps> = ({
  row,
  rowIndex,
  columns,
  actions,
  activeRow,
  onRowAction,
  onCloseMenu
}) => {
  return (
    <UITableRow className="hover:bg-muted/40 transition-colors">
      {columns.map((column) => (
        <TableCell key={`${rowIndex}-${column.key}`}>
          {column.cell 
            ? column.cell(row[column.key]) 
            : row[column.key] || '—'}
        </TableCell>
      ))}
      {actions && (
        <TableCell className="text-right">
          <TableActions
            row={row}
            rowIndex={rowIndex}
            activeRow={activeRow}
            onRowAction={onRowAction}
            onCloseMenu={onCloseMenu}
            renderActions={actions}
          />
        </TableCell>
      )}
    </UITableRow>
  );
};

export default React.memo(TableRowComponent);
