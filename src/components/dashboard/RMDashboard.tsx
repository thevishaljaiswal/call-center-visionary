
import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import CallDetailsModal from '../modals/CallDetailsModal';
import UpdateStatusForm from '../forms/UpdateStatusForm';
import { useToast } from '@/hooks/use-toast';
import { useCallsData, CallData } from '@/hooks/useCallsData';

// Import refactored sections
import KPISection from './sections/KPISection';
import ChartsSection from './sections/ChartsSection';
import CallsTableSection from './sections/CallsTableSection';
import TodoSection from './sections/TodoSection';

const RMDashboard: React.FC = () => {
  // State for modals and forms
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const { toast } = useToast();
  const { callsData, handleStatusUpdate: updateCallStatus } = useCallsData();

  // Handler functions
  const handleViewDetails = (call: CallData) => {
    setSelectedCall(call);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = (call: CallData) => {
    setSelectedCall(call);
    setIsUpdateStatusOpen(true);
  };

  const handleFormStatusUpdate = (data: { status?: "Resolved" | "Pending" | "Escalated"; notes?: string }) => {
    if (selectedCall && data.status) {
      const success = updateCallStatus(selectedCall, { status: data.status, notes: data.notes });
      
      if (success) {
        toast({
          title: "Status updated",
          description: `Call #${selectedCall.id} status has been updated to ${data.status}`,
        });
      }
    }
  };

  return (
    <DashboardLayout title="Relationship Manager Dashboard">
      <div className="space-y-6">
        {/* Top Section with KPIs */}
        <KPISection />

        {/* Middle Section with Charts and To-Do List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ChartsSection />
          </div>
          
          {/* Todo Section - Moved to the right column */}
          <div>
            <TodoSection limit={5} />
          </div>
        </div>
        
        {/* Bottom Section with Calls Table */}
        <CallsTableSection 
          callsData={callsData}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
      
      {/* Modals */}
      <CallDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        callData={selectedCall} 
      />
      
      <UpdateStatusForm 
        isOpen={isUpdateStatusOpen} 
        onClose={() => setIsUpdateStatusOpen(false)} 
        callData={selectedCall} 
        onUpdateStatus={handleFormStatusUpdate} 
      />
    </DashboardLayout>
  );
};

export default RMDashboard;
