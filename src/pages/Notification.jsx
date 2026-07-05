import { useState } from 'react'
import { Bell, Search, ChevronDown, CheckCircle2, X, Clock } from 'lucide-react'
import Sidebar from '../components/Sidebar' // Ensure this path is correct

const notifications = [
  { id: 1, type: 'video', title: 'First view on Peter\'s Big Cool Idea', user: 'Someone', time: 'about 13 hours ago' },
  { id: 2, type: 'video', title: 'First view on Peters\' House of Munch Menu', user: 'Someone', time: 'about 2 days ago' },
  { id: 3, type: 'video', title: 'First view on Brian is so annoying', user: 'Someone', time: 'about 1 year ago' },
  { id: 4, type: 'reaction', title: '1 reaction to Bird is the word', user: 'Brian Griffin', time: 'about 1 year ago' },
]

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeItem="Notifications" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <nav className="flex items-center justify-between p-4 bg-white border-b border-slate-100">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="search" placeholder="Search here.." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium flex items-center gap-1"><img src="https://flagicons.lipis.dev/flags/4x3/us.svg" className="w-4 h-4" /> Eng (US) <ChevronDown className="h-3 w-3" /></span>
            <Bell className="h-5 w-5 text-slate-400" />
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
              <div className="text-sm"><b>John</b><br/><span className="text-xs text-slate-500">Admin</span></div>
            </div>
          </div>
        </nav>

        <main className="p-6">
          {/* Blue Notification Banner */}
          <div className="bg-[#0b73d8] text-white p-4 rounded-xl flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5" />
              <p className="text-sm"><b>Turn on push notifications</b> to know when your video has been watched and interacted with.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm font-semibold hover:underline">Allow push notifications</button>
              <button className="text-sm font-semibold opacity-80 hover:opacity-100">Dismiss</button>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-slate-200 mb-6">
            {['Overview', 'Data', 'status'].map((tab) => (
              <button key={tab} className={`pb-2 text-sm font-medium ${tab === 'Overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-6">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className={`p-2 rounded-full ${n.type === 'video' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  {n.type === 'video' ? '🎉' : '💬'}
                </div>
                <div>
                  <p className="text-sm font-medium">First view on <b>{n.title.replace('First view on ', '')}</b></p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src="https://i.pravatar.cc/30" className="w-5 h-5 rounded-full" />
                    <span className="text-xs text-slate-600"><b>{n.user}</b> watched • {n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}