import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, Settings, User } from 'lucide-react'
import type { Role } from '@/types/auth'
import { authStore } from '@/store/authStore'
import { checkRole } from '@/lib/roles'

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 🧠 Optional: Close sidebar on route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true) // Always open on desktop
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeRoute = useRouterState({ select: (s) => s.location.pathname })
  const { user } = authStore.state
  const userRole = user.role as Role
  const navs = checkRole(userRole)

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 ${
      activeRoute === path ? 'bg-gray-300 font-semibold' : ''
    }`

  return (
    <aside className="md:w-64 bg-white border-r shadow-md md:block">
      {/* Mobile toggle button */}
      <div className="md:hidden p-2 border-b flex justify-between items-center">
        {/* <h2 className="text-lg font-bold">Menu</h2> */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar content */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block p-4 space-y-2`}>
        {navs.map((nav) => (
          <div key={nav.label} className="space-y-2">
            <h3 className="text-lg font-semibold">{nav.label}</h3>
            {nav.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkClass(link.to)}
                onClick={() => setSidebarOpen(false)} // ✅ Close sidebar on click (mobile)
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </div>
        ))}

        {/* Always shown to all users */}
        <Link to="/dashboard/dashboard/profile" className={linkClass('/dashboard/dashboard/profile')}>
          <User className="h-5 w-5" />
          Profile
        </Link>
        <Link to="/dashboard/dashboard/settings" className={linkClass('/dashboard/dashboard/settings')}>
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  )
}

export default DashboardSidebar
