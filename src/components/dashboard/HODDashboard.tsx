
import React from 'react';
import { BarChart3, TrendingUp, UserSquare2, Clock, HeartPulse, BadgeDollarSign, CheckSquare } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import KPICard from '../ui-elements/KPICard';
import DataTable from '../ui-elements/DataTable';
import Chart from '../ui-elements/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const HODDashboard: React.FC = () => {
  // Sample data for KPIs
  const kpiData = [
    {
      title: 'Overall Call Center Performance',
      value: '94%',
      trend: 2.8,
      icon: <BarChart3 size={20} />,
      tooltipText: 'Overall performance against SLA targets'
    },
    {
      title: 'Customer Retention Rate',
      value: '97.5%',
      trend: 0.5,
      icon: <HeartPulse size={20} />,
      tooltipText: 'Percentage of customers retained during the period'
    },
    {
      title: 'Net Promoter Score',
      value: '68',
      trend: 5.2,
      icon: <TrendingUp size={20} />,
      tooltipText: 'Net Promoter Score (NPS) indicating customer loyalty'
    },
    {
      title: 'Revenue Impact',
      value: '$245K',
      trend: 8.7,
      icon: <BadgeDollarSign size={20} />,
      tooltipText: 'Estimated revenue impact from call center operations'
    },
    {
      title: 'Complaint Resolution Rate',
      value: '92%',
      trend: 3.1,
      icon: <CheckSquare size={20} />,
      tooltipText: 'Percentage of complaints successfully resolved'
    },
    {
      title: 'Average Response Time',
      value: '42s',
      trend: -15.4,
      icon: <Clock size={20} />,
      tooltipText: 'Average time to respond to customer inquiries'
    },
    {
      title: 'Operational Efficiency',
      value: '86%',
      trend: 1.3,
      icon: <UserSquare2 size={20} />,
      tooltipText: 'Overall operational efficiency rating'
    }
  ];

  // Monthly trend data
  const monthlyTrendData = [
    { month: 'Jan', calls: 12500, sla: 92, nps: 65 },
    { month: 'Feb', calls: 13200, sla: 94, nps: 66 },
    { month: 'Mar', calls: 14100, sla: 91, nps: 64 },
    { month: 'Apr', calls: 13800, sla: 93, nps: 67 },
    { month: 'May', calls: 14500, sla: 95, nps: 68 },
    { month: 'Jun', calls: 15200, sla: 94, nps: 70 }
  ];

  // Team performance data
  const teamPerformanceData = [
    { team: 'Team A', aht: 245, sl: 95, csat: 4.7, fcr: 82 },
    { team: 'Team B', aht: 263, sl: 92, csat: 4.5, fcr: 78 },
    { team: 'Team C', aht: 228, sl: 96, csat: 4.8, fcr: 85 },
    { team: 'Team D', aht: 255, sl: 90, csat: 4.4, fcr: 76 }
  ];

  // Regional performance data
  const regionalData = [
    { region: 'North', calls: 5240, revenue: 125000, resolution: 94 },
    { region: 'South', calls: 4820, revenue: 118000, resolution: 92 },
    { region: 'East', calls: 5650, revenue: 142000, resolution: 95 },
    { region: 'West', calls: 4980, revenue: 122000, resolution: 93 }
  ];

  // Campaign performance data
  const campaignData = [
    { campaign: 'Summer Sale', calls: 2450, conversion: 18.5, revenue: 92000 },
    { campaign: 'Membership Drive', calls: 1850, conversion: 22.3, revenue: 78000 },
    { campaign: 'Product Launch', calls: 3120, conversion: 15.8, revenue: 104000 },
    { campaign: 'Customer Win-back', calls: 1680, conversion: 12.4, revenue: 45000 }
  ];

  // Call distribution by day and time
  const callDistributionData = [
    { day: 'Monday', morning: 850, afternoon: 920, evening: 750 },
    { day: 'Tuesday', morning: 920, afternoon: 890, evening: 780 },
    { day: 'Wednesday', morning: 880, afternoon: 940, evening: 760 },
    { day: 'Thursday', morning: 910, afternoon: 950, evening: 790 },
    { day: 'Friday', morning: 980, afternoon: 1050, evening: 820 },
    { day: 'Saturday', morning: 720, afternoon: 680, evening: 590 },
    { day: 'Sunday', morning: 580, afternoon: 520, evening: 480 }
  ];

  // Customer feedback trend
  const feedbackTrendData = [
    { month: 'Jan', positive: 78, neutral: 15, negative: 7 },
    { month: 'Feb', positive: 80, neutral: 14, negative: 6 },
    { month: 'Mar', positive: 75, neutral: 18, negative: 7 },
    { month: 'Apr', positive: 82, neutral: 12, negative: 6 },
    { month: 'May', positive: 85, neutral: 10, negative: 5 },
    { month: 'Jun', positive: 87, neutral: 9, negative: 4 }
  ];

  // Team performance columns
  const teamColumns = [
    {
      key: 'team',
      header: 'Team Name',
      sortable: true
    },
    {
      key: 'calls',
      header: 'Total Calls',
      sortable: true
    },
    {
      key: 'serviceLevel',
      header: 'Service Level',
      sortable: true
    },
    {
      key: 'aht',
      header: 'AHT (sec)',
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
      key: 'fcr',
      header: 'FCR %',
      sortable: true
    },
    {
      key: 'utilization',
      header: 'Utilization',
      sortable: true
    }
  ];

  // Sample team data
  const teamData = [
    {
      team: 'Customer Service',
      calls: 4850,
      serviceLevel: '95%',
      aht: 245,
      csat: 4.7,
      fcr: '82%',
      utilization: '88%'
    },
    {
      team: 'Technical Support',
      calls: 3720,
      serviceLevel: '92%',
      aht: 382,
      csat: 4.5,
      fcr: '78%',
      utilization: '85%'
    },
    {
      team: 'Sales & Retention',
      calls: 2980,
      serviceLevel: '94%',
      aht: 263,
      csat: 4.6,
      fcr: '75%',
      utilization: '84%'
    },
    {
      team: 'Billing Support',
      calls: 2540,
      serviceLevel: '91%',
      aht: 274,
      csat: 4.4,
      fcr: '80%',
      utilization: '86%'
    }
  ];

  return (
    <DashboardLayout title="Head of Department Dashboard">
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

        {/* Main Performance Charts */}
        <section className="grid grid-cols-1 gap-4">
          <Chart
            title="Department Performance Trends"
            subtitle="6-month rolling view"
            data={monthlyTrendData}
            type="line"
            xKey="month"
            yKeys={[
              { key: 'sla', name: 'Service Level %', color: '#3b82f6' },
              { key: 'nps', name: 'NPS Score', color: '#10b981' }
            ]}
            height={300}
          />
        </section>
        
        {/* Team & Regional Comparison */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Chart
            title="Team Performance Comparison"
            subtitle="Key metrics by team"
            data={teamPerformanceData}
            type="bar"
            xKey="team"
            yKeys={[
              { key: 'sl', name: 'Service Level %', color: '#3b82f6' },
              { key: 'fcr', name: 'FCR %', color: '#8b5cf6' }
            ]}
            height={300}
          />
          
          <Chart
            title="Regional Performance"
            subtitle="Calls and resolution rates by region"
            data={regionalData}
            type="bar"
            xKey="region"
            yKeys={[
              { key: 'calls', name: 'Total Calls', color: '#3b82f6' },
              { key: 'resolution', name: 'Resolution %', color: '#10b981' }
            ]}
            height={300}
          />
        </section>

        {/* Call Distribution & Customer Feedback */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Chart
            title="Call Distribution by Day"
            subtitle="Weekly pattern by time of day"
            data={callDistributionData}
            type="area"
            xKey="day"
            yKeys={[
              { key: 'morning', name: 'Morning (8am-12pm)', color: '#f59e0b' },
              { key: 'afternoon', name: 'Afternoon (12pm-5pm)', color: '#3b82f6' },
              { key: 'evening', name: 'Evening (5pm-8pm)', color: '#8b5cf6' }
            ]}
            height={300}
          />
          
          <Chart
            title="Customer Feedback Trend"
            subtitle="6-month view of sentiment distribution"
            data={feedbackTrendData}
            type="area"
            xKey="month"
            yKeys={[
              { key: 'positive', name: 'Positive %', color: '#10b981' },
              { key: 'neutral', name: 'Neutral %', color: '#f59e0b' },
              { key: 'negative', name: 'Negative %', color: '#ef4444' }
            ]}
            height={300}
          />
        </section>

        {/* Team Performance Table */}
        <section>
          <Tabs defaultValue="teams">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Department Analysis</h2>
              <TabsList>
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="teams" className="mt-0">
              <DataTable
                data={teamData}
                columns={teamColumns}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Team Members</DropdownMenuItem>
                    <DropdownMenuItem>View Historical Data</DropdownMenuItem>
                    <DropdownMenuItem>Export Report</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="regions" className="mt-0">
              <DataTable
                data={regionalData.map(r => ({
                  region: r.region,
                  calls: r.calls,
                  revenue: `$${(r.revenue / 1000).toFixed(1)}K`,
                  avgCallValue: `$${(r.revenue / r.calls).toFixed(2)}`,
                  resolutionRate: `${r.resolution}%`,
                  growth: `${(Math.random() * 10 - 3).toFixed(1)}%`
                }))}
                columns={[
                  { key: 'region', header: 'Region', sortable: true },
                  { key: 'calls', header: 'Total Calls', sortable: true },
                  { key: 'revenue', header: 'Revenue', sortable: true },
                  { key: 'avgCallValue', header: 'Avg. Call Value', sortable: true },
                  { key: 'resolutionRate', header: 'Resolution Rate', sortable: true },
                  { key: 'growth', header: 'YoY Growth', sortable: true }
                ]}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Regional Teams</DropdownMenuItem>
                    <DropdownMenuItem>Export Report</DropdownMenuItem>
                  </>
                )}
              />
            </TabsContent>
            
            <TabsContent value="campaigns" className="mt-0">
              <DataTable
                data={campaignData.map(c => ({
                  campaign: c.campaign,
                  calls: c.calls,
                  conversion: `${c.conversion}%`,
                  revenue: `$${(c.revenue / 1000).toFixed(1)}K`,
                  roi: `${((c.revenue / (c.calls * 3.5)) * 100).toFixed(1)}%`,
                  status: Math.random() > 0.5 ? 'Active' : 'Completed'
                }))}
                columns={[
                  { key: 'campaign', header: 'Campaign', sortable: true },
                  { key: 'calls', header: 'Total Calls', sortable: true },
                  { key: 'conversion', header: 'Conversion Rate', sortable: true },
                  { key: 'revenue', header: 'Revenue', sortable: true },
                  { key: 'roi', header: 'ROI', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Status',
                    cell: (value: string) => (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {value}
                      </span>
                    ),
                    sortable: true 
                  }
                ]}
                actions={(row) => (
                  <>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Call Metrics</DropdownMenuItem>
                    <DropdownMenuItem>Export Report</DropdownMenuItem>
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

export default HODDashboard;
