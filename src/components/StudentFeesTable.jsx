import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Download, Mail } from 'lucide-react';

export default function StudentFeesTable({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [classFilter, setClassFilter] = useState('All');

  const filteredData = useMemo(() => {
    return data.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'All' || student.class === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [data, searchTerm, classFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Paid': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Partial': 'bg-blue-100 text-blue-800',
    };
    return styles[status] || styles['Pending'];
  };

  const getClasses = () => {
    const classes = new Set(data.map(s => s.class));
    return Array.from(classes).sort();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option>All Classes</option>
          {getClasses().map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  Student Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Class</th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('totalFee')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  Total Fee
                  {sortConfig.key === 'totalFee' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('paid')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  Paid
                  {sortConfig.key === 'paid' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pending</th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  Status
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.class}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{student.totalFee.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">₹{student.paid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-semibold text-red-600">₹{(student.totalFee - student.paid).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-700 p-2">
                    <Mail className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No students found</p>
        </div>
      )}
    </div>
  );
}
