import { X, Check } from 'lucide-react';
import { useState } from 'react';

export default function AssignTeacherModal({ isOpen, classData, teachers, onClose, onAssign }) {
  const [selectedTeacher, setSelectedTeacher] = useState(classData?.assignedTeacher || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    onAssign(classData?.id, selectedTeacher);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !classData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Assign Teacher</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Class Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Assigning teacher to:</p>
            <p className="text-lg font-bold text-gray-900 mt-2">{classData?.name} - {classData?.section}</p>
          </div>

          {/* Teacher Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Select Teacher
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {teachers.map((teacher) => (
                <label
                  key={teacher.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="teacher"
                    value={teacher.name}
                    checked={selectedTeacher === teacher.name}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-sm text-gray-600">{teacher.subject}</p>
                  </div>
                  {selectedTeacher === teacher.name && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Current Assignment */}
          {classData?.assignedTeacher && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 uppercase tracking-wide">Current Assignment</p>
              <p className="font-medium text-gray-900 mt-2">{classData.assignedTeacher}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={isSubmitting || !selectedTeacher}
            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Assigning...' : 'Assign Teacher'}
          </button>
        </div>
      </div>
    </div>
  );
}
