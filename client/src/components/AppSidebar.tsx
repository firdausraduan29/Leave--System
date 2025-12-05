import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarPlus,
  History,
  ClipboardCheck,
  Users,
  Settings,
  Calendar,
} from "lucide-react";

type UserRole = "Employee" | "HR" | "Manager" | "Admin";

interface AppSidebarProps {
  role: UserRole;
}

const employeeMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Apply Leave", url: "/apply", icon: CalendarPlus },
  { title: "My Requests", url: "/history", icon: History },
];

const hrMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Pending Approvals", url: "/approvals", icon: ClipboardCheck },
  { title: "All Requests", url: "/requests", icon: History },
];

const managerMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Team Requests", url: "/approvals", icon: ClipboardCheck },
  { title: "Team Calendar", url: "/calendar", icon: Calendar },
];

const adminMenu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "All Requests", url: "/requests", icon: History },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar({ role }: AppSidebarProps) {
  const [location] = useLocation();

  const getMenuItems = () => {
    switch (role) {
      case "HR":
        return hrMenu;
      case "Manager":
        return managerMenu;
      case "Admin":
        return adminMenu;
      default:
        return employeeMenu;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">LeaveFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                  >
                    <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(" ", "-")}`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
          <div className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">
            Logged in as <span className="font-medium text-foreground">{role}</span>
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
