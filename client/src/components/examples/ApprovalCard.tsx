import { ApprovalCard } from "../ApprovalCard";

export default function ApprovalCardExample() {
  return (
    <div className="max-w-xl">
      <ApprovalCard
        id="1"
        employeeName="Sarah Johnson"
        employeeEmail="sarah.johnson@company.com"
        leaveType="Annual Leave"
        startDate={new Date("2024-12-20")}
        endDate={new Date("2024-12-27")}
        totalDays={5}
        reason="Taking a family vacation during the Christmas holidays. Will ensure all pending tasks are completed or handed over before leaving."
        status="Pending"
        role="HR"
        onApprove={(id, comment) => console.log("Approved:", id, comment)}
        onReject={(id, comment) => console.log("Rejected:", id, comment)}
      />
    </div>
  );
}
