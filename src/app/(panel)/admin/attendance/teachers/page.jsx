'use client';

import { useState, useMemo } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AttendanceFilters from '@/components/AttendanceFilters';
import AttendanceTable from '@/components/AttendanceTable';
import { Bell, Search, Settings, LogOut, ChevronDown, Plus, BarChart3, Clock } from 'lucide-react';

export default function TeacherAttendance() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    class: 'all',
    date: '',
    status: 'all',
  });

  const classes = [
    { id: 'class-1', name: 'Class 1 - A' },
    { id: 'class-2', name: 'Class 2 - B' },
    { id: 'class-3', name: 'Class 3 - A' },
    { id: 'class-4', name: 'Class 4 - B' },
    { id: 'class-5', name: 'Class 5 - A' },
  ];

  // Mock teacher attendance data
  const mockTeacherAttendanceData = [
    {
      id: '1',
      name: 'Mrs. Aisha Khan',
      class: 'Class 1 - A',
      date: '2024-04-10',
      status: 'present',
      notes: '',
    },
    {
      id: '2',
      name: 'Mr. Hassan Ahmed',
      class: 'Class 2 - B',
      date: '2024-04-10',
      status: 'present',
      notes: '',
    },
    {
      id: '3',
      name: 'Ms. Fatima Malik',
      class: 'Class 1 - A',
      date: '2024-04-10',
      status: 'present',
      notes: '',
    },
    {
      id: '4',
      name: 'Dr. Mohammad Raza',
      class: 'Class 3 - A',
      date: '2024-04-10',
      status: 'absent',
      notes: 'Medical appointment',
    },
    {
      id: '5',
      name: 'Mrs. Noor Fatima',
      class: 'Class 2 - B',
      date: '2024-04-10',
      status: 'leave',
      notes: 'Personal leave',
    },
    {
      id: '6',
      name: 'Mr. Karim Hussein',
      class: 'Class 4 - B',
      date: '2024-04-10',
      status: 'present',
      notes: '',
    },
    {
      id: '7',
      name: 'Ms. Zainab Ali',
      class: 'Class 5 - A',
      date: '2024-04-10',
      status: 'present',
      notes: '',
    },
    {
      id: '8',
      name: 'Prof. Jamal Hassan',
      class: 'Class 3 - A',
      date: '2024-04-09',
      status: 'present',
      notes: '',
    },
    {
      id: '9',
      name: 'Mrs. Amira Siddiqui',
      class: 'Class 4 - B',
      date: '2024-04-09',
      status: 'absent',
      notes: '',
    },
    {
      id: '10',
      name: 'Mr. Abdullah Khan',
      class: 'Class 5 - A',
      date: '2024-04-09',
      status: 'present',
      notes: '',
    },
  ];

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    return mockTeacherAttendanceData.filter((record) => {
      const matchesSearch =
        filters.search === '' ||
        record.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesClass =
        filters.class === 'all' || record.class === classes.find(c => c.id === filters.class)?.name;
      const matchesDate = filters.date === '' || record.date === filters.date;
      const matchesStatus =
        filters.status === 'all' || record.status === filters.status;

      return matchesSearch && matchesClass && matchesDate && matchesStatus;
    });
  }, [filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredRecords.length;
    const present = filteredRecords.filter((r) => r.status === 'present').length;
    const absent = filteredRecords.filter((r) => r.status === 'absent').length;
    const leave = filteredRecords.filter((r) => r.status === 'leave').length;
    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, leave, presentPercentage };
  }, [filteredRecords]);

  const handleEdit = (record) => {
    console.log('Edit teacher attendance:', record);
  };

  const handleDelete = (id) => {
    console.log('Delete teacher attendance:', id);
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
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
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
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Teacher Attendance
                    </h1>
                    <p className="text-gray-600">
                      Monitor and manage teacher attendance records
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Mark Attendance
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Records</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Present</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{stats.present}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Absent</p>
                  </div>
                  <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Leave</p>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">{stats.leave}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <p className="text-gray-600 text-sm">Percentage</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.presentPercentage}%
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-8">
                <AttendanceFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  classes={classes}
                  type="teacher"
                />
              </div>

              {/* Table */}
              <AttendanceTable
                records={filteredRecords}
                onEdit={handleEdit}
                onDelete={handleDelete}
                type="teacher"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
