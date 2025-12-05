import LoginPage from "@/pages/login";
import { ThemeProvider } from "@/lib/theme-context";

export default function LoginPageExample() {
  return (
    <ThemeProvider>
      <LoginPage onLogin={(role) => console.log("Logged in as:", role)} />
    </ThemeProvider>
  );
}
