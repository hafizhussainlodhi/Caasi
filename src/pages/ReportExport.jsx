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

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingReport, setEditingReport] = useState(null)

    const handleSelectAll = (e) => {
        setSelectedReports(e.target.checked ? reports.map((r) => r.id) : [])
    }

    const handleSelectReport = (id) => {
        setSelectedReports((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        )
    }

    const handleEditClick = (report) => {
        setEditingReport(report)
        setIsEditModalOpen(true)
    }

    return (
        <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar openSidebar={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 lg:p-6 space-y-6">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span>Show</span>
                            <select className="border border-slate-200 rounded-lg px-2 py-1 bg-white outline-none">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <span>entries</span>
                        </div>

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
                                                <button onClick={() => handleEditClick(report)} className="text-slate-400 hover:text-slate-600 transition-colors"><Edit3 className="h-4 w-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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

            {/* Responsive Edit Modal */}
            {/* Updated Modal Design */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-700 uppercase tracking-wide">Monthly Expense Report</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Top Info Section */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase">Expense Period</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input placeholder="From" className="border border-slate-200 rounded px-2 py-1 text-sm" />
                                        <input placeholder="To" className="border border-slate-200 rounded px-2 py-1 text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase">Employee Information</h3>
                                    <input defaultValue={editingReport?.name} placeholder="Name" className="w-full border border-slate-200 rounded px-2 py-1 text-sm" />
                                    <input placeholder="Employee ID" className="w-full border border-slate-200 rounded px-2 py-1 text-sm" />
                                </div>
                            </div>

                            {/* Input Fields Area */}
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <div className="grid grid-cols-5 bg-blue-50 text-[10px] font-bold text-slate-600 uppercase p-2 border-b">
                                    <div>Date</div>
                                    <div>Description</div>
                                    <div>Payment</div>
                                    <div>Paid To</div>
                                    <div className="text-right">Amount</div>
                                </div>
                                <div className="p-2">
                                    <input className="w-full border-b border-slate-100 py-2 outline-none text-sm" placeholder="Enter details here..." />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 rounded bg-slate-100 hover:bg-slate-200 text-sm font-semibold">Cancel</button>
                                <button className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">Submit Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}