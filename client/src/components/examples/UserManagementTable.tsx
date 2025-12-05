import { UserManagementTable } from "../UserManagementTable";

const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Employee" as const,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "HR" as const,
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Manager" as const,
    createdAt: new Date("2022-03-20"),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Admin" as const,
    createdAt: new Date("2021-01-10"),
  },
];

export default function UserManagementTableExample() {
  return (
    <UserManagementTable
      users={mockUsers}
      onRoleChange={(id, role) => console.log("Role changed:", id, role)}
      onDelete={(id) => console.log("Deleted:", id)}
    />
  );
}
