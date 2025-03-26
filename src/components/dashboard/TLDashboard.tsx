
import React from 'react';
import { Users, Clock, Activity, AlertTriangle, UserSquare2, CheckSquare, BarChart } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import KPICard from '../ui-elements/KPICard';
import DataTable from '../ui-elements/DataTable';
import Chart from '../ui-elements/Chart';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TLDashboard: React.FC = () => {
  // Sample data for KPIs
  const kpiData = [
    {
      title: 'Total Calls per Team',
      value: '1,245',
      trend: 8.2,
      icon: <Users size={20} />,
      tooltipText: 'Total number of calls handled by the team in the current period'
    },
    {
      title: 'Service Level',
      value: '92%',
      trend: 3.5,
      icon: <Activity size={20} />,
      tooltipText: 'Percentage of calls answered within target time (30 seconds)'
    },
    {
      title: 'Average Hold Time',
      value: '1m 22s',
      trend: -5.8,
      icon: <Clock size={20} />,
      tooltipText: 'Average time customers are on hold'
    },
    {
      title: 'Escalation Rate',
      value: '4.7%',
      trend: -2.1,
      icon: <AlertTriangle size={20} />,
      tooltipText: 'Percentage of calls that needed escalation'
    },
    {
      title: 'Agent Utilization',
      value: '85%',
      trend: 1.3,
      icon: <BarChart size={20} />,
      tooltipText: 'Percentage of time agents are actively handling calls'
    },
    {
      title: 'CSAT per Agent',
      value: '4.5/5',
      trend: 0.2,
      icon: <UserSquare2 size={20} />,
      tooltipText: 'Average customer satisfaction rating across all agents'
    },
    {
      title: 'First Call Resolution',
      value: '76%',
      trend: 2.8,
      icon: <CheckSquare size={20} />,
      tooltipText: 'Percentage of issues resolved during the first call'
    }
  ];

  // Sample data for agent performance
  const agentData = [
    {
      id: 'AG001',
      name: 'Jane Cooper',
      calls: 48,
      avgHandlingTime: '4m 12s',
      serviceLevel: '95%',
      fcr: '82%',
      csat: 4.8,
      status: 'Active'
    },
    {
      id: 'AG002',
      name: 'Robert Fox',
      calls: 42,
      avgHandlingTime: '5m 03s',
      serviceLevel: '91%',
      fcr: '78%',
      csat: 4.6,
      status: 'Active'
    },
    {
      id: 'AG003',
      name: 'Esther Howard',
      calls: 39,
      avgHandlingTime: '3m 54s',
      serviceLevel: '94%',
      fcr: '85%',
      csat: 4.9,
      status: 'Break'
    },
    {
      id: 'AG004',
      name: 'Cameron Williamson',
      calls: 45,
      avgHandlingTime: '4m 32s',
      serviceLevel: '89%',
      fcr: '75%',
      csat: 4.3,
      status: 'Active'
    },
    {
      id: 'AG005',
      name: 'Brooklyn Simmons',
      calls: 37,
      avgHandlingTime: '5m 21s',
      serviceLevel: '88%',
      fcr: '72%',
      csat: 4.2,
      status: 'Away'
    },
    {
      id: 'AG006',
      name: 'Leslie Alexander',
      calls: 44,
      avgHandlingTime: '4m 08s',
      serviceLevel: '93%',
      fcr: '80%',
      csat: 4.7,
      status: 'Active'
    }
  ];

  // Service level chart data
  const serviceLevelData = [
    { hour: '8 AM', actual: 95, target: 90 },
    { hour: '9 AM', actual: 92, target: 90 },
    { hour: '10 AM', actual: 88, target: 90 },
    { hour: '11 AM', actual: 91, target: 90 },
    { hour: '12 PM', actual: 87, target: 90 },
    { hour: '1 PM', actual: 90, target: 90 },
    { hour: '2 PM', actual: 93, target: 90 },
    { hour: '3 PM', actual: 96, target: 90 },
    { hour: '4 PM', actual: 94, target: 90 },
    { hour: '5 PM', actual: 92, target: 90 }
  ];

  // Agent performance comparison
  const agentComparisonData = [
    { agent: 'Jane', aht: 4.2, csat: 4.8, fcr: 82 },
    { agent: 'Robert', aht: 5.0, csat: 4.6, fcr: 78 },
    { agent: 'Esther', aht: 3.9, csat: 4.9, fcr: 85 },
    { agent: 'Cameron', aht: 4.5, csat: 4.3, fcr: 75 },
    { agent: 'Brooklyn', aht: 5.3, csat: 4.2, fcr: 72 },
    { agent: 'Leslie', aht: 4.1, csat: 4.7, fcr: 80 }
  ];

  // Call queue data
  const queueTrendData = [
    { time: '8 AM', waiting: 3, abandoned: 1 },
    { time: '9 AM', waiting: 5, abandoned: 2 },
    { time: '10 AM', waiting: 8, abandoned: 3 },
    { time: '11 AM', waiting: 6, abandoned: 2 },
    { time: '12 PM', waiting: 4, abandoned: 1 },
    { time: '1 PM', waiting: 5, abandoned: 1 },
    { time: '2 PM', waiting: 7, abandoned: 2 },
    { time: '3 PM', waiting: 4, abandoned: 1 },
    { time: '4 PM', waiting: 3, abandoned: 0 },
    { time: '5 PM', waiting: 2, abandoned: 0 }
  ];

  // Escalation reasons
  const escalationData = [
    { reason: 'Technical Complexity', count: 35 },
    { reason: 'Policy Exception', count: 22 },
    { reason: 'Customer Dissatisfaction', count: 18 },
    { reason: 'Billing Dispute', count: 15 },
    { reason: 'Other', count: 10 }
  ];

  // Columns for the table
  const columns = [
    {
      key: 'name',
      header: 'Agent Name',
      sortable: true
    },
    {
      key: 'calls',
      header: 'Calls',
      sortable: true
    },
    {
      key: 'avgHandlingTime',
      header: 'Avg. Handling Time',
      sortable: true
    },
    {
      key: 'serviceLevel',
      header: 'Service Level',
      sortable: true
    },
    {
      key: 'fcr',
      header: 'FCR',
      sortable: true
    },
    {
      key: 'csat',
      header: 'CSAT',
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
    },
    {
      key: 'status',
      header: 'Status',
      cell: (value: string) => {
        let color;
        switch (value) {
          case 'Active':
            color = 'bg-green-100 text-green-800';
            break;
          case 'Break':
            color = 'bg-blue-100 text-blue-800';
            break;
          case 'Away':
            color = 'bg-yellow-100 text-yellow-800';
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
    }
  ];

  return (
    <DashboardLayout title="Team Lead Dashboard">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Chart
            title="Service Level Trend"
            subtitle="Today's hourly performance"
            data={serviceLevelData}
            type="line"
            xKey="hour"
            yKeys={[
              { key: 'actual', name: 'Actual SL', color: '#3b82f6' },
              { key: 'target', name: 'Target SL', color: '#d1d5db' }
            ]}
            height={300}
          />
          
          <Chart
            title="Call Queue Trend"
            subtitle="Calls waiting and abandoned"
            data={queueTrendData}
            type="area"
            xKey="time"
            yKeys={[
              { key: 'waiting', name: 'Waiting Calls', color: '#8b5cf6' },
              { key: 'abandoned', name: 'Abandoned Calls', color: '#ef4444' }
            ]}
            height={300}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Chart
              title="Agent Performance Comparison"
              subtitle="AHT, CSAT and FCR by agent"
              data={agentComparisonData}
              type="bar"
              xKey="agent"
              yKeys={[
                { key: 'aht', name: 'Avg. Handling Time (min)', color: '#3b82f6' },
                { key: 'csat', name: 'CSAT Score', color: '#10b981' },
                { key: 'fcr', name: 'FCR %', color: '#8b5cf6' }
              ]}
              height={300}
            />
          </div>
          
          <div>
            <Chart
              title="Escalation Reasons"
              subtitle="Distribution by category"
              data={escalationData}
              type="pie"
              xKey="reason"
              yKeys={[
                { key: 'count', name: 'Count', color: '#3b82f6' },
                { key: 'count', name: 'Count', color: '#8b5cf6' },
                { key: 'count', name: 'Count', color: '#10b981' },
                { key: 'count', name: 'Count', color: '#f59e0b' },
                { key: 'count', name: 'Count', color: '#ef4444' }
              ]}
              height={300}
            />
          </div>
        </section>

        {/* Agent Table */}
        <section>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Agent Performance</h2>
              <TabsList>
                <TabsTrigger value="all">All Agents</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <DataTable
                data={agentData}
                columns={columns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Contact Agent</DropdownMenuItem>
                    <DropdownMenuItem>View Call History</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Training</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <DataTable
                data={agentData.filter(agent => agent.status === 'Active')}
                columns={columns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Contact Agent</DropdownMenuItem>
                    <DropdownMenuItem>View Call History</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Training</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="inactive" className="mt-0">
              <DataTable
                data={agentData.filter(agent => agent.status !== 'Active')}
                columns={columns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Contact Agent</DropdownMenuItem>
                    <DropdownMenuItem>View Call History</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Training</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default TLDashboard;
