
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface TableHeaderProps {
  column: Column;
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  column,
  sortKey,
  sortDirection,
  onSort
}) => {
  const renderSortIcon = () => {
    if (sortKey !== column.key) return null;
    return sortDirection === 'asc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />;
  };

  return (
    <TableHead 
      key={column.key}
      className={column.sortable ? 'cursor-pointer select-none' : ''}
      onClick={() => column.sortable && onSort(column.key)}
    >
      <div className="flex items-center space-x-1">
        <span>{column.header}</span>
        {column.sortable && renderSortIcon()}
      </div>
    </TableHead>
  );
};

export default React.memo(TableHeader);
