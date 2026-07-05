import { useState } from 'react'
import { Search, Bell, ChevronDown, ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const initialAbsenceData = [
  { id: 1, name: 'Albert Flores', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
  { id: 2, name: 'Wade Warren', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Pending' },
  { id: 3, name: 'Ronald Richards', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
  { id: 4, name: 'Courtney Henry', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Rejected' },
  { id: 5, name: 'Jerome Bell', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
  { id: 6, name: 'Jacob Jones', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Pending' },
  { id: 7, name: 'Marvin McKinney', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
  { id: 8, name: 'Cameron Williamson', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Rejected' },
  { id: 9, name: 'Guy Hawkins', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
  { id: 10, name: 'Esther Howard', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Pending' },
]

export default function DaysOfAbsence() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [absenceData, setAbsenceData] = useState(initialAbsenceData)
  const [selectedAbsences, setSelectedAbsences] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAbsences(absenceData.map((item) => item.id))
    } else {
      setSelectedAbsences([])
    }
  }

  const handleSelectAbsence = (id) => {
    if (selectedAbsences.includes(id)) {
      setSelectedAbsences(selectedAbsences.filter((item) => item !== id))
    } else {
      setSelectedAbsences([...selectedAbsences, id])
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-50 text-green-700 border-green-100'
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100'
      default: return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeItem="Days of Absence" />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar openSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Page Header (Show entries, Add Absence, Sort) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Show</span>
              <select className="border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:ring-1 focus:ring-blue-200 outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#0b73d8] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all">
                <Plus className="h-4 w-4" />
                Add Absence
              </button>
              <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all">
                Sort by
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Table Section */}
          <section className="rounded-[2rem] bg-white shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 w-12">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedAbsences.length === absenceData.length && absenceData.length > 0}
                        className="rounded border-slate-300 text-[#0b73d8] h-4 w-4 cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-600">Name <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-600">Contact <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-600">Days of absence <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-600">Status <ArrowUpDown className="inline h-3 w-3 ml-1" /></th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {absenceData.map((item) => (
                    <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors ${selectedAbsences.includes(item.id) ? 'bg-blue-50/30' : ''}`}>
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedAbsences.includes(item.id)}
                          onChange={() => handleSelectAbsence(item.id)}
                          className="rounded border-slate-300 text-[#0b73d8] h-4 w-4 cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-sm text-slate-800">{item.name.split(' ')[0]}</div>
                        <div className="text-xs text-slate-400">{item.name.split(' ')[1]}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 whitespace-pre-line">{item.contact}</td>
                      <td className="py-4 px-6 text-sm text-slate-500">{item.days}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-500 bg-white">
              <span>Showing 1 to {absenceData.length} of 430 entries</span>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {[1, 2, 3, '...', 1337].map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    className={`h-9 w-9 flex items-center justify-center rounded-xl font-medium text-sm transition-all ${
                      currentPage === page
                        ? 'bg-[#0b73d8] text-white shadow-sm'
                        : page === '...'
                        ? 'border border-transparent text-slate-400'
                        : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(1337, p + 1))} className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}