
import React, { useState } from 'react';
import { Phone, Clock, CheckSquare, UserSquare2, PhoneForwarded, PhoneOff, Timer } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import KPICard from '../ui-elements/KPICard';
import DataTable from '../ui-elements/DataTable';
import Chart from '../ui-elements/Chart';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CallDetailsModal from '../modals/CallDetailsModal';
import UpdateStatusForm from '../forms/UpdateStatusForm';
import { useToast } from '@/hooks/use-toast';

const RMDashboard: React.FC = () => {
  // State for modals and forms
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const { toast } = useToast();

  // Sample data for KPIs
  const kpiData = [
    {
      title: 'Total Calls Handled',
      value: '245',
      trend: 5.2,
      icon: <Phone size={20} />,
      tooltipText: 'Total number of calls handled in the current period'
    },
    {
      title: 'Average Handling Time',
      value: '4m 32s',
      trend: -2.8,
      icon: <Clock size={20} />,
      tooltipText: 'Average time spent handling each call'
    },
    {
      title: 'First Call Resolution',
      value: '78%',
      trend: 3.1,
      icon: <CheckSquare size={20} />,
      tooltipText: 'Percentage of issues resolved during the first call'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      trend: 0.5,
      icon: <UserSquare2 size={20} />,
      tooltipText: 'Average customer satisfaction rating'
    },
    {
      title: 'Number of Callbacks',
      value: '18',
      trend: -15.4,
      icon: <PhoneForwarded size={20} />,
      tooltipText: 'Number of callbacks made to customers'
    },
    {
      title: 'Call Abandonment Rate',
      value: '3.2%',
      trend: -0.8,
      icon: <PhoneOff size={20} />,
      tooltipText: 'Percentage of abandoned calls'
    },
    {
      title: 'Resolution Time',
      value: '24m 12s',
      trend: -4.3,
      icon: <Timer size={20} />,
      tooltipText: 'Average time to resolve customer issues'
    }
  ];

  // Sample data for calls table
  const [callsData, setCallsData] = useState([
    {
      id: '1001',
      startTime: '09:45 AM',
      duration: '5m 23s',
      customerName: 'John Smith',
      contact: '+1 (555) 123-4567',
      issueType: 'Billing Inquiry',
      status: 'Resolved',
      satisfaction: 5,
      notes: 'Customer had questions about recent charges. Explained the billing cycle and resolved their concerns.'
    },
    {
      id: '1002',
      startTime: '10:12 AM',
      duration: '3m 45s',
      customerName: 'Sarah Johnson',
      contact: '+1 (555) 987-6543',
      issueType: 'Technical Support',
      status: 'Pending',
      satisfaction: 4,
      notes: 'Customer experiencing intermittent connection issues. Provided basic troubleshooting steps.'
    },
    {
      id: '1003',
      startTime: '11:05 AM',
      duration: '8m 12s',
      customerName: 'Michael Brown',
      contact: '+1 (555) 456-7890',
      issueType: 'Product Information',
      status: 'Resolved',
      satisfaction: 5,
      notes: 'Customer inquired about product features. Provided detailed information and answered all questions.'
    },
    {
      id: '1004',
      startTime: '12:30 PM',
      duration: '4m 18s',
      customerName: 'Emily Davis',
      contact: '+1 (555) 789-0123',
      issueType: 'Account Access',
      status: 'Escalated',
      satisfaction: 3,
      notes: 'Customer unable to access their account. Basic troubleshooting failed. Escalated to technical team.'
    },
    {
      id: '1005',
      startTime: '01:15 PM',
      duration: '6m 57s',
      customerName: 'David Wilson',
      contact: '+1 (555) 321-6547',
      issueType: 'Billing Inquiry',
      status: 'Resolved',
      satisfaction: 4,
      notes: 'Customer had questions about a specific charge. Explained the service and resolved the inquiry.'
    },
    {
      id: '1006',
      startTime: '02:05 PM',
      duration: '2m 34s',
      customerName: 'Jennifer Martinez',
      contact: '+1 (555) 654-7891',
      issueType: 'Technical Support',
      status: 'Pending',
      satisfaction: 4,
      notes: 'Customer reporting slow performance. Provided initial guidance and will follow up tomorrow.'
    }
  ]);

  // Handler functions
  const handleViewDetails = (call: any) => {
    setSelectedCall(call);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = (call: any) => {
    setSelectedCall(call);
    setIsUpdateStatusOpen(true);
  };

  const handleStatusUpdate = (data: any) => {
    setCallsData(callsData.map(call => 
      call.id === selectedCall.id 
        ? { ...call, status: data.status, notes: data.notes ? `${call.notes}\n\nUpdate: ${data.notes}` : call.notes } 
        : call
    ));
    
    toast({
      title: "Status updated",
      description: `Call #${selectedCall.id} status has been updated to ${data.status}`,
    });
  };

  // Call volume chart data
  const callVolumeData = [
    { hour: '8 AM', calls: 15 },
    { hour: '9 AM', calls: 28 },
    { hour: '10 AM', calls: 42 },
    { hour: '11 AM', calls: 35 },
    { hour: '12 PM', calls: 22 },
    { hour: '1 PM', calls: 30 },
    { hour: '2 PM', calls: 35 },
    { hour: '3 PM', calls: 40 },
    { hour: '4 PM', calls: 38 },
    { hour: '5 PM', calls: 25 }
  ];

  // Issue distribution chart data
  const issueDistributionData = [
    { issue: 'Billing Inquiry', count: 45 },
    { issue: 'Technical Support', count: 35 },
    { issue: 'Account Access', count: 18 },
    { issue: 'Product Information', count: 22 },
    { issue: 'Complaints', count: 15 }
  ];

  // Customer satisfaction trend data
  const satisfactionTrendData = [
    { day: 'Mon', score: 4.5 },
    { day: 'Tue', score: 4.6 },
    { day: 'Wed', score: 4.8 },
    { day: 'Thu', score: 4.5 },
    { day: 'Fri', score: 4.7 },
    { day: 'Sat', score: 4.8 },
    { day: 'Sun', score: 4.9 }
  ];

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

  return (
    <DashboardLayout title="Relationship Manager Dashboard">
      <div className="space-y-6">
        {/* KPI Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                icon={kpi.icon}
                tooltipText={kpi.tooltipText}
              />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Chart
            title="Today's Call Volume"
            subtitle="Hourly distribution"
            data={callVolumeData}
            type="bar"
            xKey="hour"
            yKeys={[{ key: 'calls', name: 'Calls', color: '#3b82f6' }]}
            height={250}
          />
          
          <Chart
            title="Issue Distribution"
            subtitle="By category"
            data={issueDistributionData}
            type="pie"
            xKey="issue"
            yKeys={[
              { key: 'count', name: 'Count', color: '#3b82f6' },
              { key: 'count', name: 'Count', color: '#8b5cf6' },
              { key: 'count', name: 'Count', color: '#10b981' },
              { key: 'count', name: 'Count', color: '#f59e0b' },
              { key: 'count', name: 'Count', color: '#ef4444' }
            ]}
            height={250}
          />
          
          <Chart
            title="Customer Satisfaction Trend"
            subtitle="Last 7 days"
            data={satisfactionTrendData}
            type="line"
            xKey="day"
            yKeys={[{ key: 'score', name: 'CSAT Score', color: '#10b981' }]}
            height={250}
          />
        </section>

        {/* Calls Table */}
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
                actions={(row) => (
                  <>
                    <DropdownMenuItem onClick={() => handleViewDetails(row)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateStatus(row)}>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Call Back</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Escalate</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="resolved" className="mt-0">
              <DataTable
                data={callsData.filter(call => call.status === 'Resolved')}
                columns={columns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem onClick={() => handleViewDetails(row)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Reopen Case</DropdownMenuItem>
                    <DropdownMenuItem>Call Back</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <DataTable
                data={callsData.filter(call => call.status === 'Pending')}
                columns={columns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem onClick={() => handleViewDetails(row)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateStatus(row)}>Mark as Resolved</DropdownMenuItem>
                    <DropdownMenuItem>Call Back</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Escalate</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
          </Tabs>
        </section>
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
        onUpdateStatus={handleStatusUpdate} 
      />
    </DashboardLayout>
  );
};

export default RMDashboard;
