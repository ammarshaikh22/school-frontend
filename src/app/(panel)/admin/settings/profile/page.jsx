import ProfileSettingsForm from '@/components/ProfileSettingsForm';
import UserTopHeader from '@/components/UserTopHeader';

export default function ProfileSettings() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
       <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                <a href="/" className="hover:text-blue-600">Dashboard</a>
                <span>/</span>
                <a href="/settings" className="hover:text-blue-600">Settings</a>
                <span>/</span>
                <span className="text-gray-900 font-medium">Profile Settings</span>
              </div>

              <ProfileSettingsForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
