'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import SubjectCard from '@/components/SubjectCard';
import SubjectsTable from '@/components/SubjectsTable';
import AssignTeacherToSubjectModal from '@/components/AssignTeacherToSubjectModal';
import { Bell, Search, Settings, LogOut, ChevronDown, Plus, LayoutGrid, List } from 'lucide-react';

export default function SubjectsPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock subjects data
  const mockSubjects = [
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH101',
      grade: '10',
      creditHours: 4,
      isActive: true,
      assignedTeachers: [
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Sarah Johnson' }
      ]
    },
    {
      id: 2,
      name: 'English Literature',
      code: 'ENG102',
      grade: '10',
      creditHours: 3,
      isActive: true,
      assignedTeachers: [
        { id: 3, name: 'Michael Brown' }
      ]
    },
    {
      id: 3,
      name: 'Science',
      code: 'SCI103',
      grade: '10',
      creditHours: 4,
      isActive: true,
      assignedTeachers: []
    },
    {
      id: 4,
      name: 'History',
      code: 'HIS104',
      grade: '10',
      creditHours: 2,
      isActive: true,
      assignedTeachers: [
        { id: 4, name: 'Emily Davis' }
      ]
    },
    {
      id: 5,
      name: 'Geography',
      code: 'GEO105',
      grade: '10',
      creditHours: 2,
      isActive: true,
      assignedTeachers: [
        { id: 5, name: 'Robert Wilson' }
      ]
    },
    {
      id: 6,
      name: 'Physics',
      code: 'PHY106',
      grade: '11',
      creditHours: 4,
      isActive: true,
      assignedTeachers: [
        { id: 2, name: 'Sarah Johnson' }
      ]
    },
    {
      id: 7,
      name: 'Chemistry',
      code: 'CHE107',
      grade: '11',
      creditHours: 4,
      isActive: true,
      assignedTeachers: []
    },
    {
      id: 8,
      name: 'Biology',
      code: 'BIO108',
      grade: '11',
      creditHours: 4,
      isActive: true,
      assignedTeachers: [
        { id: 6, name: 'Jennifer Martinez' }
      ]
    },
  ];

  // Mock teachers data
  const mockTeachers = [
    { id: 1, name: 'John Smith', specialization: 'Mathematics', classes: 4 },
    { id: 2, name: 'Sarah Johnson', specialization: 'Science', classes: 3 },
    { id: 3, name: 'Michael Brown', specialization: 'English', classes: 5 },
    { id: 4, name: 'Emily Davis', specialization: 'History', classes: 2 },
    { id: 5, name: 'Robert Wilson', specialization: 'Geography', classes: 3 },
    { id: 6, name: 'Jennifer Martinez', specialization: 'Biology', classes: 2 },
    { id: 7, name: 'David Thompson', specialization: 'Mathematics', classes: 3 },
    { id: 8, name: 'Lisa Anderson', specialization: 'Physics', classes: 2 },
  ];

  const [subjects, setSubjects] = useState(mockSubjects);

  // Statistics
  const totalSubjects = subjects.length;
  const activeSubjects = subjects.filter(s => s.isActive).length;
  const totalTeachers = new Set(subjects.flatMap(s => s.assignedTeachers.map(t => t.id))).size;
  const unassignedSubjects = subjects.filter(s => s.assignedTeachers.length === 0).length;

  const handleAssignTeacher = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleSaveAssignment = (subjectId, selectedTeacherIds) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === subjectId
          ? {
              ...subject,
              assignedTeachers: mockTeachers.filter(t =>
                selectedTeacherIds.includes(t.id)
              )
            }
          : subject
      )
    );
    
    setSuccessMessage('Teachers assigned successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEdit = (subjectId) => {
    console.log('Edit subject:', subjectId);
  };

  const handleDelete = (subjectId) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
    setSuccessMessage('Subject deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
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
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects Management</h1>
                <p className="text-gray-600">Manage all subjects and assign teachers</p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Subjects</p>
                  <p className="text-4xl font-bold text-gray-900">{totalSubjects}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Active Subjects</p>
                  <p className="text-4xl font-bold text-green-600">{activeSubjects}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Teachers Assigned</p>
                  <p className="text-4xl font-bold text-blue-600">{totalTeachers}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Unassigned Subjects</p>
                  <p className="text-4xl font-bold text-orange-600">{unassignedSubjects}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'table'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    Table View
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Card View
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Plus className="w-5 h-5" />
                  Add Subject
                </button>
              </div>

              {/* View Content */}
              {viewMode === 'table' ? (
                <SubjectsTable
                  subjects={subjects}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAssignTeacher={handleAssignTeacher}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAssignTeacher={handleAssignTeacher}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Assign Teacher Modal */}
      {isModalOpen && selectedSubject && (
        <AssignTeacherToSubjectModal
          subject={selectedSubject}
          teachers={mockTeachers}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSubject(null);
          }}
          onAssign={handleSaveAssignment}
        />
      )}
    </div>
  );
}
