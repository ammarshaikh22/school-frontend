'use client';

import { useState, useMemo } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { Search, Filter } from 'lucide-react';

export default function AnnouncementsList({ announcements, onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const categories = ['All', 'General', 'Academic', 'Event', 'Holiday', 'Emergency'];
  const priorities = ['All', 'Low', 'Normal', 'High', 'Urgent'];

  const filteredAndSorted = useMemo(() => {
    let filtered = announcements.filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' || announcement.category === categoryFilter;

      const matchesPriority =
        priorityFilter === 'All' || announcement.priority === priorityFilter;

      return matchesSearch && matchesCategory && matchesPriority;
    });

    // Sort
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority') {
      const priorityOrder = { Urgent: 4, High: 3, Normal: 2, Low: 1 };
      filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    return filtered;
  }, [announcements, searchTerm, categoryFilter, priorityFilter, sortBy]);

  const activeFilters =
    (searchTerm ? 1 : 0) +
    (categoryFilter !== 'All' ? 1 : 0) +
    (priorityFilter !== 'All' ? 1 : 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Announcements</h2>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {priorities.map((pri) => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{activeFilters} active filter(s)</span>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setPriorityFilter('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Announcements Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSorted.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <p className="text-lg font-medium text-gray-900">No announcements found</p>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredAndSorted.length}</span> of{' '}
          <span className="font-semibold">{announcements.length}</span> announcements
        </p>
      </div>
    </div>
  );
}
