'use client';

import AdminSidebar from '@/components/AdminSidebar';
import StatCard from '@/components/StatCard';
import StudentGrowthChart from '@/components/StudentGrowthChart';
import FeeCollectionChart from '@/components/FeeCollectionChart';
import RecentActivityTable from '@/components/RecentActivityTable';
import QuickActions from '@/components/QuickActions';
import { Bell, Search, Settings, LogOut, ChevronDown, Users, BookOpen, GraduationCap, Clock } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here&apos;s your institution overview</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Users"
                  value="2,845"
                  change="+12.5%"
                  changeType="positive"
                  icon={Users}
                  bgColor="bg-blue-600"
                />
                <StatCard
                  title="Teachers"
                  value="156"
                  change="+8.2%"
                  changeType="positive"
                  icon={BookOpen}
                  bgColor="bg-purple-600"
                />
                <StatCard
                  title="Students"
                  value="2,689"
                  change="+15.3%"
                  changeType="positive"
                  icon={GraduationCap}
                  bgColor="bg-green-600"
                />
                <StatCard
                  title="Pending Requests"
                  value="23"
                  change="+4.1%"
                  changeType="positive"
                  icon={Clock}
                  bgColor="bg-orange-600"
                />
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <QuickActions />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <StudentGrowthChart />
                <FeeCollectionChart />
              </div>

              {/* Recent Activity */}
              <div className="mb-8">
                <RecentActivityTable />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
