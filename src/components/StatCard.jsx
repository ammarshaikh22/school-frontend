import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, change, changeType = 'positive', icon: Icon, bgColor }) {
  const isPositive = changeType === 'positive';
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`${bgColor} p-3 rounded-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-green-600" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-600" />
        )}
        <span className={isPositive ? 'text-green-600 text-sm font-medium' : 'text-red-600 text-sm font-medium'}>
          {change}
        </span>
        <span className="text-gray-600 text-sm">vs last month</span>
      </div>
    </div>
  );
}
