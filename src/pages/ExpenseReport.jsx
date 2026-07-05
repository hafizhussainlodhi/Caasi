import { useState, useEffect } from 'react'
import { Filter, ChevronDown, Plus, Eye, MoreHorizontal, ChevronLeft, ChevronRight, X, DollarSign, FileSpreadsheet, Paperclip, Scan, Trash2, Edit3, RefreshCcw } from 'lucide-react'
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
  
  // Unified modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(0) // 0: Form, 1: Scanner, 2: Preview

  // Pagination current page state
  const [currentPage, setCurrentPage] = useState(1)

  // Create report form state
  const [newEmployee, setNewEmployee] = useState('')
  const [newCategory, setNewCategory] = useState('Travel')
  const [newAmount, setNewAmount] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newDescription, setNewDescription] = useState('')
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
      category: newCategory,
      description: newDescription,
      image: '/man.png',
    }

    setReports([newReport, ...reports])
    setIsModalOpen(false)
    setModalStep(0)

    // Reset fields
    setNewEmployee('')
    setNewCategory('Travel')
    setNewAmount('')
    setNewDate('')
    setNewDescription('')
    setNewStatus('Pending')
  }

  const openExpenseModal = (employee = '') => {
    setNewEmployee(employee)
    setModalStep(0)
    setIsModalOpen(true)
  }

  const handleScanClick = () => {
    setModalStep(1)
    setTimeout(() => {
      setModalStep(2)
    }, 2000)
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
              {/* <div className="relative">
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
              </button> */}
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-50">

                {/* Left: Show Entries */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Show</span>
                  <select
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm outline-none cursor-pointer bg-white"
                    defaultValue={10}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>

                {/* Spacer to push buttons to the right on laptop */}
                <div className="hidden md:block flex-1" />

                {/* Right: Buttons Container */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={() => openExpenseModal('')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b73d8] hover:bg-blue-700 text-white px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">Create Expense Report</span>
                    <span className="md:hidden">Create</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer min-w-[100px] justify-between"
                    >
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </button>

                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-100 shadow-xl py-2 z-50">
                        {['Employee', 'Date', 'Expense', 'Category', 'Status', 'Attachement'].map((item) => (
                          <button
                            key={item}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#0b73d8] flex justify-between items-center transition-colors cursor-pointer"
                          >
                            {item}
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
                          className={`hover:bg-slate-50/70 transition-colors ${isSelected ? 'bg-blue-50/20' : ''
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
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${report.status === 'Approved'
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
                            <button
                              onClick={() => openExpenseModal(report.employee)}
                              className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-xl hover:bg-slate-50 inline-flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                              <ChevronDown className="h-4 w-4" />
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
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${currentPage === 1
                      ? 'bg-[#0b73d8] text-white shadow-sm'
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${currentPage === 2
                      ? 'bg-[#0b73d8] text-white shadow-sm'
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${currentPage === 3
                      ? 'bg-[#0b73d8] text-white shadow-sm'
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  3
                </button>

                <span className="px-2 text-slate-400 text-sm font-semibold select-none">...</span>

                <button
                  onClick={() => setCurrentPage(1337)}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer ${currentPage === 1337
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

          {/* Unified 3-Step Modal Flow */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => {
                  setIsModalOpen(false)
                  setModalStep(0)
                }}
              />

              {/* Fixed Dimension Modal Container */}
              <div className="relative w-[600px] h-[650px] rounded-[2rem] bg-white shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col">
                
                {/* Step 0: Enter Expense Report Form */}
                {modalStep === 0 && (
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Enter expense report</h2>
                        <p className="text-sm text-slate-500 mt-1">Complete the form below to submit the expense report.</p>
                      </div>
                    </div>

                    <form onSubmit={handleCreateReport} className="space-y-4 flex-1 overflow-y-auto pr-1">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Select User</label>
                          <select
                            value={newEmployee}
                            onChange={(e) => setNewEmployee(e.target.value)}
                            required
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                          >
                            <option value="">Select User</option>
                            {reports.map((report) => (
                              <option key={report.id} value={report.employee}>
                                {report.employee}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Select a category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                          >
                            <option value="Travel">Travel</option>
                            <option value="Meals">Meals</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Software">Software</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">$ Enter Amount</label>
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
                              className="w-full rounded-2xl border border-slate-200 bg-slate-100 pl-10 pr-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Enter Date</label>
                          <input
                            type="date"
                            required
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Add a description</label>
                        <textarea
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          rows={3}
                          placeholder="Enter expense description"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <button
                          type="button"
                          className="flex items-center gap-3 rounded-3xl bg-blue-600/5 px-5 py-3 text-slate-900 hover:bg-blue-600/10 transition-colors"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0b73d8] text-white">
                            <Paperclip className="h-5 w-5" />
                          </span>
                          <div className="text-left">
                            <p className="text-sm font-semibold">Attach a document</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={handleScanClick}
                          className="flex items-center gap-3 rounded-3xl bg-blue-600/5 px-5 py-3 text-slate-900 hover:bg-blue-600/10 transition-colors"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0b73d8] text-white">
                            <Scan className="h-5 w-5" />
                          </span>
                          <div className="text-left">
                            <p className="text-sm font-semibold">Scan your report</p>
                          </div>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => {
                            setNewEmployee('')
                            setNewCategory('Travel')
                            setNewAmount('')
                            setNewDate('')
                            setNewDescription('')
                            setNewStatus('Pending')
                          }}
                          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="rounded-2xl bg-[#0b73d8] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 1: Scanning Progress */}
                {modalStep === 1 && (
                  <div className="flex flex-col h-full">
                    <div className="bg-slate-50 px-6 py-5 flex items-center gap-3 border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => setModalStep(0)}
                        className="rounded-full border border-slate-200 bg-white p-2 text-[#0b73d8] hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <p className="text-lg font-bold text-slate-900">Receipt Scanner</p>
                    </div>
                    <div className="flex-1 p-8 bg-slate-50 flex flex-col items-center justify-center">
                      <div className="w-full max-w-md rounded-[2.5rem] bg-slate-200 p-8 flex items-center justify-center">
                        <div className="relative h-48 w-48 rounded-[2rem] border-2 border-slate-300 bg-white shadow-inner flex items-center justify-center overflow-hidden">
                           {/* Animated scanning line */}
                           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-scan" />
                           
                           <div className="relative h-32 w-32 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 flex flex-col gap-2">
                             <div className="h-2 w-20 rounded-full bg-blue-500/40" />
                             <div className="h-2 w-16 rounded-full bg-slate-200" />
                             <div className="h-2 w-24 rounded-full bg-slate-200" />
                             <div className="h-2 w-12 rounded-full bg-slate-200" />
                             <div className="absolute bottom-4 right-4 h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                               <Scan className="h-4 w-4 text-blue-500" />
                             </div>
                           </div>

                           <div className="absolute left-4 top-4 h-3 w-3 border-t-2 border-l-2 border-blue-500" />
                           <div className="absolute right-4 top-4 h-3 w-3 border-t-2 border-r-2 border-blue-500" />
                           <div className="absolute left-4 bottom-4 h-3 w-3 border-b-2 border-l-2 border-blue-500" />
                           <div className="absolute right-4 bottom-4 h-3 w-3 border-b-2 border-r-2 border-blue-500" />
                        </div>
                      </div>
                      <div className="mt-10 w-full max-w-md">
                        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full bg-[#0b73d8] w-3/4 animate-pulse-fast" />
                        </div>
                        <p className="mt-4 text-center text-base font-bold text-slate-600 tracking-wide uppercase">Scanning Receipt...</p>
                        <p className="mt-1 text-center text-sm text-slate-400">Please wait while we process the data</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Final Receipt Preview */}
                {modalStep === 2 && (
                  <div className="flex flex-col h-full">
                    <div className="bg-white px-6 py-5 flex items-center gap-3 border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => setModalStep(1)}
                        className="rounded-full border border-slate-200 bg-white p-2 text-[#0b73d8] hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <p className="text-xl font-bold text-slate-900">Receipt Scanner</p>
                    </div>

                    <div className="flex-1 p-8 bg-slate-50/50 flex flex-col items-center">
                      {/* Central Box showing scanned data */}
                      <div className="w-full max-w-sm rounded-[2.5rem] bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                        <div className="h-48 bg-slate-100 flex items-center justify-center p-6">
                           <div className="w-full h-full rounded-2xl bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                              <FileSpreadsheet className="h-12 w-12 mb-2 opacity-20" />
                              <p className="text-xs font-semibold uppercase tracking-wider">Scanned Document</p>
                           </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</span>
                            <span className="text-sm font-bold text-slate-900 bg-blue-50 px-3 py-1 rounded-full text-blue-700">{newCategory || 'Travel'}</span>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</span>
                            <span className="text-lg font-black text-[#0b73d8]">{newAmount ? (newAmount.startsWith('$') ? newAmount : `$${newAmount}`) : '$120.50'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</span>
                            <span className="text-sm font-bold text-slate-900">{newDate || '12 May 2026'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Area: Round Buttons */}
                      <div className="mt-8 flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => setModalStep(1)}
                            className="h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all group"
                          >
                            <RefreshCcw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rescan</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => {
                              setNewAmount('')
                              setNewDate('')
                              setModalStep(0)
                            }}
                            className="h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delete</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => setModalStep(0)}
                            className="h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-amber-600 hover:border-amber-200 transition-all"
                          >
                            <Edit3 className="h-6 w-6" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edit</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer: Save Button */}
                    <div className="p-6 bg-white border-t border-slate-100 flex justify-center">
                      <button
                        onClick={handleCreateReport}
                        className="w-full max-w-sm rounded-2xl bg-[#0b73d8] py-4 text-base font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                      >
                        Save Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

