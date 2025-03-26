
import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export type ChartData = Array<Record<string, any>>;

interface ChartProps {
  data: ChartData;
  type: 'line' | 'bar' | 'area' | 'pie';
  xKey: string;
  yKeys: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  height?: number;
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  xKey,
  yKeys,
  height = 300,
  title,
  subtitle,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  className = '',
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />}
            {showLegend && <Legend />}
            {yKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />}
            {showLegend && <Legend />}
            {yKeys.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#f0f0f0' }}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />}
            {showLegend && <Legend />}
            {yKeys.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                fill={`${item.color}22`}
              />
            ))}
          </AreaChart>
        );
      
      case 'pie':
        const COLORS = yKeys.map((item) => item.color);
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({
          cx, cy, midAngle, innerRadius, outerRadius, percent, index,
        }: any) => {
          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        return (
          <PieChart margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yKeys[0].key}
              nameKey={xKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />}
            {showLegend && <Legend />}
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`card-glass ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
