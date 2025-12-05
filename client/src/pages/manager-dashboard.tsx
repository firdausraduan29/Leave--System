import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ApprovalCard } from "@/components/ApprovalCard";
import { EmptyState } from "@/components/EmptyState";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";
import type { LeaveStatus } from "@/components/StatusBadge";

// todo: remove mock functionality
const mockHRApprovedRequests = [
  {
    id: "1",
    employeeName: "David Wilson",
    employeeEmail: "david.wilson@company.com",
    leaveType: "Annual Leave",
    startDate: new Date("2024-12-23"),
    endDate: new Date("2024-12-31"),
    totalDays: 7,
    reason: "Year-end vacation with family. All projects are on track and team is briefed.",
    status: "HR Approved" as LeaveStatus,
  },
  {
    id: "2",
    employeeName: "Jennifer Lee",
    employeeEmail: "jennifer.lee@company.com",
    leaveType: "Medical Leave",
    startDate: new Date("2024-12-16"),
    endDate: new Date("2024-12-18"),
    totalDays: 3,
    reason: "Post-surgery recovery. Medical certificate attached.",
    status: "HR Approved" as LeaveStatus,
  },
];

export default function ManagerDashboard() {
  const [pendingRequests, setPendingRequests] = useState(mockHRApprovedRequests);

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
        <h1 className="text-3xl font-semibold">Manager Dashboard</h1>
        <p className="text-muted-foreground mt-1">Final approval for team leave requests.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{pendingRequests.length}</p>
                <p className="text-sm text-muted-foreground">Awaiting Approval</p>
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
                <p className="text-2xl font-semibold">24</p>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
                <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">2</p>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Team Requests (HR Approved)</h2>
        {pendingRequests.length === 0 ? (
          <EmptyState type="no-approvals" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pendingRequests.map((request) => (
              <ApprovalCard
                key={request.id}
                {...request}
                role="Manager"
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
