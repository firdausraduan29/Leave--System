import { EmptyState } from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="space-y-4 max-w-lg">
      <EmptyState
        type="no-requests"
        actionLabel="Apply for Leave"
        onAction={() => console.log("Apply clicked")}
      />
    </div>
  );
}
