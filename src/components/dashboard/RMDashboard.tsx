
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

  const handleFormStatusUpdate = (data: { status: string; notes?: string }) => {
    if (selectedCall) {
      const success = updateCallStatus(selectedCall, data);
      
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
        {/* KPI Section */}
        <KPISection />

        {/* Charts */}
        <ChartsSection />

        {/* Calls Table */}
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
