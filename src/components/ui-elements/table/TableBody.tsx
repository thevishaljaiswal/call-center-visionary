
import React from 'react';
import { TableBody as UITableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowComponent from './TableRow';

interface Column {
  key: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface TableBodyProps {
  isLoading: boolean;
  paginatedData: any[];
  columns: Column[];
  activeRow: number | null;
  onRowAction: (index: number) => void;
  onCloseMenu: () => void;
  actions?: (row: any, closeMenu: () => void) => React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({
  isLoading,
  paginatedData,
  columns,
  activeRow,
  onRowAction,
  onCloseMenu,
  actions
}) => {
  if (isLoading) {
    return (
      <UITableBody>
        <TableRow>
          <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin mb-2"></div>
              <p>Loading data...</p>
            </div>
          </TableCell>
        </TableRow>
      </UITableBody>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <UITableBody>
        <TableRow>
          <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10">
            <p className="text-muted-foreground">No records found</p>
          </TableCell>
        </TableRow>
      </UITableBody>
    );
  }

  return (
    <UITableBody>
      {paginatedData.map((row, rowIndex) => (
        <TableRowComponent
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          columns={columns}
          actions={actions}
          activeRow={activeRow}
          onRowAction={onRowAction}
          onCloseMenu={onCloseMenu}
        />
      ))}
    </UITableBody>
  );
};

export default React.memo(TableBody);
