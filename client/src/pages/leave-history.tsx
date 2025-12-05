import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveHistoryTable, type LeaveRecord } from "@/components/LeaveHistoryTable";
import { EmptyState } from "@/components/EmptyState";
import { Search } from "lucide-react";
import type { LeaveStatus } from "@/components/StatusBadge";

// todo: remove mock functionality
const mockRecords: LeaveRecord[] = [
  {
    id: "1",
    leaveType: "Annual",
    startDate: new Date("2024-12-20"),
    endDate: new Date("2024-12-27"),
    totalDays: 5,
    reason: "Family vacation during holidays",
    status: "Pending",
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    leaveType: "Medical",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-16"),
    totalDays: 2,
    reason: "Doctor's appointment",
    status: "Manager Approved",
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "3",
    leaveType: "Emergency",
    startDate: new Date("2024-10-05"),
    endDate: new Date("2024-10-05"),
    totalDays: 1,
    reason: "Family emergency",
    status: "Rejected",
    createdAt: new Date("2024-10-04"),
  },
  {
    id: "4",
    leaveType: "Annual",
    startDate: new Date("2024-08-12"),
    endDate: new Date("2024-08-16"),
    totalDays: 5,
    reason: "Summer vacation",
    status: "Manager Approved",
    createdAt: new Date("2024-07-25"),
  },
];

export default function LeaveHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [records] = useState<LeaveRecord[]>(mockRecords);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      record.reason.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Leave History</h1>
        <p className="text-muted-foreground mt-1">View all your past and current leave requests.</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by type or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-status-filter">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="HR Approved">HR Approved</SelectItem>
            <SelectItem value="Manager Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRecords.length === 0 ? (
        <EmptyState type="no-results" />
      ) : (
        <LeaveHistoryTable
          records={filteredRecords}
          onRowClick={(record) => console.log("View details:", record.id)}
        />
      )}
    </div>
  );
}
