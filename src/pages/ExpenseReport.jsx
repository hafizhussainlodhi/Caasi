import { useState } from 'react'
import { Filter, ChevronDown, Plus, Eye, MoreHorizontal, ChevronLeft, ChevronRight, X, DollarSign, FileSpreadsheet } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const initialReports = [
  {
    id: 1,
    employee: 'Carlos Fonte',
    amount: '$120.50',
    date: '12 May 2026',
    status: 'Approved',
    image: '/man.png',
  },
  {
    id: 2,
    employee: 'Alice Johnson',
    amount: '$45.00',
    date: '14 May 2026',
    status: 'Pending',
    image: '/man.png',
  },
  {
    id: 3,
    employee: 'Robert Carter',
    amount: '$350.00',
    date: '15 May 2026',
    status: 'Rejected',
    image: '/man.png',
  },
  {
    id: 4,
    employee: 'Emilio Vance',
    amount: '$95.20',
    date: '16 May 2026',
    status: 'Approved',
    image: '/man.png',
  },
  {
    id: 5,
    employee: 'Sophia Martinez',
    amount: '$1,200.00',
    date: '18 May 2026',
    status: 'Approved',
    image: '/man.png',
  },
  {
    id: 6,
    employee: 'Liam Neilsen',
    amount: '$75.00',
    date: '19 May 2026',
    status: 'Pending',
    image: '/man.png',
  },
  {
    id: 7,
    employee: 'Sarah Jenkins',
    amount: '$210.00',
    date: '20 May 2026',
    status: 'Approved',
    image: '/man.png',
  },
  {
    id: 8,
    employee: 'Daniel Craig',
    amount: '$180.50',
    date: '21 May 2026',
    status: 'Rejected',
    image: '/man.png',
  },
  {
    id: 9,
    employee: 'Olivia Wilde',
    amount: '$320.00',
    date: '22 May 2026',
    status: 'Pending',
    image: '/man.png',
  },
  {
    id: 10,
    employee: 'Michael Chang',
    amount: '$85.00',
    date: '23 May 2026',
    status: 'Approved',
    image: '/man.png',
  },
]

