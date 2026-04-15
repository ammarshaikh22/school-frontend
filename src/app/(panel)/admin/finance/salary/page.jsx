'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import TeacherSalariesTable from '@/components/TeacherSalariesTable';
import FinanceStatCard from '@/components/FinanceStatCard';
import { Bell, Search, Settings, LogOut, ChevronDown, Wallet, TrendingUp, Calendar, Users } from 'lucide-react';

export default function TeacherSalary() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mockTeacherSalaries = [
    { name: 'Dr. Ramesh Kumar', email: 'ramesh@school.com', department: 'Science', baseSalary: 60000, allowances: 10000, netSalary: 70000, status: 'Paid' },
    { name: 'Mrs. Priya Sharma', email: 'priya.s@school.com', department: 'English', baseSalary: 50000, allowances: 8000, netSalary: 58000, status: 'Paid' },
    { name: 'Mr. Vikram Singh', email: 'vikram.s@school.com', department: 'Mathematics', baseSalary: 55000, allowances: 9000, netSalary: 64000, status: 'Processing' },
    { name: 'Ms. Anjali Desai', email: 'anjali.d@school.com', department: 'Science', baseSalary: 60000, allowances: 10000, netSalary: 70000, status: 'Paid' },
    { name: 'Mr. Arjun Nair', email: 'arjun.n@school.com', department: 'History', baseSalary: 48000, allowances: 7000, netSalary: 55000, status: 'Pending' },
    { name: 'Mrs. Neha Gupta', email: 'neha.g@school.com', department: 'English', baseSalary: 50000, allowances: 8000, netSalary: 58000, status: 'Paid' },
    { name: 'Mr. Rajesh Patel', email: 'rajesh.p@school.com', department: 'Mathematics', baseSalary: 55000, allowances: 9000, netSalary: 64000, status: 'Paid' },
    { name: 'Ms. Sakshi Reddy', email: 'sakshi.r@school.com', department: 'Science', baseSalary: 60000, allowances: 10000, netSalary: 70000, status: 'Processing' },
    { name: 'Mr. Karan Bhat', email: 'karan.b@school.com', department: 'Geography', baseSalary: 48000, allowances: 7000, netSalary: 55000, status: 'Paid' },
    { name: 'Mrs. Diya Verma', email: 'diya.v@school.com', department: 'History', baseSalary: 48000, allowances: 7000, netSalary: 55000, status: 'Pending' },
  ];

  const totalSalaryAmount = mockTeacherSalaries.reduce((sum, t) => sum + t.netSalary, 0);
  const paidSalaries = mockTeacherSalaries.filter(t => t.status === 'Paid').length;
  const pendingSalaries = mockTeacherSalaries.filter(t => t.status === 'Pending').length;
  const totalAllowances = mockTeacherSalaries.reduce((sum, t) => sum + t.allowances, 0);

  return (
    <div className="flex h-screen bg-gray-50">
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
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Salary Management</h1>
                <p className="text-gray-600">Manage and track teacher salary payments</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <FinanceStatCard
                  title="Total Monthly Salary"
                  value={`₹${(totalSalaryAmount / 100000).toFixed(2)}L`}
                  change="+4.2%"
                  changeType="positive"
                  icon={Wallet}
                  bgColor="bg-blue-600"
                />
                <FinanceStatCard
                  title="Salaries Paid"
                  value={paidSalaries}
                  change={`${Math.round((paidSalaries / mockTeacherSalaries.length) * 100)}%`}
                  changeType="positive"
                  icon={TrendingUp}
                  bgColor="bg-green-600"
                />
                <FinanceStatCard
                  title="Pending Salaries"
                  value={pendingSalaries}
                  change={`${Math.round((pendingSalaries / mockTeacherSalaries.length) * 100)}%`}
                  changeType="negative"
                  icon={Calendar}
                  bgColor="bg-orange-600"
                />
                <FinanceStatCard
                  title="Total Teachers"
                  value={mockTeacherSalaries.length}
                  change="+0%"
                  changeType="positive"
                  icon={Users}
                  bgColor="bg-purple-600"
                />
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Teacher Salary Details</h2>
                <TeacherSalariesTable data={mockTeacherSalaries} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
