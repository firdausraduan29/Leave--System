import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApprovalCard } from "@/components/ApprovalCard";
import { EmptyState } from "@/components/EmptyState";
import { ClipboardCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import type { LeaveStatus } from "@/components/StatusBadge";

// todo: remove mock functionality
const mockPendingRequests = [
  {
    id: "1",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    leaveType: "Annual Leave",
    startDate: new Date("2024-12-20"),
    endDate: new Date("2024-12-27"),
    totalDays: 5,
    reason: "Taking a family vacation during the Christmas holidays. Will ensure all pending tasks are completed or handed over.",
    status: "Pending" as LeaveStatus,
  },
  {
    id: "2",
    employeeName: "Michael Chen",
    employeeEmail: "michael.chen@company.com",
    leaveType: "Medical Leave",
    startDate: new Date("2024-12-18"),
    endDate: new Date("2024-12-19"),
    totalDays: 2,
    reason: "Scheduled dental surgery and recovery time needed.",
    status: "Pending" as LeaveStatus,
  },
  {
    id: "3",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    leaveType: "Emergency Leave",
    startDate: new Date("2024-12-15"),
    endDate: new Date("2024-12-15"),
    totalDays: 1,
    reason: "Urgent family matter requiring immediate attention.",
    status: "Pending" as LeaveStatus,
  },
];

export default function HRDashboard() {
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);

  const handleApprove = (id: string, comment: string) => {
    // todo: remove mock functionality
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    console.log("Approved:", id, comment);
  };

  const handleReject = (id: string, comment: string) => {
    // todo: remove mock functionality
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    console.log("Rejected:", id, comment);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">HR Dashboard</h1>
        <p className="text-muted-foreground mt-1">Review and approve employee leave requests.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{pendingRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">12</p>
                <p className="text-sm text-muted-foreground">Awaiting Manager</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">48</p>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">3</p>
                <p className="text-sm text-muted-foreground">Rejected This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
        {pendingRequests.length === 0 ? (
          <EmptyState type="no-approvals" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pendingRequests.map((request) => (
              <ApprovalCard
                key={request.id}
                {...request}
                role="HR"
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
