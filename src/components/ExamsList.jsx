'use client';

import { useState } from 'react';
import { Trash2, Edit2, Eye, Search, Filter } from 'lucide-react';

export default function ExamsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterSubject, setFilterSubject] = useState('All');

  const mockExams = [
    {
      id: 1,
      examName: 'Midterm Exam 2024',
      subject: 'Mathematics',
      class: 'Class 10',
      date: '2024-04-20',
      totalMarks: 100,
      passingMarks: 40,
      studentsAppeared: 45,
      studentsPass: 38,
    },
    {
      id: 2,
      examName: 'Unit Test 1',
      subject: 'English',
      class: 'Class 9',
      date: '2024-04-18',
      totalMarks: 50,
      passingMarks: 20,
      studentsAppeared: 42,
      studentsPass: 35,
    },
    {
      id: 3,
      examName: 'Science Practical',
      subject: 'Science',
      class: 'Class 8',
      date: '2024-04-15',
      totalMarks: 80,
      passingMarks: 32,
      studentsAppeared: 40,
      studentsPass: 36,
    },
    {
      id: 4,
      examName: 'History Assessment',
      subject: 'History',
      class: 'Class 7',
      date: '2024-04-10',
      totalMarks: 75,
      passingMarks: 30,
      studentsAppeared: 38,
      studentsPass: 32,
    },
    {
      id: 5,
      examName: 'Geography Test',
      subject: 'Geography',
      class: 'Class 6',
      date: '2024-04-05',
      totalMarks: 60,
      passingMarks: 24,
      studentsAppeared: 35,
      studentsPass: 28,
    },
  ];

  const subjects = ['All', 'Mathematics', 'English', 'Science', 'History', 'Geography'];

  const filteredExams = mockExams
    .filter(exam => {
      const matchSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSubject = filterSubject === 'All' || exam.subject === filterSubject;
      return matchSearch && matchSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'name') return a.examName.localeCompare(b.examName);
      return 0;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Exams</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Exam Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Class</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Marks</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map(exam => (
                <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{exam.examName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{exam.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{exam.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(exam.date)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{exam.totalMarks}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {exam.studentsAppeared}/{exam.studentsPass} passed
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-blue-100 rounded text-blue-600 transition" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-amber-100 rounded text-amber-600 transition" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded text-red-600 transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No exams found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
