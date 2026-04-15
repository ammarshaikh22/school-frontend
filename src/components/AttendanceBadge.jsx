'use client';

import { Check, X, Calendar } from 'lucide-react';

export default function AttendanceBadge({ status }) {
  const badgeConfig = {
    present: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: Check,
      label: 'Present',
    },
    absent: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      icon: X,
      label: 'Absent',
    },
    leave: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: Calendar,
      label: 'Leave',
    },
    unmarked: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300',
      icon: Calendar,
      label: 'Unmarked',
    },
  };

  const config = badgeConfig[status] || badgeConfig.unmarked;
  const IconComponent = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} font-medium text-sm`}
    >
      <IconComponent className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  );
}
