
import React from 'react';
import { Phone, Clock, CheckSquare, UserSquare2, PhoneForwarded, PhoneOff, Timer } from 'lucide-react';
import KPICard from '../../ui-elements/KPICard';

const KPISection: React.FC = () => {
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

  return (
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
  );
};

export default KPISection;
