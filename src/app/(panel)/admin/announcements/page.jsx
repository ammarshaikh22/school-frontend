'use client';

import { useState } from 'react';
import AnnouncementsList from '@/components/AnnouncementsList';
import Link from 'next/link';
import UserTopHeader from '@/components/UserTopHeader';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'School Annual Day - 2024',
      content:
        'We are excited to announce the upcoming School Annual Day celebration on 15th December 2024. It will be a grand event with cultural performances, sports activities, and food fest. All students and parents are invited to participate.',
      category: 'Event',
      audience: 'All',
      priority: 'High',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      attachments: ['event_poster.pdf', 'registration_form.docx'],
    },
    {
      id: 2,
      title: 'Summer Vacation Notice',
      content:
        'The summer vacation is from June 1st to July 15th. Classes will resume on July 16th. Please ensure your children complete their holiday assignments.',
      category: 'Holiday',
      audience: 'Students',
      priority: 'Normal',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      attachments: [],
    },
    {
      id: 3,
      title: 'Important: Building Closure for Maintenance',
      content:
        'The west wing of the school building will be closed for maintenance work from November 20-25. All classes will be held in alternate locations. Please check the notice board for detailed schedules.',
      category: 'Emergency',
      audience: 'All',
      priority: 'Urgent',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      attachments: ['maintenance_schedule.pdf'],
    },
    {
      id: 4,
      title: 'Mid-Term Examination Schedule Released',
      content:
        'The mid-term examination schedule has been released. Examinations will start from November 15th and continue till November 30th. Study materials are available in the student portal.',
      category: 'Academic',
      audience: 'Students',
      priority: 'High',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      attachments: ['exam_schedule.xlsx', 'syllabus.pdf'],
    },
    {
      id: 5,
      title: 'New Library System Implementation',
      content:
        'A new digital library management system has been implemented. Students can now access e-books and journals from their accounts. Tutorial sessions will be held every Friday.',
      category: 'Academic',
      audience: 'Students',
      priority: 'Normal',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      attachments: [],
    },
    {
      id: 6,
      title: 'Sports Day - Call for Registrations',
      content:
        'Annual Sports Day will be held on December 10th. All interested students are requested to register before November 25th. Register on the portal or contact your class teacher.',
      category: 'Event',
      audience: 'Students',
      priority: 'Normal',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      attachments: ['sports_day_rules.pdf'],
    },
  ]);

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
  };

  const handleEdit = (announcement) => {
    console.log('Edit announcement:', announcement);
  };

  const handleCreateAnnouncement = (formData) => {
    const newAnnouncement = {
      id: announcements.length + 1,
      ...formData,
      createdAt: new Date(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
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
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
                  <p className="text-gray-600">
                    Create and manage school announcements and notifications
                  </p>
                </div>
                <Link
                  href="/announcements/create"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Announcement
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <p className="text-gray-600 text-sm mb-2">Total Announcements</p>
                  <p className="text-3xl font-bold text-gray-900">{announcements.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <p className="text-gray-600 text-sm mb-2">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {announcements.filter((a) => {
                      const now = new Date();
                      return (
                        a.createdAt.getMonth() === now.getMonth() &&
                        a.createdAt.getFullYear() === now.getFullYear()
                      );
                    }).length}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <p className="text-gray-600 text-sm mb-2">Urgent</p>
                  <p className="text-3xl font-bold text-red-600">
                    {announcements.filter((a) => a.priority === 'Urgent').length}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <p className="text-gray-600 text-sm mb-2">High Priority</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {announcements.filter((a) => a.priority === 'High').length}
                  </p>
                </div>
              </div>

              {/* Announcements List */}
              <AnnouncementsList
                announcements={announcements}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
