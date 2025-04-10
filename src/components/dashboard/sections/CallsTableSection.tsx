
import React, { useCallback, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTable from '../../ui-elements/DataTable';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CallData } from '@/hooks/useCallsData';

interface CallsTableSectionProps {
  callsData: CallData[];
  onViewDetails: (call: CallData) => void;
  onUpdateStatus: (call: CallData) => void;
}

const CallsTableSection: React.FC<CallsTableSectionProps> = ({
  callsData,
  onViewDetails,
  onUpdateStatus
}) => {
  // Columns for the table
  const columns = [
    {
      key: 'id',
      header: 'Call ID',
      sortable: true
    },
    {
      key: 'startTime',
      header: 'Start Time',
      sortable: true
    },
    {
      key: 'duration',
      header: 'Duration',
      sortable: true
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true
    },
    {
      key: 'issueType',
      header: 'Issue Type',
      sortable: true
    },
    {
      key: 'status',
      header: 'Status',
      cell: (value: string) => {
        let color;
        switch (value) {
          case 'Resolved':
            color = 'bg-green-100 text-green-800';
            break;
          case 'Pending':
            color = 'bg-yellow-100 text-yellow-800';
            break;
          case 'Escalated':
            color = 'bg-red-100 text-red-800';
            break;
          default:
            color = 'bg-gray-100 text-gray-800';
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {value}
          </span>
        );
      },
      sortable: true
    },
    {
      key: 'satisfaction',
      header: 'Satisfaction',
      cell: (value: number) => {
        return (
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        );
      },
      sortable: true
    }
  ];

  // Action handlers with useCallback to prevent unnecessary re-renders
  const handleViewDetails = useCallback((row: CallData) => {
    onViewDetails(row);
  }, [onViewDetails]);

  const handleUpdateStatus = useCallback((row: CallData) => {
    onUpdateStatus(row);
  }, [onUpdateStatus]);

  // Define action menu renderers with proper memoization
  const renderRecentActions = useCallback((row: CallData, closeMenu: () => void) => (
    <>
      <DropdownMenuItem onClick={() => { handleViewDetails(row); closeMenu(); }}>
        View Details
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => { handleUpdateStatus(row); closeMenu(); }}>
        Update Status
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => closeMenu()}>
        Call Back
      </DropdownMenuItem>
      <DropdownMenuItem className="text-destructive" onClick={() => closeMenu()}>
        Escalate
      </DropdownMenuItem>
    </>
  ), [handleViewDetails, handleUpdateStatus]);

  const renderResolvedActions = useCallback((row: CallData, closeMenu: () => void) => (
    <>
      <DropdownMenuItem onClick={() => { handleViewDetails(row); closeMenu(); }}>
        View Details
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => closeMenu()}>
        Reopen Case
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => closeMenu()}>
        Call Back
      </DropdownMenuItem>
    </>
  ), [handleViewDetails]);

  const renderPendingActions = useCallback((row: CallData, closeMenu: () => void) => (
    <>
      <DropdownMenuItem onClick={() => { handleViewDetails(row); closeMenu(); }}>
        View Details
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => { handleUpdateStatus(row); closeMenu(); }}>
        Mark as Resolved
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => closeMenu()}>
        Call Back
      </DropdownMenuItem>
      <DropdownMenuItem className="text-destructive" onClick={() => closeMenu()}>
        Escalate
      </DropdownMenuItem>
    </>
  ), [handleViewDetails, handleUpdateStatus]);

  // Filter data once to avoid recalculations
  const resolvedCalls = useMemo(() => 
    callsData.filter(call => call.status === 'Resolved'),
    [callsData]
  );
  
  const pendingCalls = useMemo(() => 
    callsData.filter(call => call.status === 'Pending'),
    [callsData]
  );

  return (
    <section>
      <Tabs defaultValue="recent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Call Details</h2>
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="recent" className="mt-0">
          <DataTable
            data={callsData}
            columns={columns}
            actions={renderRecentActions}
          />
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-0">
          <DataTable
            data={resolvedCalls}
            columns={columns}
            actions={renderResolvedActions}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <DataTable
            data={pendingCalls}
            columns={columns}
            actions={renderPendingActions}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default React.memo(CallsTableSection);
