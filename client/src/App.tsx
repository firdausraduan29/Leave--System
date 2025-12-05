import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/AppSidebar";
import { UserDropdown } from "@/components/UserDropdown";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LoginPage from "@/pages/login";
import EmployeeDashboard from "@/pages/employee-dashboard";
import ApplyLeavePage from "@/pages/apply-leave";
import LeaveHistoryPage from "@/pages/leave-history";
import HRDashboard from "@/pages/hr-dashboard";
import ManagerDashboard from "@/pages/manager-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

type UserRole = "Employee" | "HR" | "Manager" | "Admin";

// todo: remove mock functionality
const mockUser = {
  name: "John Smith",
  email: "john.smith@company.com",
  role: "Employee" as UserRole,
};

function AppLayout({ children, role, onRoleChange }: { 
  children: React.ReactNode; 
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/login");
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={role} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center justify-between gap-4 border-b px-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              {/* Role switcher for demo purposes - todo: remove mock functionality */}
              <Select value={role} onValueChange={(v) => onRoleChange(v as UserRole)}>
                <SelectTrigger className="w-32" data-testid="select-demo-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <ThemeToggle />
              <UserDropdown
                name={mockUser.name}
                email={mockUser.email}
                role={role}
                onLogout={handleLogout}
                onSettings={() => console.log("Settings")}
                onProfile={() => console.log("Profile")}
              />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AuthenticatedRoutes({ role, onRoleChange }: { role: UserRole; onRoleChange: (role: UserRole) => void }) {
  const getDashboard = () => {
    switch (role) {
      case "HR":
        return <HRDashboard />;
      case "Manager":
        return <ManagerDashboard />;
      case "Admin":
        return <AdminDashboard />;
      default:
        return <EmployeeDashboard />;
    }
  };

  return (
    <AppLayout role={role} onRoleChange={onRoleChange}>
      <Switch>
        <Route path="/" component={() => getDashboard()} />
        <Route path="/apply" component={ApplyLeavePage} />
        <Route path="/history" component={LeaveHistoryPage} />
        <Route path="/approvals" component={() => role === "HR" ? <HRDashboard /> : <ManagerDashboard />} />
        <Route path="/requests" component={LeaveHistoryPage} />
        <Route path="/users" component={AdminDashboard} />
        <Route path="/calendar" component={() => <div className="text-muted-foreground">Calendar view coming soon...</div>} />
        <Route path="/settings" component={() => <div className="text-muted-foreground">Settings coming soon...</div>} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // todo: remove mock - start as true for demo
  const [role, setRole] = useState<UserRole>("Employee");
  const [location] = useLocation();

  const handleLogin = (userRole: string) => {
    setRole(userRole as UserRole);
    setIsAuthenticated(true);
  };

  // Show login page if not authenticated or on login route
  if (!isAuthenticated || location === "/login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AuthenticatedRoutes role={role} onRoleChange={setRole} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
