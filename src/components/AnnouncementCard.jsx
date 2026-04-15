'use client';

import { Trash2, Edit2, Calendar, Users, AlertCircle, Paperclip } from 'lucide-react';

export default function AnnouncementCard({ announcement, onDelete, onEdit }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic':
        return 'bg-purple-100 text-purple-800';
      case 'Event':
        return 'bg-green-100 text-green-800';
      case 'Holiday':
        return 'bg-pink-100 text-pink-800';
      case 'Emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'Urgent' || priority === 'High') {
      return <AlertCircle className="w-4 h-4" />;
    }
    return null;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
            {getPriorityIcon(announcement.priority) && (
              <div className={`p-1 rounded-full ${getPriorityColor(announcement.priority)}`}>
                {getPriorityIcon(announcement.priority)}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                announcement.category
              )}`}
            >
              {announcement.category}
            </span>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                announcement.priority
              )}`}
            >
              {announcement.priority}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 line-clamp-3">{announcement.content}</p>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4 text-blue-600" />
          <span>{announcement.audience}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formatDate(announcement.createdAt)}</span>
        </div>
      </div>

      {/* Attachments */}
      {announcement.attachments && announcement.attachments.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Paperclip className="w-4 h-4" />
          <span>{announcement.attachments.length} attachment(s)</span>
        </div>
      )}
    </div>
  );
}
