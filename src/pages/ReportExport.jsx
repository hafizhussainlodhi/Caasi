import { useState } from 'react'
import { ArrowUpDown, ChevronDown, Plus, MoreHorizontal, ChevronLeft, ChevronRight, X, ClipboardCheck, Mail, Phone, Search, Bell, Trash2, Edit3 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const initialReports = [
  { id: 1, name: 'Top Class Agency', reportDate: '23 Feb 2026', reportType: 'ad-hoc' },
  { id: 2, name: 'Awesome Agency', reportDate: '23 Feb 2026', reportType: 'Standard' },
  { id: 3, name: 'Top Class Agency', reportDate: '23 Feb 2026', reportType: 'ad-hoc' },
  { id: 4, name: 'Awesome Agency', reportDate: '23 Feb 2026', reportType: 'Standard' },
  { id: 5, name: 'Awesome Agency', reportDate: '23 Feb 2026', reportType: 'ad-hoc' },
  { id: 6, name: 'Top Class Agency', reportDate: '23 Feb 2026', reportType: 'Standard' },
  { id: 7, name: 'Awesome Agency', reportDate: '23 Feb 2026', reportType: 'ad-hoc' },
  { id: 8, name: 'Awesome Agency', reportDate: '23 Feb 2026', reportType: 'ad-hoc' },
]

export default function ReportExport() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reports, setReports] = useState(initialReports)
  const [selectedReports, setSelectedReports] = useState([])

  const handleSelectAll = (e) => {
    setSelectedReports(e.target.checked ? reports.map((r) => r.id) : [])
  }

  const handleSelectReport = (id) => {
    setSelectedReports((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar openSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Header Action Buttons */}
         {/* Yeh code aapke table ke bilkul upar aayega */}
<div className="flex items-center justify-between py-4">
  {/* Left side: Show entries */}
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <span>Show</span>
    <select className="border border-slate-200 rounded-lg px-2 py-1 bg-white outline-none">
      <option>10</option>
      <option>25</option>
      <option>50</option>
    </select>
    <span>entries</span>
  </div>

  {/* Right side: Buttons and Filter */}
  <div className="flex items-center gap-3">
    <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
      create an export to accounting and HR software
    </button>
    <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
      Generate Reports
    </button>
    <div className="relative">
      <button className="flex items-center justify-between w-28 border border-slate-200 bg-white px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all">
        Filter
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>

          {/* Table Section */}
          <section className="rounded-[2rem] bg-white shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 w-12"><input type="checkbox" onChange={handleSelectAll} className="rounded border-slate-300 text-[#0b73d8] h-4 w-4 cursor-pointer" /></th>
                    <th className="py-4 px-6">Report Name <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6">Report Date <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6">Report Type <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6">Export</th>
                    <th className="py-4 px-6">Manage</th>
                    <th className="py-4 px-6">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6"><input type="checkbox" checked={selectedReports.includes(report.id)} onChange={() => handleSelectReport(report.id)} className="rounded border-slate-300 text-[#0b73d8] h-4 w-4 cursor-pointer" /></td>
                      <td className="py-4 px-6 font-medium text-sm text-slate-800">{report.name}</td>
                      <td className="py-4 px-6 text-sm text-slate-500">{report.reportDate}</td>
                      <td className="py-4 px-6 text-sm text-slate-500">{report.reportType}</td>
                      <td className="py-4 px-6"><button className="text-slate-400 hover:text-[#0b73d8]"><span className="text-xl">⭳</span></button></td>
                      <td className="py-4 px-6">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">Delete</button>
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-slate-400 hover:text-slate-600"><Edit3 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Showing 1 to 10 of 430 entries</span>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronLeft className="h-4 w-4" /></button>
                <button className="bg-[#0b73d8] text-white px-3 py-1 rounded-md">1</button>
                <button className="hover:bg-slate-100 px-3 py-1 rounded-md">2</button>
                <button className="hover:bg-slate-100 px-3 py-1 rounded-md">...</button>
                <button className="hover:bg-slate-100 px-3 py-1 rounded-md">1337</button>
                <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}