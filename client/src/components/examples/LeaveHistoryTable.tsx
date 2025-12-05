import { LeaveHistoryTable } from "../LeaveHistoryTable";

const mockRecords = [
  {
    id: "1",
    leaveType: "Annual",
    startDate: new Date("2024-12-20"),
    endDate: new Date("2024-12-27"),
    totalDays: 5,
    reason: "Family vacation during holidays",
    status: "Pending" as const,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    leaveType: "Medical",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-16"),
    totalDays: 2,
    reason: "Doctor's appointment",
    status: "Manager Approved" as const,
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "3",
    leaveType: "Emergency",
    startDate: new Date("2024-10-05"),
    endDate: new Date("2024-10-05"),
    totalDays: 1,
    reason: "Family emergency",
    status: "Rejected" as const,
    createdAt: new Date("2024-10-04"),
  },
];

export default function LeaveHistoryTableExample() {
  return (
    <LeaveHistoryTable
      records={mockRecords}
      onRowClick={(record) => console.log("Clicked:", record)}
    />
  );
}
