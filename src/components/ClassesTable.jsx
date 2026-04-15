import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ClassesTable({ classes, onEdit, onDelete, onAssignTeacher }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedClasses = useMemo(() => {
    let filtered = classes.filter((cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cls.assignedTeacher && cls.assignedTeacher.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'grade') {
        return a.grade.localeCompare(b.grade);
      } else if (sortBy === 'students') {
        return b.totalStudents - a.totalStudents;
      }
      return 0;
    });
  }, [classes, searchTerm, sortBy]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by class name, section, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-6 py-4 border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setSortBy('name')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'name'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy('grade')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'grade'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Grade
        </button>
        <button
          onClick={() => setSortBy('students')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'students'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sort by Students
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Assigned Teacher
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedClasses.map((cls) => (
              <tr key={cls.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{cls.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {cls.section}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium">{cls.grade}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-green-800 font-bold">
                    {cls.totalStudents}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {cls.assignedTeacher ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {cls.assignedTeacher.charAt(0)}
                      </div>
                      <span className="text-gray-700 font-medium">{cls.assignedTeacher}</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      Not Assigned
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onAssignTeacher(cls.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Assign teacher"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Assign</span>
                    </button>
                    <button
                      onClick={() => onEdit(cls.id)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                      title="Edit class"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(cls.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      title="Delete class"
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

      {/* Empty State */}
      {filteredAndSortedClasses.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-gray-400 mb-2">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-lg font-medium text-gray-600">No classes found</p>
            <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}
