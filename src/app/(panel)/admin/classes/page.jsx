'use client';

import { useState } from 'react';
import Link from 'next/link';
import ClassCard from '@/components/ClassCard';
import ClassesTable from '@/components/ClassesTable';
import AssignTeacherModal from '@/components/AssignTeacherModal';
import { Bell, Search, Settings, LogOut, ChevronDown, Plus, LayoutGrid, LayoutList } from 'lucide-react';

export default function AllClasses() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Mock teachers data
  const teachers = [
    { id: 1, name: 'Ahmed Khan', subject: 'Mathematics' },
    { id: 2, name: 'Fatima Ali', subject: 'English' },
    { id: 3, name: 'Hassan Muhammad', subject: 'Science' },
    { id: 4, name: 'Sarah Johnson', subject: 'History' },
    { id: 5, name: 'Mohammad Ali', subject: 'Urdu' },
    { id: 6, name: 'Aisha Malik', subject: 'Islamiat' },
  ];

  // Mock classes data
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class A', section: 'A-1', grade: '1st', totalStudents: 32, assignedTeacher: 'Ahmed Khan' },
    { id: 2, name: 'Class B', section: 'B-1', grade: '1st', totalStudents: 28, assignedTeacher: 'Fatima Ali' },
    { id: 3, name: 'Class C', section: 'A-2', grade: '2nd', totalStudents: 30, assignedTeacher: 'Hassan Muhammad' },
    { id: 4, name: 'Class D', section: 'B-2', grade: '2nd', totalStudents: 25, assignedTeacher: null },
    { id: 5, name: 'Class E', section: 'A-3', grade: '3rd', totalStudents: 35, assignedTeacher: 'Sarah Johnson' },
    { id: 6, name: 'Class F', section: 'B-3', grade: '3rd', totalStudents: 29, assignedTeacher: 'Mohammad Ali' },
  ]);

  const currentClass = classes.find((cls) => cls.id === selectedClassId);
  
  const handleAssignTeacher = (classId) => {
    setSelectedClassId(classId);
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssign = (classId, teacherName) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === classId ? { ...cls, assignedTeacher: teacherName } : cls
      )
    );
  };

  const handleEdit = (classId) => {
    alert(`Edit class ${classId}`);
  };

  const handleDelete = (classId) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== classId));
    }
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
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-8 text-sm">
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  Dashboard
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/classes" className="text-blue-600 hover:text-blue-700">
                  Classes Management
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">All Classes</span>
              </div>

              {/* Page Header */}
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">All Classes</h1>
                  <p className="text-gray-600">Manage classes and assign teachers</p>
                </div>
                <Link
                  href="/classes/assign"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Assign Teacher
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Classes</p>
                  <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{classes.reduce((sum, cls) => sum + cls.totalStudents, 0)}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Teachers Assigned</p>
                  <p className="text-3xl font-bold text-gray-900">{classes.filter((cls) => cls.assignedTeacher).length}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Unassigned Classes</p>
                  <p className="text-3xl font-bold text-orange-600">{classes.filter((cls) => !cls.assignedTeacher).length}</p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                  Table View
                </button>
              </div>

              {/* Classes Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classData={classItem}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAssignTeacher={handleAssignTeacher}
                    />
                  ))}
                </div>
              ) : (
                <ClassesTable
                  classes={classes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAssignTeacher={handleAssignTeacher}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Assign Teacher Modal */}
      <AssignTeacherModal
        isOpen={isAssignModalOpen}
        classData={currentClass}
        teachers={teachers}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleConfirmAssign}
      />
    </div>
  );
}
