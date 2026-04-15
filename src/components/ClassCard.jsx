import { Users, Edit, Trash2, Plus } from 'lucide-react';

export default function ClassCard({ classData, onEdit, onDelete, onAssignTeacher }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{classData.name}</h3>
          <p className="text-sm text-gray-600 mt-1">Section: {classData.section}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(classData.id)}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
            title="Edit class"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(classData.id)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
            title="Delete class"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Class Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wide">Total Students</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{classData.totalStudents}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wide">Grade</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{classData.grade}</p>
        </div>
      </div>

      {/* Assigned Teacher */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Assigned Teacher</p>
        {classData.assignedTeacher ? (
          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {classData.assignedTeacher.charAt(0)}
            </div>
            <span className="font-medium text-gray-900">{classData.assignedTeacher}</span>
          </div>
        ) : (
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">No teacher assigned</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={() => onAssignTeacher(classData.id)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        {classData.assignedTeacher ? 'Change Teacher' : 'Assign Teacher'}
      </button>
    </div>
  );
}
