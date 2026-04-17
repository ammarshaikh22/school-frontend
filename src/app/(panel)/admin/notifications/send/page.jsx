import SendNotificationForm from "@/components/SendNotificationForm";
import UserTopHeader from "@/components/UserTopHeader";

export default function SendNotification() {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Notification
                </h1>
                <p className="text-gray-600">
                  Create and send notifications to students, teachers, and
                  parents
                </p>
              </div>

              {/* Form */}
              <SendNotificationForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
