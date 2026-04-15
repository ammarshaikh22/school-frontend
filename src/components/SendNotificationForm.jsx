'use client';

import { useState } from 'react';
import { Send, Plus, X, CheckCircle } from 'lucide-react';

export default function SendNotificationForm() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general',
    recipient: 'all',
    sendToClass: '',
    sendToRole: '',
  });

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [success, setSuccess] = useState(false);

  const mockUsers = [
    { id: 1, name: 'John Doe', role: 'Student', class: '10-A' },
    { id: 2, name: 'Jane Smith', role: 'Teacher', class: 'N/A' },
    { id: 3, name: 'Michael Brown', role: 'Student', class: '10-B' },
    { id: 4, name: 'Sarah Johnson', role: 'Student', class: '10-A' },
    { id: 5, name: 'David Wilson', role: 'Teacher', class: 'N/A' },
    { id: 6, name: 'Emily Davis', role: 'Parent', class: 'N/A' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.message) {
      setSuccess(true);
      setFormData({
        title: '',
        message: '',
        type: 'general',
        recipient: 'all',
        sendToClass: '',
        sendToRole: '',
      });
      setSelectedUsers([]);
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const getRecipientCount = () => {
    if (formData.recipient === 'all') return 'All Users';
    if (formData.recipient === 'role') return `All ${formData.sendToRole}s`;
    if (formData.recipient === 'class') return `Class ${formData.sendToClass}`;
    if (formData.recipient === 'specific') return `${selectedUsers.length} Selected Users`;
    return '0 Users';
  };

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg z-50">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Notification Sent Successfully!</p>
            <p className="text-sm text-green-700">Your notification has been sent to {getRecipientCount()}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Notification</h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notification title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your notification message..."
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
              <option value="event">Event</option>
              <option value="reminder">Reminder</option>
            </select>
          </div>

          {/* Recipient Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send To
            </label>
            <select
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              <option value="role">By Role</option>
              <option value="class">By Class</option>
              <option value="specific">Specific Users</option>
            </select>
          </div>
        </div>

        {/* Conditional Fields */}
        {formData.recipient === 'role' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              name="sendToRole"
              value={formData.sendToRole}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}

        {formData.recipient === 'class' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              name="sendToClass"
              value={formData.sendToClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a class</option>
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="11-A">11-A</option>
              <option value="12-A">12-A</option>
            </select>
          </div>
        )}

        {/* Specific Users Selection */}
        {formData.recipient === 'specific' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Users ({selectedUsers.length} selected)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              {mockUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.role} {user.class !== 'N/A' && `- ${user.class}`}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Recipient Summary */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Recipients:</span> {getRecipientCount()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </button>
          <button
            type="reset"
            onClick={() => {
              setFormData({
                title: '',
                message: '',
                type: 'general',
                recipient: 'all',
                sendToClass: '',
                sendToRole: '',
              });
              setSelectedUsers([]);
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
