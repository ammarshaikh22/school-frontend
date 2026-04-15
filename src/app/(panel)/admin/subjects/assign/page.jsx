'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell, Search, Settings, LogOut, ChevronDown, Save, RotateCcw, CheckCircle } from 'lucide-react';

export default function AssignSubjectsPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedAssignments, setSelectedAssignments] = useState({});

  // Mock subjects data
  const mockSubjects = [
    { id: 1, name: 'Mathematics', code: 'MATH101', grade: '10', assignedTeachers: [1, 2] },
    { id: 2, name: 'English Literature', code: 'ENG102', grade: '10', assignedTeachers: [3] },
    { id: 3, name: 'Science', code: 'SCI103', grade: '10', assignedTeachers: [] },
    { id: 4, name: 'History', code: 'HIS104', grade: '10', assignedTeachers: [4] },
    { id: 5, name: 'Geography', code: 'GEO105', grade: '10', assignedTeachers: [5] },
    { id: 6, name: 'Physics', code: 'PHY106', grade: '11', assignedTeachers: [2] },
    { id: 7, name: 'Chemistry', code: 'CHE107', grade: '11', assignedTeachers: [] },
    { id: 8, name: 'Biology', code: 'BIO108', grade: '11', assignedTeachers: [6] },
  ];

  // Mock teachers data
  const mockTeachers = [
    { id: 1, name: 'John Smith', specialization: 'Mathematics' },
    { id: 2, name: 'Sarah Johnson', specialization: 'Science' },
    { id: 3, name: 'Michael Brown', specialization: 'English' },
    { id: 4, name: 'Emily Davis', specialization: 'History' },
    { id: 5, name: 'Robert Wilson', specialization: 'Geography' },
    { id: 6, name: 'Jennifer Martinez', specialization: 'Biology' },
    { id: 7, name: 'David Thompson', specialization: 'Mathematics' },
    { id: 8, name: 'Lisa Anderson', specialization: 'Physics' },
  ];

  const [subjects] = useState(mockSubjects);

  // Initialize selected assignments
  const [assignments, setAssignments] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject.id] = subject.assignedTeachers || [];
      return acc;
    }, {})
  );

  // Statistics
  const totalSubjects = subjects.length;
  const assignedSubjects = subjects.filter(s => assignments[s.id]?.length > 0).length;
  const unassignedSubjects = subjects.filter(s => !assignments[s.id] || assignments[s.id].length === 0).length;
  const totalAssignments = Object.values(assignments).reduce((sum, arr) => sum + arr.length, 0);

  const handleTeacherToggle = (subjectId, teacherId) => {
    setAssignments(prev => {
      const currentAssignments = prev[subjectId] || [];
      const isAssigned = currentAssignments.includes(teacherId);
      
      return {
        ...prev,
        [subjectId]: isAssigned
          ? currentAssignments.filter(id => id !== teacherId)
          : [...currentAssignments, teacherId]
      };
    });
  };

  const handleSaveAssignments = () => {
    setSuccessMessage('All assignments saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    setAssignments(
      subjects.reduce((acc, subject) => {
        acc[subject.id] = subject.assignedTeachers || [];
        return acc;
      }, {})
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 ml-12 lg:ml-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {successMessage}
                </div>
              )}

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Subjects to Teachers</h1>
                <p className="text-gray-600">Select teachers for each subject to create proper course assignments</p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Subjects</p>
                  <p className="text-4xl font-bold text-gray-900">{totalSubjects}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Assigned</p>
                  <p className="text-4xl font-bold text-green-600">{assignedSubjects}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Unassigned</p>
                  <p className="text-4xl font-bold text-orange-600">{unassignedSubjects}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Assignments</p>
                  <p className="text-4xl font-bold text-blue-600">{totalAssignments}</p>
                </div>
              </div>

              {/* Unassigned Subjects Warning */}
              {unassignedSubjects > 0 && (
                <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-900 font-semibold">⚠️ {unassignedSubjects} subject(s) without assigned teachers</p>
                </div>
              )}

              {/* Subjects Assignment Grid */}
              <div className="space-y-6 mb-8">
                {subjects.map((subject) => (
                  <div key={subject.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    {/* Subject Header */}
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>Code: <span className="font-medium">{subject.code}</span></span>
                          <span>Grade: <span className="font-medium">{subject.grade}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Teachers Assigned</p>
                        <p className="text-2xl font-bold text-blue-600">{(assignments[subject.id] || []).length}</p>
                      </div>
                    </div>

                    {/* Teachers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {mockTeachers.map((teacher) => (
                        <label
                          key={teacher.id}
                          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={(assignments[subject.id] || []).includes(teacher.id)}
                            onChange={() => handleTeacherToggle(subject.id, teacher.id)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <div className="ml-3 flex-1">
                            <p className="font-medium text-gray-900 text-sm">{teacher.name}</p>
                            <p className="text-xs text-gray-500">{teacher.specialization}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sticky bottom-6 justify-end">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
                <button
                  onClick={handleSaveAssignments}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save All Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
