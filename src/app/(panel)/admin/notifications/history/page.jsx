import NotificationHistory from "@/components/NotificationHistory";
import UserTopHeader from "@/components/UserTopHeader";

export default function NotificationHistoryPage() {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Notification History
                </h1>
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
