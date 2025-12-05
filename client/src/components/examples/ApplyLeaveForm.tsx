import { ApplyLeaveForm } from "../ApplyLeaveForm";

export default function ApplyLeaveFormExample() {
  return (
    <ApplyLeaveForm
      onSubmit={(data) => console.log("Form submitted:", data)}
      onCancel={() => console.log("Cancelled")}
    />
  );
}
