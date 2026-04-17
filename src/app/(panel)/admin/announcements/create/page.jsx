"use client";
import { useState } from "react";
import AnnouncementForm from "@/components/AnnouncementForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UserTopHeader from "@/components/UserTopHeader";

export default function CreateAnnouncementPage() {
  const [successNotification, setSuccessNotification] = useState(false);

  const handleAnnouncementSubmit = (formData) => {
    console.log("Announcement submitted:", formData);
    setSuccessNotification(true);
    setTimeout(() => setSuccessNotification(false), 5000);
  };

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
              {/* Success Notification */}
              {successNotification && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Announcement created successfully! Redirecting...
                  </p>
                </div>
              )}

              {/* Back Link */}
              <Link
                href="/announcements"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Announcements
              </Link>

              {/* Page Title */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create New Announcement
                </h1>
                <p className="text-gray-600">
                  Create and publish announcements to inform students, teachers,
                  and parents
                </p>
              </div>

              {/* Form */}
              <AnnouncementForm onSubmit={handleAnnouncementSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
