import { LeaveRequestCard } from "../LeaveRequestCard";

export default function LeaveRequestCardExample() {
  return (
    <div className="space-y-4 max-w-lg">
      <LeaveRequestCard
        id="1"
        leaveType="Annual"
        startDate={new Date("2024-12-20")}
        endDate={new Date("2024-12-27")}
        totalDays={5}
        reason="Family vacation during Christmas holidays"
        status="Pending"
      />
      <LeaveRequestCard
        id="2"
        leaveType="Medical"
        startDate={new Date("2024-11-15")}
        endDate={new Date("2024-11-16")}
        totalDays={2}
        reason="Doctor's appointment and recovery"
        status="Manager Approved"
        hrComment="Approved. Get well soon!"
        managerComment="Take care and rest well."
      />
      <LeaveRequestCard
        id="3"
        leaveType="Emergency"
        startDate={new Date("2024-10-05")}
        endDate={new Date("2024-10-05")}
        totalDays={1}
        reason="Family emergency - urgent matter"
        status="Rejected"
        hrComment="Insufficient emergency leave balance. Please apply for unpaid leave."
      />
    </div>
  );
}
