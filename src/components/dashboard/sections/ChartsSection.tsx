
import React from 'react';
import Chart from '../../ui-elements/Chart';

const ChartsSection: React.FC = () => {
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

  return (
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
  );
};

export default ChartsSection;
