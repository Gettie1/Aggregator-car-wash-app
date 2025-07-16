import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// import Navbar from '../components/Navbar.tsx'
import { useEffect } from 'react'
import { authActions } from '../store/authStore'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'
import ToasterProvider from '@/components/ToasterProvider.tsx'
// import DashboardSidebar from '@/components/Sidebar.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    useEffect(() => {
      authActions.initializeUser()
    }, [])
    return (
      <>
      <ToasterProvider/>
        {/* <Navbar/> */}
        <Outlet />
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </>
    )
  },
})
