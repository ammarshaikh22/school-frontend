"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import UserFilters from "@/components/UserFilters";
import UserTable from "@/components/UserTable";
import UserManagementBreadcrumb from "@/components/UserManagementBreadcrumb";
import UserTopHeader from "@/components/UserTopHeader";

export default function UserManagement() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";

  const getPageConfig = () => {
    switch (filterParam) {
      case "pending":
        return {
          title: "Pending Requests",
          description: "Review and approve pending user registrations",
          initialFilters: { search: "", role: "All", status: "Pending" },
        };
      case "teachers":
        return {
          title: "Teachers List",
          description: "View and manage all teachers in the system",
          initialFilters: { search: "", role: "Teacher", status: "All" },
        };
      case "students":
        return {
          title: "Students List",
          description: "View and manage all students in the system",
          initialFilters: { search: "", role: "Student", status: "All" },
        };
      default:
        return {
          title: "All Users",
          description: "Manage all users in your institution",
          initialFilters: { search: "", role: "All", status: "All" },
        };
    }
  };

  const pageConfig = getPageConfig();
  const [filters, setFilters] = useState(pageConfig.initialFilters);

  const mockUsers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@school.com",
      role: "Teacher",
      status: "Approved",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima.ali@school.com",
      role: "Student",
      status: "Approved",
      joinDate: "2024-02-10",
    },
    {
      id: 3,
      name: "Muhammad Khan",
      email: "muhammad.khan@school.com",
      role: "Teacher",
      status: "Pending",
      joinDate: "2024-03-05",
    },
    {
      id: 4,
      name: "Aisha Ahmed",
      email: "aisha.ahmed@school.com",
      role: "Student",
      status: "Pending",
      joinDate: "2024-03-20",
    },
    {
      id: 5,
      name: "Hassan Ibrahim",
      email: "hassan.ibrahim@school.com",
      role: "Teacher",
      status: "Approved",
      joinDate: "2024-01-08",
    },
    {
      id: 6,
      name: "Sara Mohamed",
      email: "sara.mohamed@school.com",
      role: "Student",
      status: "Pending",
      joinDate: "2024-03-25",
    },
    {
      id: 7,
      name: "Ali Mahmoud",
      email: "ali.mahmoud@school.com",
      role: "Teacher",
      status: "Rejected",
      joinDate: "2024-02-12",
    },
    {
      id: 8,
      name: "Mona Hassan",
      email: "mona.hassan@school.com",
      role: "Student",
      status: "Approved",
      joinDate: "2024-01-25",
    },
    {
      id: 9,
      name: "Ibrahim Salim",
      email: "ibrahim.salim@school.com",
      role: "Teacher",
      status: "Pending",
      joinDate: "2024-03-10",
    },
    {
      id: 10,
      name: "Hana Ismail",
      email: "hana.ismail@school.com",
      role: "Student",
      status: "Approved",
      joinDate: "2024-02-28",
    },
  ];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesRole = filters.role === "All" || user.role === filters.role;
      const matchesStatus =
        filters.status === "All" || user.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApprove = (id) => {
    console.log("Approved user:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected user:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleted user:", id);
  };

  const stats = {
    total: mockUsers.length,
    pending: mockUsers.filter((u) => u.status === "Pending").length,
    approved: mockUsers.filter((u) => u.status === "Approved").length,
    teachers: mockUsers.filter((u) => u.role === "Teacher").length,
    students: mockUsers.filter((u) => u.role === "Student").length,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb Navigation */}
              <UserManagementBreadcrumb currentFilter={filterParam} />

              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pageConfig.title}
                </h1>
                <p className="text-gray-600">{pageConfig.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold mb-2">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold mb-2">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold mb-2">
                    Approved
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.approved}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold mb-2">
                    Teachers
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.teachers}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold mb-2">
                    Students
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.students}
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-8">
                <UserFilters onFilterChange={handleFilterChange} />
              </div>

              {/* User Table */}
              <UserTable
                users={filteredUsers}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
