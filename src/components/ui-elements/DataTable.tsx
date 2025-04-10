
import React, { useState, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';

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
  actions?: (row: any) => React.ReactNode;
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

  // Sort icon
  const renderSortIcon = useCallback((key: string) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />;
  }, [sortKey, sortDirection]);

  // Handle dropdown menu
  const handleDropdownClick = useCallback((index: number) => {
    setActiveRow(prevActiveRow => prevActiveRow === index ? null : index);
  }, []);

  // Reset active row when closed
  const handleDropdownClose = useCallback(() => {
    setActiveRow(null);
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder={filterPlaceholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background"
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <SlidersHorizontal size={14} className="mr-2" />
          Filters
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden transition-all-medium">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={column.key}
                    className={column.sortable ? 'cursor-pointer select-none' : ''}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && renderSortIcon(column.key)}
                    </div>
                  </TableHead>
                ))}
                {actions && <TableHead className="w-10"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin mb-2"></div>
                      <p>Loading data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10">
                    <p className="text-muted-foreground">No records found</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/40 transition-colors">
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.key}`}>
                        {column.cell 
                          ? column.cell(row[column.key]) 
                          : row[column.key] || '—'}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right">
                        <DropdownMenu 
                          open={activeRow === rowIndex} 
                          onOpenChange={(open) => {
                            if (open) {
                              handleDropdownClick(rowIndex);
                            } else {
                              handleDropdownClose();
                            }
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onInteractOutside={handleDropdownClose}>
                            {actions(row)}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} records
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <span className="text-sm">{currentPage} / {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DataTable);
