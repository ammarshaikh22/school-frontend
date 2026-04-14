'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', students: 400, enrolled: 240 },
  { month: 'Feb', students: 520, enrolled: 320 },
  { month: 'Mar', students: 480, enrolled: 380 },
  { month: 'Apr', students: 650, enrolled: 500 },
  { month: 'May', students: 780, enrolled: 620 },
  { month: 'Jun', students: 920, enrolled: 750 },
  { month: 'Jul', students: 1100, enrolled: 890 },
  { month: 'Aug', students: 1250, enrolled: 1050 },
  { month: 'Sep', students: 1400, enrolled: 1200 },
  { month: 'Oct', students: 1580, enrolled: 1350 },
  { month: 'Nov', students: 1720, enrolled: 1500 },
  { month: 'Dec', students: 1850, enrolled: 1680 },
];

export default function StudentGrowthChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Student Growth</h3>
        <p className="text-sm text-gray-600">Monthly enrollment trends</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="students" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Students"
          />
          <Line 
            type="monotone" 
            dataKey="enrolled" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Active Enrolled"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