export default function ExpenseReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reports, setReports] = useState(initialReports)
  const [selectedReports, setSelectedReports] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Pagination current page state
  const [currentPage, setCurrentPage] = useState(1)

  // Create report form state
  const [newEmployee, setNewEmployee] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newStatus, setNewStatus] = useState('Pending')

  // Filter logic
  const filteredReports = selectedStatus === 'All'
    ? reports
    : reports.filter((report) => report.status === selectedStatus)

  // Checkbox selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReports(filteredReports.map((r) => r.id))
    } else {
      setSelectedReports([])
    }
  }

  const handleSelectReport = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((item) => item !== id))
    } else {
      setSelectedReports([...selectedReports, id])
    }
  }

  // Create report submit handler
  const handleCreateReport = (e) => {
    e.preventDefault()
    if (!newEmployee.trim() || !newAmount.trim() || !newDate) return

    // Format amount if user forgot $ symbol
    let formattedAmount = newAmount.trim()
    if (!formattedAmount.startsWith('$')) {
      formattedAmount = `$${formattedAmount}`
    }

    // Format date string from YYYY-MM-DD to DD MMM YYYY if possible
    let formattedDate = newDate
    try {
      const dateObj = new Date(newDate)
      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      formattedDate = dateObj.toLocaleDateString('en-GB', options)
    } catch {
      // Keep original input if date parsing fails
    }

    const newReport = {
      id: Date.now(),
      employee: newEmployee,
      amount: formattedAmount,
      date: formattedDate,
      status: newStatus,
      image: '/man.png',
    }

    setReports([newReport, ...reports])
    setIsCreateModalOpen(false)

    // Reset fields
    setNewEmployee('')
    setNewAmount('')
    setNewDate('')
    setNewStatus('Pending')
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Sidebar - fixed on the left on desktop, slide-over on mobile */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Top navigation bar */}
          <Navbar openSidebar={() => setSidebarOpen(true)} />

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Expense Reports</h1>
            <p className="text-sm text-slate-500 mt-1">Review and process business and travel expenses.</p>
          </div>

          {/* White rounded container for the table and controls */}
          <section className="rounded-[2rem] bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            {/* Top Bar with Filters & Create Button */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <Filter className="h-4 w-4 text-slate-500" />
                  <span>Status: {selectedStatus}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                {filterOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-slate-100 shadow-lg py-2 z-50">
                    {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status)
                          setFilterOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedStatus === status
                            ? 'bg-blue-50 text-[#0b73d8] font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

             
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b73d8] hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create Expense Report</span>
              </button>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 w-12">
                      <input
                        type="checkbox"
                        checked={filteredReports.length > 0 && selectedReports.length === filteredReports.length}
                        onChange={handleSelectAll}
                        className="rounded border-blue-400 text-[#0b73d8] focus:ring-blue-300 h-4 w-4 cursor-pointer accent-white"
                      />
                    </th>
                    <th className="py-4 px-6">Employee</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-center w-32">View Report</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center w-20">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400 text-sm">
                        No expense reports found matching status "{selectedStatus}".
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => {
                      const isSelected = selectedReports.includes(report.id)
                      return (
                        <tr
                          key={report.id}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            isSelected ? 'bg-blue-50/20' : ''
                          }`}
                        >
                          <td className="py-4 px-6">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectReport(report.id)}
                              className="rounded border-slate-300 text-[#0b73d8] focus:ring-[#0b73d8] h-4 w-4 cursor-pointer"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={report.image}
                                alt="Employee"
                                className="w-8 h-8 rounded-full object-cover shadow-sm"
                              />
                              <span className="font-semibold text-slate-800 text-sm">{report.employee}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-bold text-slate-900">
                            {report.amount}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                            {report.date}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button className="text-slate-400 hover:text-[#0b73d8] transition-colors p-2 rounded-xl hover:bg-slate-50 inline-flex items-center justify-center cursor-pointer" title="View Report">
                              <Eye className="h-5 w-5" />
                            </button>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                report.status === 'Approved'
                                  ? 'bg-green-50 text-green-700 border border-green-100'
                                  : report.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : 'bg-rose-50 text-rose-700 border border-rose-100'
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-xl hover:bg-slate-50 inline-flex items-center justify-center cursor-pointer">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-slate-100 bg-white gap-4">
              <div className="text-sm text-slate-500 font-medium">
                Showing <span className="font-semibold text-slate-800">1-{filteredReports.length}</span> of <span className="font-semibold text-slate-800">13,370</span> expense reports
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button 
                  onClick={() => setCurrentPage(1)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    currentPage === 1 
                      ? 'bg-[#0b73d8] text-white shadow-sm' 
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  1
                </button>
                <button 
                  onClick={() => setCurrentPage(2)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    currentPage === 2 
                      ? 'bg-[#0b73d8] text-white shadow-sm' 
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  2
                </button>
                <button 
                  onClick={() => setCurrentPage(3)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    currentPage === 3 
                      ? 'bg-[#0b73d8] text-white shadow-sm' 
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  3
                </button>

                <span className="px-2 text-slate-400 text-sm font-semibold select-none">...</span>

                <button 
                  onClick={() => setCurrentPage(1337)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    currentPage === 1337 
                      ? 'bg-[#0b73d8] text-white shadow-sm' 
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  1337
                </button>

                <button 
                  onClick={() => setCurrentPage(Math.min(1337, currentPage + 1))}
                  className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Modal for Creating Expense Report */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCreateModalOpen(false)}
              />

              {/* Modal Card */}
              <div className="relative bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl border border-slate-100 z-10 transform scale-100 transition-all">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-blue-50 p-2 text-[#0b73d8]">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">New Expense Report</h2>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateReport} className="space-y-4 mt-4">
                  {/* Employee Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newEmployee}
                      onChange={(e) => setNewEmployee(e.target.value)}
                      placeholder="e.g. Carlos Fonte"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        placeholder="120.50"
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none cursor-pointer text-slate-600"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none cursor-pointer"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#0b73d8] hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
