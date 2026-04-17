'use client';

import { useState } from 'react';
import Link from 'next/link';
import {  Save, RotateCcw, CheckCircle } from 'lucide-react';
import UserTopHeader from '@/components/UserTopHeader';

export default function AssignTeacher() {
  const [selectedAssignments, setSelectedAssignments] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Mock teachers data
  const teachers = [
    { id: 1, name: 'Ahmed Khan', subject: 'Mathematics', qualification: 'M.Sc Mathematics', experience: '8 years' },
    { id: 2, name: 'Fatima Ali', subject: 'English', qualification: 'M.A English', experience: '6 years' },
    { id: 3, name: 'Hassan Muhammad', subject: 'Science', qualification: 'B.Sc Physics', experience: '5 years' },
    { id: 4, name: 'Sarah Johnson', subject: 'History', qualification: 'M.A History', experience: '7 years' },
    { id: 5, name: 'Mohammad Ali', subject: 'Urdu', qualification: 'M.A Urdu', experience: '9 years' },
    { id: 6, name: 'Aisha Malik', subject: 'Islamiat', qualification: 'B.A Islamic Studies', experience: '4 years' },
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

  const handleAssignmentChange = (classId, teacherName) => {
    setSelectedAssignments((prev) => ({
      ...prev,
      [classId]: teacherName,
    }));
  };

  const handleSaveAssignments = () => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => ({
        ...cls,
        assignedTeacher: selectedAssignments[cls.id] !== undefined ? selectedAssignments[cls.id] : cls.assignedTeacher,
      }))
    );
    setSelectedAssignments({});
    setSuccessMessage('Teachers assigned successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    setSelectedAssignments({});
  };

  const unassignedClasses = classes.filter((cls) => {
    const assigned = selectedAssignments[cls.id] !== undefined ? selectedAssignments[cls.id] : cls.assignedTeacher;
    return !assigned;
  });

  const hasChanges = Object.keys(selectedAssignments).length > 0;

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
      <UserTopHeader />

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
                <span className="text-gray-900 font-medium">Assign Teacher</span>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-medium">{successMessage}</p>
                </div>
              )}

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Teachers to Classes</h1>
                <p className="text-gray-600">Manage teacher assignments across all classes</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Classes to Assign */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h2 className="text-lg font-bold text-gray-900">Select Teacher for Each Class</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {classes.map((cls) => (
                        <div key={cls.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
                              <p className="text-sm text-gray-600">
                                Section {cls.section} • Grade {cls.grade} • {cls.totalStudents} Students
                              </p>
                            </div>
                          </div>

                          {/* Teacher Selection */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {teachers.map((teacher) => (
                              <label
                                key={teacher.id}
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                              >
                                <input
                                  type="radio"
                                  name={`class-${cls.id}`}
                                  value={teacher.name}
                                  checked={
                                    (selectedAssignments[cls.id] !== undefined
                                      ? selectedAssignments[cls.id]
                                      : cls.assignedTeacher) === teacher.name
                                  }
                                  onChange={() => handleAssignmentChange(cls.id, teacher.name)}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <div className="ml-3 flex-1">
                                  <p className="font-medium text-gray-900">{teacher.name}</p>
                                  <p className="text-xs text-gray-600">{teacher.subject}</p>
                                </div>
                              </label>
                            ))}
                          </div>

                          {/* Current Assignment Info */}
                          {(selectedAssignments[cls.id] || cls.assignedTeacher) && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-800">
                                <span className="font-semibold">Assigned to:</span>{' '}
                                {selectedAssignments[cls.id] || cls.assignedTeacher}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleSaveAssignments}
                      disabled={!hasChanges}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      Save Assignments
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={!hasChanges}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Teachers Overview */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Available Teachers</h3>
                    <div className="space-y-3">
                      {teachers.map((teacher) => {
                        const assignedCount = classes.filter(
                          (cls) =>
                            (selectedAssignments[cls.id] !== undefined
                              ? selectedAssignments[cls.id]
                              : cls.assignedTeacher) === teacher.name
                        ).length;

                        return (
                          <div key={teacher.id} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium text-gray-900">{teacher.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{teacher.subject}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-600">{teacher.experience}</span>
                              <span className="text-sm font-bold text-blue-600">{assignedCount} assigned</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Total Classes</span>
                        <span className="font-bold text-gray-900">{classes.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Assigned Classes</span>
                        <span className="font-bold text-green-600">{classes.length - unassignedClasses.length}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-gray-700">Pending Assignment</span>
                        <span className="font-bold text-orange-600">{unassignedClasses.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pending Classes */}
                  {unassignedClasses.length > 0 && (
                    <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
                      <h3 className="text-lg font-bold text-yellow-900 mb-4">Unassigned Classes</h3>
                      <div className="space-y-2">
                        {unassignedClasses.map((cls) => (
                          <div key={cls.id} className="text-sm text-yellow-800">
                            <p className="font-medium">{cls.name}</p>
                            <p className="text-xs text-yellow-700">Section {cls.section}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
