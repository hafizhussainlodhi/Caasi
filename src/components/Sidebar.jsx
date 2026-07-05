import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import {
  Activity,
  FileText,
  BarChart2,
  CalendarDays,
  Settings2,
  LayoutDashboard,
  Users,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'User', icon: Users, to: '/user' },
  { label: 'Expense Report', icon: FileText, to: '/expense-report' },
  { label: 'Activity Report', icon: Activity, to: '/activity-report' },
  { label: 'Advanced Settings and Management', icon: Settings2, to: '/settings' },
  { label: 'Reports and Export', icon: BarChart2, to: '/reports' },
  { label: 'Days of Absence', icon: CalendarDays, to: '/absence' },
]

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-64 lg:border-r lg:border-b-0 lg:px-4 lg:py-8 bg-white">
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="Caasi logo" className="w-28 h-20 object-contain ml-2" />
          </div>

          <div className="w-full">
            <nav className="space-y-4 text-sm pl-2">
              {navItems.map((item) => {
                const active = isActive(item.to)
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors ${
                      active ? 'text-[#0b73d8] font-medium' : 'text-slate-600 hover:text-[#0b73d8]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'text-[#0b73d8]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600 w-full text-center">
            <p className="font-semibold text-slate-900">Activity summary</p>
            <p className="mt-2">Track expense and absence reports in one place.</p>
          </div>
        </div>
      </aside>

      {/* Mobile panel */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />

        <aside
          className={`fixed left-0 top-0 bottom-0 w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-center">
                <img src="/logo.png" alt="Caasi logo" className="w-20 h-20 object-contain mx-auto mb-4" />
              </div>

            <nav className="mt-10 space-y-2 text-sm">
              {navItems.map((item) => {
                const active = isActive(item.to)
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                      active
                        ? 'bg-[#0b73d8] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${active ? 'bg-white/20' : 'bg-transparent'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                    </span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-10 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Activity summary</p>
              <p className="mt-2">Track expense and absence reports in one place.</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}