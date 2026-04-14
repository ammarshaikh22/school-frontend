'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Class 1', collected: 45000, pending: 8000 },
  { name: 'Class 2', collected: 52000, pending: 5000 },
  { name: 'Class 3', collected: 48000, pending: 7000 },
  { name: 'Class 4', collected: 61000, pending: 3000 },
  { name: 'Class 5', collected: 55000, pending: 6000 },
  { name: 'Class 6', collected: 58000, pending: 4000 },
];

export default function FeeCollectionChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Fee Collection</h3>
        <p className="text-sm text-gray-600">Class-wise fee status</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem'
            }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="collected" fill="#3b82f6" name="Collected" radius={[8, 8, 0, 0]} />
          <Bar dataKey="pending" fill="#fbbf24" name="Pending" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
