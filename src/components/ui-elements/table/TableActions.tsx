
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';

interface TableActionsProps {
  row: any;
  rowIndex: number;
  activeRow: number | null;
  onRowAction: (index: number) => void;
  onCloseMenu: () => void;
  renderActions: (row: any, closeMenu: () => void) => React.ReactNode;
}

const TableActions: React.FC<TableActionsProps> = ({
  row,
  rowIndex,
  activeRow,
  onRowAction,
  onCloseMenu,
  renderActions
}) => {
  return (
    <DropdownMenu 
      open={activeRow === rowIndex} 
      onOpenChange={(open) => {
        if (open) {
          onRowAction(rowIndex);
        } else {
          onCloseMenu();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        onInteractOutside={onCloseMenu}
        className="bg-background border-border"
      >
        {renderActions(row, onCloseMenu)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(TableActions);
