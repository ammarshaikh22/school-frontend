'use client';

import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

const UserFilters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  const roles = ['All', 'Teacher', 'Student', 'Admin'];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const handleFilterChange = () => {
    onFilterChange({
      search: searchTerm,
      role: selectedRole,
      status: selectedStatus,
    });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedRole('All');
    setSelectedStatus('All');
    onFilterChange({
      search: '',
      role: 'All',
      status: 'All',
    });
  };

  const handleApplyFilters = () => {
    handleFilterChange();
    setIsOpen(false);
  };

  const activeFilters = (selectedRole !== 'All' ? 1 : 0) + (selectedStatus !== 'All' ? 1 : 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6 flex-wrap items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilterChange()}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilters > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {activeFilters}
            </span>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
        >
          <X className="w-4 h-4" />
          <span className="text-sm font-medium">Reset</span>
        </button>
      </div>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Filter by Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRole === role
                      ? 'bg-blue-600 text-white border border-blue-600'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Filter by Status</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white border border-blue-600'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-3">
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Apply Filters
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;
