import { UserDropdown } from "../UserDropdown";

export default function UserDropdownExample() {
  return (
    <UserDropdown
      name="John Smith"
      email="john.smith@company.com"
      role="Employee"
      onLogout={() => console.log("Logout clicked")}
      onSettings={() => console.log("Settings clicked")}
      onProfile={() => console.log("Profile clicked")}
    />
  );
}
