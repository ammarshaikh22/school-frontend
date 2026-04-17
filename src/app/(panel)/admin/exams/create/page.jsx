import CreateExamForm from "@/components/CreateExamForm";
import ExamsList from "@/components/ExamsList";
import UserTopHeader from "@/components/UserTopHeader";

export default function CreateExamPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <UserTopHeader />
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Exam
                </h1>
                <p className="text-gray-600">
                  Create new exams and manage assessments for your institution
                </p>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Form Column */}
                <div className="lg:col-span-1">
                  <CreateExamForm />
                </div>

                {/* List Column */}
                <div className="lg:col-span-2">
                  <ExamsList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
