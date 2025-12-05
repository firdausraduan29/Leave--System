import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { LeaveRequestCard } from "@/components/LeaveRequestCard";
import { EmptyState } from "@/components/EmptyState";
import { CalendarPlus, ArrowRight } from "lucide-react";
import type { LeaveStatus } from "@/components/StatusBadge";

// todo: remove mock functionality
const mockBalances = {
  annual: { balance: 8, total: 12 },
  medical: { balance: 14, total: 14 },
  emergency: { balance: 2, total: 3 },
  unpaid: { balance: 0, total: 0 },
};

const mockRecentRequests = [
  {
    id: "1",
    leaveType: "Annual",
    startDate: new Date("2024-12-20"),
    endDate: new Date("2024-12-27"),
    totalDays: 5,
    reason: "Family vacation during Christmas holidays",
    status: "Pending" as LeaveStatus,
  },
  {
    id: "2",
    leaveType: "Medical",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-16"),
    totalDays: 2,
    reason: "Doctor's appointment and recovery",
    status: "Manager Approved" as LeaveStatus,
    hrComment: "Approved. Get well soon!",
    managerComment: "Take care.",
  },
];

export default function EmployeeDashboard() {
  const [requests] = useState(mockRecentRequests);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your leave overview.</p>
        </div>
        <Link href="/apply">
          <Button className="gap-2" data-testid="button-apply-leave">
            <CalendarPlus className="h-4 w-4" />
            Apply for Leave
          </Button>
        </Link>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Leave Balances</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LeaveBalanceCard type="Annual" balance={mockBalances.annual.balance} total={mockBalances.annual.total} />
          <LeaveBalanceCard type="Medical" balance={mockBalances.medical.balance} total={mockBalances.medical.total} />
          <LeaveBalanceCard type="Emergency" balance={mockBalances.emergency.balance} total={mockBalances.emergency.total} />
          <LeaveBalanceCard type="Maternity" balance={60} total={60} />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2 className="text-xl font-semibold">Recent Requests</h2>
          <Link href="/history">
            <Button variant="ghost" className="gap-1" data-testid="link-view-all">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {requests.length === 0 ? (
          <EmptyState
            type="no-requests"
            actionLabel="Apply for Leave"
            onAction={() => window.location.href = "/apply"}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {requests.map((request) => (
              <LeaveRequestCard
                key={request.id}
                {...request}
                onClick={() => console.log("View request:", request.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
