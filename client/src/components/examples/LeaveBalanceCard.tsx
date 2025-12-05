import { LeaveBalanceCard } from "../LeaveBalanceCard";

export default function LeaveBalanceCardExample() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <LeaveBalanceCard type="Annual" balance={8} total={12} />
      <LeaveBalanceCard type="Medical" balance={14} total={14} />
      <LeaveBalanceCard type="Emergency" balance={2} total={3} />
      <LeaveBalanceCard type="Unpaid" balance={0} total={0} />
    </div>
  );
}
