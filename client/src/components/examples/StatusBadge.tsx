import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="Pending" />
      <StatusBadge status="HR Approved" />
      <StatusBadge status="Manager Approved" />
      <StatusBadge status="Rejected" />
    </div>
  );
}
