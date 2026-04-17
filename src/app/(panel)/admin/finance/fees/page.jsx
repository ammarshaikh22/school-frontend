"use client";
import StudentFeesTable from "@/components/StudentFeesTable";
import FinanceStatCard from "@/components/FinanceStatCard";
import { CreditCard, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import UserTopHeader from "@/components/UserTopHeader";

export default function StudentFees() {
  const mockStudentFees = [
    {
      name: "Aarav Sharma",
      email: "aarav@school.com",
      class: "10-A",
      totalFee: 50000,
      paid: 50000,
      status: "Paid",
    },
    {
      name: "Priya Gupta",
      email: "priya@school.com",
      class: "10-B",
      totalFee: 50000,
      paid: 35000,
      status: "Partial",
    },
    {
      name: "Rajesh Kumar",
      email: "rajesh@school.com",
      class: "10-A",
      totalFee: 50000,
      paid: 0,
      status: "Pending",
    },
    {
      name: "Neha Singh",
      email: "neha@school.com",
      class: "9-A",
      totalFee: 45000,
      paid: 45000,
      status: "Paid",
    },
    {
      name: "Vikram Patel",
      email: "vikram@school.com",
      class: "9-B",
      totalFee: 45000,
      paid: 25000,
      status: "Overdue",
    },
    {
      name: "Sakshi Desai",
      email: "sakshi@school.com",
      class: "10-C",
      totalFee: 50000,
      paid: 50000,
      status: "Paid",
    },
    {
      name: "Arjun Nair",
      email: "arjun@school.com",
      class: "11-A",
      totalFee: 55000,
      paid: 55000,
      status: "Paid",
    },
    {
      name: "Diya Verma",
      email: "diya@school.com",
      class: "11-B",
      totalFee: 55000,
      paid: 0,
      status: "Pending",
    },
    {
      name: "Karan Bhat",
      email: "karan@school.com",
      class: "9-C",
      totalFee: 45000,
      paid: 30000,
      status: "Partial",
    },
    {
      name: "Anjali Reddy",
      email: "anjali@school.com",
      class: "10-B",
      totalFee: 50000,
      paid: 20000,
      status: "Overdue",
    },
  ];

  const totalFeeAmount = mockStudentFees.reduce(
    (sum, s) => sum + s.totalFee,
    0,
  );
  const totalPaid = mockStudentFees.reduce((sum, s) => sum + s.paid, 0);
  const totalPending = totalFeeAmount - totalPaid;
  const paidPercentage = Math.round((totalPaid / totalFeeAmount) * 100);

  return (
    <div className="flex h-screen bg-gray-50">
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
                  Student Fees Management
                </h1>
                <p className="text-gray-600">
                  Track and manage student fee payments
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <FinanceStatCard
                  title="Total Fee Amount"
                  value={`₹${(totalFeeAmount / 100000).toFixed(1)}L`}
                  change="+8.5%"
                  changeType="positive"
                  icon={CreditCard}
                  bgColor="bg-blue-600"
                />
                <FinanceStatCard
                  title="Amount Collected"
                  value={`₹${(totalPaid / 100000).toFixed(1)}L`}
                  change="+12.3%"
                  changeType="positive"
                  icon={CheckCircle}
                  bgColor="bg-green-600"
                />
                <FinanceStatCard
                  title="Pending Amount"
                  value={`₹${(totalPending / 100000).toFixed(1)}L`}
                  change="-5.2%"
                  changeType="negative"
                  icon={AlertCircle}
                  bgColor="bg-orange-600"
                />
                <FinanceStatCard
                  title="Collection Rate"
                  value={`${paidPercentage}%`}
                  change="+2.1%"
                  changeType="positive"
                  icon={TrendingUp}
                  bgColor="bg-purple-600"
                />
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Student Fee Details
                </h2>
                <StudentFeesTable data={mockStudentFees} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
