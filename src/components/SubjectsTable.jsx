'use client';

import { useState } from 'react';
import { Edit2, Trash2, Users, ChevronUp, ChevronDown, Search } from 'lucide-react';

export default function SubjectsTable({ subjects, onEdit, onDelete, onAssignTeacher }) {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter subjects based on search
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.assignedTeachers && subject.assignedTeachers.some(t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  // Sort subjects
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'assignedTeachers') {
      aValue = a.assignedTeachers?.length || 0;
      bValue = b.assignedTeachers?.length || 0;
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <div className="w-4 h-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by subject name, code, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      {sortedSubjects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                  >
                    Subject Name
                    <SortIcon columnKey="name" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('code')}
                    className="flex items-center gap-2 font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                  >
                    Code
                    <SortIcon columnKey="code" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('grade')}
                    className="flex items-center gap-2 font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                  >
                    Grade
                    <SortIcon columnKey="grade" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('creditHours')}
                    className="flex items-center gap-2 font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                  >
                    Credit Hours
                    <SortIcon columnKey="creditHours" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('assignedTeachers')}
                    className="flex items-center gap-2 font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                  >
                    Teachers
                    <SortIcon columnKey="assignedTeachers" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSubjects.map((subject) => (
                <tr key={subject.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{subject.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{subject.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{subject.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{subject.creditHours}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subject.assignedTeachers && subject.assignedTeachers.length > 0 ? (
                        subject.assignedTeachers.map((teacher) => (
                          <span
                            key={teacher.id}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium"
                          >
                            {teacher.name.split(' ')[0]}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">Not assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      subject.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subject.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAssignTeacher(subject.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors font-medium"
                        title="Assign Teacher"
                      >
                        <Users className="w-4 h-4" />
                        Assign
                      </button>
                      <button
                        onClick={() => onEdit(subject.id)}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(subject.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No subjects found matching your search</p>
        </div>
      )}
    </div>
  );
}
