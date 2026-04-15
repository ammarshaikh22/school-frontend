import { TrendingUp, TrendingDown } from 'lucide-react';

export default function FinanceStatCard({ title, value, change, changeType, icon: Icon, bgColor }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {changeType === 'positive' ? (
          <>
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm font-medium">{change}</span>
          </>
        ) : (
          <>
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-medium">{change}</span>
          </>
        )}
        <span className="text-gray-500 text-sm">vs last month</span>
      </div>
    </div>
  );
}
