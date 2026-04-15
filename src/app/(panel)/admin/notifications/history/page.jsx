'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import NotificationHistory from '@/components/NotificationHistory';
import { Bell, Search, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function NotificationHistoryPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 w-full">

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
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification History</h1>
                <p className="text-gray-600">
                  View all notifications sent and their engagement metrics
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm mb-2">Total Sent</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                  <p className="text-blue-600 text-sm mt-2">100% Delivered</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm mb-2">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">2,469</p>
                  <p className="text-green-600 text-sm mt-2">Average 308.6</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm mb-2">Total Clicks</p>
                  <p className="text-3xl font-bold text-gray-900">753</p>
                  <p className="text-blue-600 text-sm mt-2">30.5% Click Rate</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm mb-2">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                  <p className="text-purple-600 text-sm mt-2">62.5% of Total</p>
                </div>
              </div>

              {/* History List */}
              <NotificationHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
