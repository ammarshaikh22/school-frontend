'use client';

import { useState, useMemo } from 'react';
import { Search, Trash2, Eye, Filter, X } from 'lucide-react';

export default function NotificationHistory() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const mockNotifications = [
    {
      id: 1,
      title: 'Important: Final Exam Schedule Released',
      message: 'The final exam schedule for all classes has been released. Please check the notification board.',
      type: 'important',
      recipient: 'All Users',
      status: 'sent',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      views: 342,
      clicks: 45,
    },
    {
      id: 2,
      title: 'School Holiday Announcement',
      message: 'School will remain closed on Monday and Tuesday for the annual sports meet.',
      type: 'general',
      recipient: 'All Students',
      status: 'sent',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      views: 256,
      clicks: 28,
    },
    {
      id: 3,
      title: 'Urgent: Fee Submission Deadline',
      message: 'Please submit your fees by end of this month. Late submission will attract additional charges.',
      type: 'urgent',
      recipient: 'Students',
      status: 'sent',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      views: 189,
      clicks: 62,
    },
    {
      id: 4,
      title: 'Reminder: Parent-Teacher Meeting',
      message: 'Parent-Teacher meeting scheduled for Saturday. Please confirm your attendance.',
      type: 'reminder',
      recipient: 'Parents',
      status: 'sent',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      views: 124,
      clicks: 34,
    },
    {
      id: 5,
      title: 'Event: Science Fair 2024',
      message: 'Our annual Science Fair will be held next month. Register your projects now!',
      type: 'event',
      recipient: 'All Users',
      status: 'sent',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      views: 445,
      clicks: 156,
    },
    {
      id: 6,
      title: 'Class Schedule Updated',
      message: 'The class schedule has been updated. Please check your class timings.',
      type: 'general',
      recipient: 'All Users',
      status: 'sent',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      views: 378,
      clicks: 89,
    },
    {
      id: 7,
      title: 'Library Books Return Deadline',
      message: 'Please return all library books by the end of this week.',
      type: 'reminder',
      recipient: 'Students',
      status: 'sent',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      views: 212,
      clicks: 41,
    },
    {
      id: 8,
      title: 'New Online Learning Platform',
      message: 'We have launched a new online learning platform. Please login and explore.',
      type: 'general',
      recipient: 'Teachers, Students',
      status: 'sent',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      views: 523,
      clicks: 198,
    },
  ];

  const filteredNotifications = useMemo(() => {
    let filtered = mockNotifications;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(search.toLowerCase()) ||
          notification.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((notification) => notification.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((notification) => notification.status === statusFilter);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.date - a.date);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.date - b.date);
    } else if (sortBy === 'mostViewed') {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [search, typeFilter, statusFilter, sortBy]);

  const getTypeColor = (type) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      important: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
      event: 'bg-purple-100 text-purple-800',
      reminder: 'bg-blue-100 text-blue-800',
    };
    return colors[type] || colors.general;
  };

  const getTypeIcon = (type) => {
    const icons = {
      general: '📢',
      important: '⚠️',
      urgent: '🚨',
      event: '🎉',
      reminder: '🔔',
    };
    return icons[type] || '📢';
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const activeFilters = [typeFilter !== 'all', statusFilter !== 'all'].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Notification History</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="general">General</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
              <option value="event">Event</option>
              <option value="reminder">Reminder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostViewed">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {activeFilters} filter{activeFilters !== 1 ? 's' : ''} applied
            </span>
            <button
              onClick={() => {
                setTypeFilter('all');
                setStatusFilter('all');
              }}
              className="ml-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="text-sm text-gray-600">
        Showing {filteredNotifications.length} of {mockNotifications.length} notifications
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{getTypeIcon(notification.type)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-gray-600 mb-3 line-clamp-2">{notification.message}</p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>Sent to: {notification.recipient}</span>
                    <span>•</span>
                    <span>{formatDate(notification.date)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {notification.views} views
                    </span>
                    <span>•</span>
                    <span>{notification.clicks} clicks</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
