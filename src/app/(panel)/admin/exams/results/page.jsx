import ResultsTable from "@/components/ResultsTable";
import UserTopHeader from "@/components/UserTopHeader";

export default function ResultsPage() {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Exam Results
                </h1>
                <p className="text-gray-600">
                  View and analyze exam results for all students across the
                  institution
                </p>
              </div>

              {/* Results Content */}
              <ResultsTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
