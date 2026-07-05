import {
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar({ openSidebar }) {
  return (
    <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full min-w-0 items-center gap-2 rounded-[1.75rem] bg-white px-3 py-2 shadow-sm border border-slate-100 lg:max-w-md">
        <button
          type="button"
          onClick={openSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <Search className="h-5 w-5 text-slate-500" />
        <input
          type="search"
          placeholder="Search here..."
          className="flex-1 min-w-0 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Right Side Actions - Stack on mobile, inline on desktop */}
      <div className="flex flex-wrap items-center justify-end gap-3 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
        <button className="flex-shrink-0 inline-flex items-center gap-2 rounded-[2rem] border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm text-slate-600 lg:px-5 lg:py-3">
          <img src="/flag.svg" alt="Language" className="h-4 w-4" />
          <span className="hidden sm:inline">Eng (US)</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
      <Link to="/notification">
        <button className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-[2rem] bg-white text-slate-600 shadow-sm border border-slate-100">
          <Bell className="h-5 w-5" />
        </button>
      </Link>

        <button className="flex-shrink-0 inline-flex items-center gap-3 rounded-[2rem] bg-white px-3 py-2 shadow-sm border border-slate-100 text-sm lg:px-4 lg:py-2">
          <img src="/man.png" alt="User" className="h-10 w-10 rounded-full object-cover" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold">John</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </header>
  )
}

// import { useState } from 'react'
// import {
//   Activity,
//   ArrowRight,
//   BarChart2,
//   CalendarDays,
//   FileText,
//   LayoutDashboard,
//   ListChecks,
//   Settings2,
//   Users,
// } from 'lucide-react'
// import Sidebar from '../components/Sidebar'
// import Navbar from '../components/Navbar'

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
//   { label: 'User', icon: Users, to: '/user' },
//   { label: 'Expense Report', icon: FileText, to: '/expense-report' },
//   { label: 'Activity Report', icon: Activity, to: '/activity-report' },
//   { label: 'Advanced Settings and Management', icon: Settings2, to: '/settings' },
//   { label: 'Reports and Export', icon: BarChart2, to: '/reports' },
//   { label: 'Days of Absence', icon: CalendarDays, to: '/absence' },
// ]

// const summaryCards = [
//   {
//     title: 'Pending Absence Requests',
//     count: 38,
//     items: [
//       { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
//       { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
//       { name: 'Carlos Fonte', date: '12 May 2024', status: 'Illness' },
//     ],
//   },
//   {
//     title: 'Recent Activity',
//     count: 38,
//     items: [
//       { name: 'Rejected expense report', date: '12 May 2024' },
//       { name: 'Pending validation', date: '12 May 2024' },
//       { name: 'Pending Absence Report', date: '12 May 2024' },
//     ],
//   },
//   {
//     title: 'Pending Activity Reports',
//     count: 38,
//     items: [
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//     ],
//   },
//   {
//     title: 'Pending Expense Reports',
//     count: 38,
//     items: [
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//       { name: 'Carlos Fonte', date: '12 May 2024' },
//     ],
//   },
// ]

// function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="min-h-[85vh] bg-slate-50 text-slate-900">
//       <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//         <main className="flex-1 p-4 lg:p-6">
//           <Navbar openSidebar={() => setSidebarOpen(true)} />

//           <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
//             <div className="space-y-6">
//               <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/60">
//                 <div className="flex flex-wrap items-center justify-between gap-4">
//                   <div>
//                     <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Expense Reports Per Day</p>
//                     <p className="mt-3 text-3xl font-semibold text-slate-900">$682.5</p>
//                   </div>
//                   <div className="rounded-3xl bg-slate-100 p-3 text-slate-600">
//                     <BarChart2 className="h-5 w-5" />
//                   </div>
//                 </div>

//                 <div className="mt-8 relative space-y-4">
//                   {/* dashed marker line and value */}
//                   <div className="absolute left-6 right-6 top-8 border-t border-dashed border-slate-200" />
//                   <div className="absolute right-6 top-0 text-sm font-medium text-slate-400">$179</div>

//                   <div className="flex items-end gap-3 relative z-10">
//                     {([28,32,36,44,36,32,28,24,20,24,22,26]).map((h, idx) => (
//                       idx === 5 ? (
//                         <div key={idx} className="w-10">
//                           <div className="h-12 w-full rounded-t-full bg-sky-600" />
//                           <div className="h-8 w-full bg-yellow-300" />
//                           <div className="h-8 w-full rounded-b-full bg-pink-500" />
//                         </div>
//                       ) : (
//                         <div key={idx} className={`w-10 rounded-full bg-slate-100`} style={{height: `${h}px`}} />
//                       )
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
//                     {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
//                       <span key={month}>{month}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

              
//             </div>

//             <div className="space-y-4">
//               {/* Top row: two small metric cards */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="rounded-[1.75rem] bg-white p-5 shadow-sm shadow-slate-200/60 min-h-[164px] flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Spent this month</p>
//                     <p className="mt-3 text-2xl font-semibold text-[#0b73d8]">$682.5</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-slate-400">Performance</span>
//                     <div className="flex h-8 w-16 items-center justify-between rounded-full bg-slate-100 px-2 text-slate-400">
//                       <span className="h-2 w-2 rounded-full bg-slate-400" />
//                       <span className="h-2 w-2 rounded-full bg-slate-400/70" />
//                       <span className="h-2 w-2 rounded-full bg-slate-400/40" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-[1.75rem] bg-white p-5 shadow-sm shadow-slate-200/60 min-h-[164px] flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Number of approved activity reports</p>
//                     <p className="mt-3 text-2xl font-semibold text-[#0b73d8]">35</p>
//                   </div>
//                   <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
//                     <span className="text-lg">◷</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Middle row: employees card + activity metric card */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.45fr_0.95fr]">
//                 <div className="rounded-[2rem] bg-slate-900 p-6 shadow-sm shadow-slate-200/60 text-white min-h-[204px] flex items-center">
//                   <div className="flex items-center gap-4">
//                     <div className="rounded-2xl bg-slate-800 p-4 flex items-center justify-center">
//                       <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                     </div>
//                     <div>
//                       <p className="text-xs tracking-[0.25em] uppercase text-slate-400">Number of Employees</p>
//                       <p className="mt-3 text-3xl font-bold">321</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-[1.75rem] bg-white p-5 shadow-sm shadow-slate-200/60 min-h-[204px] flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Rejected activity report</p>
//                     <p className="mt-3 text-3xl font-semibold text-[#0b73d8]">38</p>
//                   </div>
//                   <p className="text-sm text-slate-500">Month of June</p>
//                 </div>
//               </div>

//               {/* Bottom row: two small cards */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="rounded-[1.75rem] bg-white p-5 shadow-sm shadow-slate-200/60 min-h-[160px] flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Rejected expense report</p>
//                     <p className="mt-3 text-2xl font-semibold text-[#0b73d8]">38</p>
//                   </div>
//                   <p className="text-sm text-slate-500">Month of June</p>
//                 </div>

//                 <div className="rounded-[1.75rem] bg-white p-5 shadow-sm shadow-slate-200/60 min-h-[160px] flex flex-col justify-between">
//                   <div>
//                     <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Approved expense report</p>
//                     <p className="mt-3 text-2xl font-semibold text-[#0b73d8]">38</p>
//                   </div>
//                   <p className="text-sm text-slate-500">Month of June</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* <section className="mt-6 grid gap-4 xl:grid-cols-2">
//             {summaryCards.map((card) => (
//               <div key={card.title} className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/60">
//                 <div className="flex items-center justify-between gap-4">
//                   <div>
//                     <p className="text-sm font-semibold text-slate-900">{card.title}</p>
//                   </div>
//                   <div className="rounded-3xl bg-slate-100 px-4 py-2 text-[#0b73d8] font-bold">
//                     {card.count}
//                   </div>
//                 </div>
//                 <div className="mt-6 space-y-4">
//                   {card.items.map((item) => (
//                     <div key={item.name + item.date} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
//                       <div>
//                         <p className="font-semibold text-slate-900">{item.name}</p>
//                         <p className="text-sm text-slate-500">{item.date}</p>
//                       </div>
//                       {item.status ? (
//                         <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">{item.status}</span>
//                       ) : (
//                         <ArrowRight className="h-4 w-4 text-slate-400" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-sky-600">
//                   View all
//                   <ArrowRight className="h-4 w-4" />
//                 </div>
//               </div>
//             ))}
//           </section> */}
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
