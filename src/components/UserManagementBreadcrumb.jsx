'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const UserManagementBreadcrumb = ({ currentFilter }) => {
  const breadcrumbs = [
    { label: 'All Users', filter: 'all', icon: '👥' },
    { label: 'Pending Requests', filter: 'pending', icon: '⏳' },
    { label: 'Teachers', filter: 'teachers', icon: '📚' },
    { label: 'Students', filter: 'students', icon: '🎓' },
  ];

  const active = breadcrumbs.find(b => b.filter === currentFilter);

  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      <span className="text-sm text-gray-500">View:</span>
      <div className="flex items-center gap-1 flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.filter} className="flex items-center gap-1">
            <Link
              href={`/admin/users?filter=${breadcrumb.filter}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active?.filter === breadcrumb.filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{breadcrumb.icon}</span> {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementBreadcrumb;
