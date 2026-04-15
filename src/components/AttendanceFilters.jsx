'use client';

import { Search, Filter, X } from 'lucide-react';

export default function AttendanceFilters({
  onFilterChange,
  filters,
  classes,
  type = 'student',
}) {
  const handleDateChange = (e) => {
    onFilterChange({ ...filters, date: e.target.value });
  };

  const handleClassChange = (e) => {
    onFilterChange({ ...filters, class: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      class: 'all',
      date: '',
      status: 'all',
    });
  };

  const activeFilters = [
    filters.class !== 'all',
    filters.date !== '',
    filters.status !== 'all',
    filters.search !== '',
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFilters > 0 && (
          <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {activeFilters} active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by {type === 'student' ? 'Student Name' : 'Teacher Name'}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Class Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <select
            value={filters.class}
            onChange={handleClassChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
            <option value="unmarked">Unmarked</option>
          </select>
        </div>
      </div>

      {activeFilters > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
