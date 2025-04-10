
import React from 'react';
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from 'lucide-react';

interface TableFiltersProps {
  filter: string;
  onFilterChange: (value: string) => void;
  filterPlaceholder: string;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  filter,
  onFilterChange,
  filterPlaceholder
}) => {
  return (
    <div className="flex justify-between">
      <div className="relative">
        <input
          type="text"
          placeholder={filterPlaceholder}
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background"
        />
      </div>
      <Button variant="outline" size="sm" className="flex items-center">
        <SlidersHorizontal size={14} className="mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default React.memo(TableFilters);
