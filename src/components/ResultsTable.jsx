'use client';

import { useState } from 'react';
import { Search, Download, Filter, TrendingUp } from 'lucide-react';

export default function ResultsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState('All');
  const [sortBy, setSortBy] = useState('marks');

  const mockResults = [
    { id: 1, studentName: 'Aarav Kumar', examName: 'Midterm Exam 2024', subject: 'Mathematics', marks: 92, totalMarks: 100, percentage: 92, status: 'Pass', grade: 'A+' },
    { id: 2, studentName: 'Ananya Patel', examName: 'Midterm Exam 2024', subject: 'Mathematics', marks: 85, totalMarks: 100, percentage: 85, status: 'Pass', grade: 'A' },
    { id: 3, studentName: 'Rohan Singh', examName: 'Midterm Exam 2024', subject: 'Mathematics', marks: 78, totalMarks: 100, percentage: 78, status: 'Pass', grade: 'B+' },
    { id: 4, studentName: 'Priya Sharma', examName: 'Midterm Exam 2024', subject: 'Mathematics', marks: 35, totalMarks: 100, percentage: 35, status: 'Fail', grade: 'F' },
    { id: 5, studentName: 'Vikram Reddy', examName: 'Unit Test 1', subject: 'English', marks: 42, totalMarks: 50, percentage: 84, status: 'Pass', grade: 'A' },
    { id: 6, studentName: 'Sanjana Gupta', examName: 'Unit Test 1', subject: 'English', marks: 38, totalMarks: 50, percentage: 76, status: 'Pass', grade: 'B' },
    { id: 7, studentName: 'Arjun Desai', examName: 'Science Practical', subject: 'Science', marks: 72, totalMarks: 80, percentage: 90, status: 'Pass', grade: 'A+' },
    { id: 8, studentName: 'Divya Nair', examName: 'Science Practical', subject: 'Science', marks: 68, totalMarks: 80, percentage: 85, status: 'Pass', grade: 'A' },
    { id: 9, studentName: 'Harsh Pandey', examName: 'Science Practical', subject: 'Science', marks: 32, totalMarks: 80, percentage: 40, status: 'Pass', grade: 'C' },
    { id: 10, studentName: 'Neha Singh', examName: 'History Assessment', subject: 'History', marks: 62, totalMarks: 75, percentage: 82.67, status: 'Pass', grade: 'A' },
  ];

  const exams = ['All', ...new Set(mockResults.map(r => r.examName))];

  const filteredResults = mockResults
    .filter(result => {
      const matchSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.examName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchExam = filterExam === 'All' || result.examName === filterExam;
      return matchSearch && matchExam;
    })
    .sort((a, b) => {
      if (sortBy === 'marks') return b.marks - a.marks;
      if (sortBy === 'percentage') return b.percentage - a.percentage;
      if (sortBy === 'name') return a.studentName.localeCompare(b.studentName);
      return 0;
    });

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-green-100 text-green-800',
      'B+': 'bg-blue-100 text-blue-800',
      'B': 'bg-blue-100 text-blue-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-orange-100 text-orange-800',
      'F': 'bg-red-100 text-red-800',
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    return status === 'Pass'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const stats = {
    totalResults: mockResults.length,
    averageMarks: (mockResults.reduce((sum, r) => sum + r.marks, 0) / mockResults.length).toFixed(1),
    passPercentage: ((mockResults.filter(r => r.status === 'Pass').length / mockResults.length) * 100).toFixed(1),
    topScore: Math.max(...mockResults.map(r => r.marks)),
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Total Results</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalResults}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Average Marks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.averageMarks}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Pass Percentage</p>
          <p className="text-2xl font-bold text-green-600">{stats.passPercentage}%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Top Score</p>
          <p className="text-2xl font-bold text-blue-600">{stats.topScore}</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Exam Results</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            <Download className="w-4 h-4" />
            Export Results
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student or exam..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {exams.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="marks">Sort by Marks</option>
            <option value="percentage">Sort by Percentage</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Exam</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Marks</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Percentage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map(result => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{result.studentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{result.examName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{result.subject}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {result.marks}/{result.totalMarks}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{result.percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
