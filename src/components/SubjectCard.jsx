'use client';

import { Edit2, Trash2, Users } from 'lucide-react';

export default function SubjectCard({ subject, onEdit, onDelete, onAssignTeacher }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Subject Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.name}</h3>
          <p className="text-sm text-gray-600">{subject.code}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          subject.isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {subject.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Subject Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Grade:</span>
          <span className="font-medium text-gray-900">{subject.grade}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Credit Hours:</span>
          <span className="font-medium text-gray-900">{subject.creditHours}</span>
        </div>
      </div>

      {/* Teacher Info */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Assigned Teachers</p>
        {subject.assignedTeachers && subject.assignedTeachers.length > 0 ? (
          <div className="space-y-2">
            {subject.assignedTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {teacher.name.charAt(0)}
                </div>
                <span className="text-sm text-gray-900 flex-1">{teacher.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 p-2 bg-gray-50 rounded text-center">
            No teachers assigned
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAssignTeacher(subject.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Users className="w-4 h-4" />
          Assign Teacher
        </button>
        <button
          onClick={() => onEdit(subject.id)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(subject.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
