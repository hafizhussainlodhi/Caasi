import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  BarChart2,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Settings2,
  Users,
  TrendingUp,
  FileCheck,
  FileX,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const chartData = [
  { month: 'Jan', value: 80, isSpecial: false },
  { month: 'Feb', value: 120, isSpecial: false },
  { month: 'Mar', value: 160, isSpecial: false },
  { month: 'Apr', value: 210, isSpecial: false },
  { month: 'May', value: 170, isSpecial: false },
  { month: 'Jun', value: 240, isSpecial: true }, // June vertical stack of Blue, Yellow, Pink
  { month: 'Jul', value: 150, isSpecial: false },
  { month: 'Aug', value: 110, isSpecial: false },
  { month: 'Sep', value: 90, isSpecial: false },
  { month: 'Oct', value: 110, isSpecial: false },
  { month: 'Nov', value: 100, isSpecial: false },
  { month: 'Dec', value: 130, isSpecial: false },
]

const summaryCards = [
  {
    title: 'Pending Absence Requests',
    count: 38,
    items: [
      { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
      { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
      { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
    ],
  },
  {
    title: 'Recent Activity',
    count: 38,
    items: [
      { name: 'Rejected expense report', date: '12 May 2024' },
      { name: 'Pending validation', date: '12 May 2024' },
      { name: 'Pending Absence Report', date: '12 May 2024' },
    ],
  },
  {
    title: 'Pending Activity Reports',
    count: 38,
    items: [
      { name: 'Carlos Fonte', date: '12 May 2024' },
      { name: 'Carlos Fonte', date: '12 May 2024' },
      { name: 'Carlos Fonte', date: '12 May 2024' },
    ],
  },
  {
    title: 'Pending Expense Reports',
    count: 38,
    items: [
      { name: 'Carlos Fonte', date: '12 May 2024' },
      { name: 'Carlos Fonte', date: '12 May 2024' },
      { name: 'Carlos Fonte', date: '12 May 2024' },
    ],
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Sidebar - fixed on the left on desktop, slide-over on mobile */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Top navigation bar */}
          <Navbar openSidebar={() => setSidebarOpen(true)} />

          {/* Main Dashboard Grid */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
            {/* Left Column: Chart Card */}
            <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Expense Reports Per Day</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">$682.5</p>
                  </div>
                  <div className="rounded-2xl bg-blue-50 p-3.5 text-[#0b73d8]">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>

                {/* Chart Container */}
                <div className="mt-10 relative h-72">
                  {/* Dashed reference line */}
                  <div 
                    className="absolute left-0 right-0 border-t border-dashed border-slate-300 z-0" 
                    style={{ bottom: '71.6%' }} 
                  />
                  {/* Dashed reference label */}
                  <div 
                    className="absolute right-0 text-xs font-bold text-[#0b73d8] bg-white/90 border border-blue-50 px-2 py-0.5 rounded-full shadow-sm z-10" 
                    style={{ bottom: '71.6%', transform: 'translateY(50%)' }}
                  >
                    $179
                  </div>

                  {/* Bars Container */}
                  <div className="flex items-end justify-between h-full relative z-10 px-2 gap-2 sm:gap-3 md:gap-4">
                    {chartData.map((item) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        {/* Custom Tooltip */}
                        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none z-30 whitespace-nowrap">
                          {item.month}: ${item.value}
                        </div>
                        
                        {/* Bar */}
                        <div 
                          className="w-full relative transition-all duration-300 rounded-t-full"
                          style={{ height: `${(item.value / 250) * 100}%` }}
                        >
                          {item.isSpecial ? (
                            <div className="flex flex-col h-full w-full justify-end rounded-t-full overflow-hidden shadow-sm border border-slate-100">
                              {/* Stack of 3 distinct colors (Blue top, Yellow middle, Pink bottom) */}
                              <div className="h-[35%] bg-[#0b73d8]" title="Blue" />
                              <div className="h-[30%] bg-[#facc15]" title="Yellow" />
                              <div className="h-[35%] bg-[#ec4899]" title="Pink" />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-slate-100 group-hover:bg-[#0b73d8]/20 rounded-t-full transition-colors cursor-pointer" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month labels under the chart */}
                <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-400 mt-4 px-2">
                  {chartData.map((item) => (
                    <span key={item.month} className="flex-1 text-center">{item.month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Metric Cards */}
            <div className="space-y-4">
              {/* Top Row: Spent + Approved Activity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Spent This Month */}
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 min-h-[164px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400 font-semibold">Spent this month</p>
                      <p className="mt-3 text-3xl font-bold text-[#0b73d8]">$682.5</p>
                    </div>
                    <div className="rounded-2xl bg-blue-50 p-3 text-[#0b73d8]">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Performance</span>
                    <div className="flex h-6 items-center gap-1.5 rounded-full bg-slate-50 px-2.5">
                      <span className="h-2 w-2 rounded-full bg-[#0b73d8] animate-pulse" />
                      <span className="h-2 w-2 rounded-full bg-[#0b73d8]/60" />
                      <span className="h-2 w-2 rounded-full bg-[#0b73d8]/30" />
                    </div>
                  </div>
                </div>

                {/* Approved Activity Reports */}
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 min-h-[164px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400 font-semibold">Approved activity reports</p>
                      <p className="mt-3 text-3xl font-bold text-[#0b73d8]">35</p>
                    </div>
                    <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                      <FileCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-50 mt-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Month of June</p>
                  </div>
                </div>
              </div>

              {/* Middle Row: Employees + Rejected Activity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.45fr_0.95fr]">
                {/* Number of Employees (Premium Dark Card) */}
                <div className="rounded-[2rem] bg-slate-950 p-6 shadow-sm text-white min-h-[204px] flex items-center relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />
                  
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="rounded-2xl bg-white/10 p-4 flex items-center justify-center text-blue-400">
                      <Users className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-semibold">Number of Employees</p>
                      <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">321</p>
                    </div>
                  </div>
                </div>

                {/* Rejected Activity Report */}
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 min-h-[204px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">Rejected activity report</p>
                      <p className="mt-3 text-3xl font-bold text-[#0b73d8]">38</p>
                    </div>
                    <div className="rounded-2xl bg-red-50 p-3 text-red-500">
                      <FileX className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-4 border-t border-slate-50">Month of June</p>
                </div>
              </div>

              {/* Bottom Row: Rejected Expense + Approved Expense */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Rejected Expense Report */}
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 min-h-[160px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">Rejected expense report</p>
                      <p className="mt-3 text-3xl font-bold text-[#0b73d8]">38</p>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-4 border-t border-slate-50">Month of June</p>
                </div>

                {/* Approved Expense Report */}
                <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 min-h-[160px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">Approved expense report</p>
                      <p className="mt-3 text-3xl font-bold text-[#0b73d8]">38</p>
                    </div>
                    <div className="rounded-2xl bg-teal-50 p-3 text-teal-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-4 border-t border-slate-50">Month of June</p>
                </div>
              </div>
            </div>
          </section>

          {/* Actionable Bottom Summary Cards */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.title} className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-800">{card.title}</p>
                    <div className="rounded-full bg-blue-50 px-3 py-1 text-[#0b73d8] text-xs font-bold">
                      {card.count}
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    {card.items.map((item, itemIndex) => (
                      <div key={`${item.name}-${itemIndex}`} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-slate-800 truncate">{item.name}</p>
                          <p className="text-xs text-slate-400 mt-1 font-medium">{item.date}</p>
                        </div>
                        {item.status ? (
                          <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold text-rose-600 uppercase tracking-wider">{item.status}</span>
                        ) : (
                          <ArrowRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-[#0b73d8] cursor-pointer hover:text-blue-700 transition-colors w-fit">
                  <span>View all</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

