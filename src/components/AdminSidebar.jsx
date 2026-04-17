'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  Calendar,
  FileText,
  DollarSign,
  Megaphone,
  Bell,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

const AdminSidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
    },
     {
      id: 'users',
      label: 'User Management',
      icon: Users,
      href: '/admin/users',
      submenu: [
        { label: 'Pending Requests', href: '/admin/users?filter=pending' },
        { label: 'All Users', href: '/admin/users?filter=all' },
        { label: 'Teachers', href: '/admin/users?filter=teachers' },
        { label: 'Students', href: '/admin/users?filter=students' },
      ],
    },
    {
      id: 'classes',
      label: 'Classes Management',
      icon: BookOpen,
      href: '/admin/classes',
      submenu: [
        { label: 'All Classes', href: '/admin/classes' },
        { label: 'Assign Teacher', href: '/admin/classes/assign' },
      ],
    },
    {
      id: 'subjects',
      label: 'Subjects',
      icon: Layers,
      href: '/admin/subjects',
      submenu: [
        { label: 'All Subjects', href: '/admin/subjects' },
        { label: 'Assign Subjects', href: '/admin/subjects/assign' },
      ],
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Calendar,
      href: '/admin/attendance',
      submenu: [
        { label: 'Student Attendance', href: '/admin/attendance/students' },
        { label: 'Teacher Attendance', href: '/admin/attendance/teachers' },
      ],
    },
    {
      id: 'exams',
      label: 'Exams / Results',
      icon: FileText,
      href: '#',
      submenu: [
        { label: 'Create Exam', href: '/admin/exams/create' },
        { label: 'Results', href: '/admin/exams/results' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      href: '/admin/finance',
      submenu: [
        { label: 'Student Fees', href: '/admin/finance/fees' },
        { label: 'Teacher Salary', href: '/admin/finance/salary' },
      ],
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Megaphone,
      href: '/admin/announcements',
      submenu: [
        { label: 'All Announcements', href: '/admin/announcements' },
        { label: 'Create Announcement', href: '/admin/announcements/create' },
      ],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      href: '/admin/notifications',
      submenu: [
        { label: 'Send Notification', href: '/admin/notifications/send' },
        { label: 'History', href: '/admin/notifications/history' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      submenu: [
        { label: 'School Info', href: '/admin/settings/school' },
        { label: 'Profile Settings', href: '/admin/settings/profile' },
      ],
    },
  ];

  return (
    <header>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 lg:hidden rounded-lg hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">
            <span className="text-gray-800">LOREM</span>
            <span className="bg-orange-500 text-white px-2 py-1 rounded ml-2 inline-block text-lg font-bold">
              IPSUM
            </span>
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isExpanded = expandedMenus[item.id];
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleMenu(item.id);
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                    <Link href={item.href} className="font-medium text-sm text-start">
                      {item.label}
                    </Link>
                  </div>
                  {hasSubmenu && (
                    <div
                      className={`transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-0">
                    {item.submenu.map((subitem, idx) => (
                      <a
                        key={idx}
                        href={subitem.href}
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                      >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </header>
  );
};

export default AdminSidebar;
