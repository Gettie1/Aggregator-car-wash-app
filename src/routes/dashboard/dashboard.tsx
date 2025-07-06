import { Outlet, createFileRoute } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
// import { useAuth } from '@/hooks/useAuth'; // custom context hook
import Sidebar from '@/components/Sidebar'; // Sidebar component
import { Header } from '@/components/Header';
import { authStore } from '@/store/authStore';

type DashboardRouteContext = {
  queryClient: QueryClient;
  auth?: {
    user?: {
      role?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
};

export const Route = createFileRoute('/dashboard/dashboard')<DashboardRouteContext>({
  beforeLoad: () => {
    const isverified = authStore.state.isVerified;
    if (!isverified) {
      return { redirect: '/signin' }; // Redirect to signin if not verified
    }
    const user = authStore.state.user as { role?: string } | undefined; // Ensure user has a role property
    const allowedRoles = ['admin', 'vendor', 'customer']; // Define allowed roles
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      // Redirect to unauthorized page if user role is not allowed
      return { redirect: '/signin' };
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  // const { user } = useAuth(); // Must include `role` in user object

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

