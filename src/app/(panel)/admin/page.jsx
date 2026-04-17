import StatCard from '@/components/StatCard';
import StudentGrowthChart from '@/components/StudentGrowthChart';
import FeeCollectionChart from '@/components/FeeCollectionChart';
import RecentActivityTable from '@/components/RecentActivityTable';
import QuickActions from '@/components/QuickActions';
import {  Users, BookOpen, GraduationCap, Clock } from 'lucide-react';
import UserTopHeader from '@/components/UserTopHeader';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col lg:ml-0">
        <UserTopHeader />
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
