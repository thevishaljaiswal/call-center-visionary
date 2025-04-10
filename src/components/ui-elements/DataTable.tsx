import React, { useState, useCallback, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import refactored components
import TableFilters from './table/TableFilters';
import TablePagination from './table/TablePagination';
import TableHeader from './table/TableHeader';
import TableBody from './table/TableBody';

interface Column {
  key: string;
  header: string;
  cell?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  className?: string;
  isLoading?: boolean;
  pageSize?: number;
  filterPlaceholder?: string;
  actions?: (row: any, closeMenu: () => void) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  className = "",
  isLoading = false,
  pageSize = 5,
  filterPlaceholder = "Filter records...",
  actions
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [activeRow, setActiveRow] = useState<number | null>(null);

  // Handle sort logic
  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }, [sortKey, sortDirection]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(row => {
      if (!filter) return true;
      
      return Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(filter.toLowerCase())
      );
    });
  }, [data, filter]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (aValue === bValue) return 0;
      
      const compareResult = aValue > bValue ? 1 : -1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  // Handle dropdown menu
  const handleDropdownClick = useCallback((index: number) => {
    setActiveRow(prevActiveRow => prevActiveRow === index ? null : index);
  }, []);

  // Reset active row when closed
  const handleDropdownClose = useCallback(() => {
    setActiveRow(null);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <TableFilters 
        filter={filter} 
        onFilterChange={handleFilterChange} 
        filterPlaceholder={filterPlaceholder} 
      />

      <div className="rounded-lg border border-border overflow-hidden transition-all-medium">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeader
                    key={column.key}
                    column={column}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                ))}
                {actions && <th className="w-10"></th>}
              </TableRow>
            </TableHeader>
            
            <TableBody
              isLoading={isLoading}
              paginatedData={paginatedData}
              columns={columns}
              activeRow={activeRow}
              onRowAction={handleDropdownClick}
              onCloseMenu={handleDropdownClose}
              actions={actions}
            />
          </Table>
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        pageSize={pageSize}
        totalItems={sortedData.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default React.memo(DataTable);
