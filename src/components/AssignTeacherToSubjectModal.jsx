'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AssignTeacherToSubjectModal({ 
  subject, 
  teachers, 
  onClose, 
  onAssign 
}) {
  const [selectedTeachers, setSelectedTeachers] = useState(
    subject?.assignedTeachers?.map(t => t.id) || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleTeacher = (teacherId) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId)
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onAssign(subject.id, selectedTeachers);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error('Error assigning teachers:', error);
      setIsLoading(false);
    }
  };

  const selectedTeachersList = teachers.filter(t => selectedTeachers.includes(t.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Teachers to Subject</h2>
            <p className="text-sm text-gray-600 mt-1">{subject?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Currently Assigned Teachers */}
          {subject?.assignedTeachers && subject.assignedTeachers.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Currently Assigned Teachers</p>
              <div className="flex flex-wrap gap-2">
                {subject.assignedTeachers.map((teacher) => (
                  <span key={teacher.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {teacher.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Teachers List */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Select Teachers</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {teachers.map((teacher) => (
                <label key={teacher.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.id)}
                    onChange={() => handleToggleTeacher(teacher.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1 ml-3">
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.specialization}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {teacher.classes || 0} classes
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Selected Teachers Preview */}
          {selectedTeachers.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
              <p className="text-sm font-semibold text-green-900 mb-2">
                Selected Teachers ({selectedTeachers.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTeachersList.map((teacher) => (
                  <span key={teacher.id} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {teacher.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Assigning...' : 'Save Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
}
