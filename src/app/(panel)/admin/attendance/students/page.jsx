"use client";
import { useState, useMemo } from "react";
import AttendanceFilters from "@/components/AttendanceFilters";
import AttendanceTable from "@/components/AttendanceTable";
import { Plus, BarChart3 } from "lucide-react";
import UserTopHeader from "@/components/UserTopHeader";

export default function StudentAttendance() {
  const [filters, setFilters] = useState({
    search: "",
    class: "all",
    date: "",
    status: "all",
  });

  const classes = [
    { id: "class-1", name: "Class 1 - A" },
    { id: "class-2", name: "Class 2 - B" },
    { id: "class-3", name: "Class 3 - A" },
    { id: "class-4", name: "Class 4 - B" },
    { id: "class-5", name: "Class 5 - A" },
  ];

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: "1",
      name: "Ahmed Hassan",
      class: "Class 1 - A",
      date: "2024-04-10",
      status: "present",
      notes: "",
    },
    {
      id: "2",
      name: "Fatima Khan",
      class: "Class 1 - A",
      date: "2024-04-10",
      status: "present",
      notes: "",
    },
    {
      id: "3",
      name: "Ali Raza",
      class: "Class 1 - A",
      date: "2024-04-10",
      status: "absent",
      notes: "Sick leave",
    },
    {
      id: "4",
      name: "Sara Ahmed",
      class: "Class 1 - A",
      date: "2024-04-10",
      status: "leave",
      notes: "Medical appointment",
    },
    {
      id: "5",
      name: "Hassan Malik",
      class: "Class 2 - B",
      date: "2024-04-10",
      status: "present",
      notes: "",
    },
    {
      id: "6",
      name: "Amira Siddiqui",
      class: "Class 2 - B",
      date: "2024-04-10",
      status: "present",
      notes: "",
    },
    {
      id: "7",
      name: "Mohammad Amin",
      class: "Class 2 - B",
      date: "2024-04-10",
      status: "absent",
      notes: "Family emergency",
    },
    {
      id: "8",
      name: "Noor Fatima",
      class: "Class 3 - A",
      date: "2024-04-10",
      status: "present",
      notes: "",
    },
    {
      id: "9",
      name: "Karim Hussein",
      class: "Class 3 - A",
      date: "2024-04-09",
      status: "present",
      notes: "",
    },
    {
      id: "10",
      name: "Zainab Ali",
      class: "Class 3 - A",
      date: "2024-04-09",
      status: "absent",
      notes: "",
    },
  ];

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    return mockAttendanceData.filter((record) => {
      const matchesSearch =
        filters.search === "" ||
        record.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesClass =
        filters.class === "all" ||
        record.class === classes.find((c) => c.id === filters.class)?.name;
      const matchesDate = filters.date === "" || record.date === filters.date;
      const matchesStatus =
        filters.status === "all" || record.status === filters.status;

      return matchesSearch && matchesClass && matchesDate && matchesStatus;
    });
  }, [filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredRecords.length;
    const present = filteredRecords.filter(
      (r) => r.status === "present",
    ).length;
    const absent = filteredRecords.filter((r) => r.status === "absent").length;
    const leave = filteredRecords.filter((r) => r.status === "leave").length;
    const presentPercentage =
      total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, leave, presentPercentage };
  }, [filteredRecords]);

  const handleEdit = (record) => {
    console.log("Edit attendance:", record);
  };

  const handleDelete = (id) => {
    console.log("Delete attendance:", id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Student Attendance
                    </h1>
                    <p className="text-gray-600">
                      Track and manage student attendance records
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
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Present</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.present}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Absent</p>
                  </div>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.absent}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <p className="text-gray-600 text-sm">Leave</p>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.leave}
                  </p>
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
                  type="student"
                />
              </div>

              {/* Table */}
              <AttendanceTable
                records={filteredRecords}
                onEdit={handleEdit}
                onDelete={handleDelete}
                type="student"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
