import { Plus, Users, FileText, CreditCard, Calendar, Mail } from 'lucide-react';

const actions = [
  {
    id: 1,
    title: 'Add Student',
    description: 'Register new student',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'Create Class',
    description: 'Setup new class',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 3,
    title: 'Collect Fees',
    description: 'Process fee payment',
    icon: CreditCard,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 4,
    title: 'Schedule Event',
    description: 'Create event',
    icon: Calendar,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 5,
    title: 'Send Message',
    description: 'Notify students',
    icon: Mail,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 6,
    title: 'View Reports',
    description: 'Generate reports',
    icon: FileText,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600">Common tasks at your fingertips</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className={`${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
