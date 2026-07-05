import { useState } from 'react'
import { Search, Bell, ChevronDown, ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight, Plus, X, Calendar, User, FileText, Clipboard } from 'lucide-react'
import Sidebar from '../components/Sidebar' // Apni path check kar lena
import Navbar from '../components/Navbar'   // Apni path check kar lena

// --- EditAbsenceModal Component (Integrated) ---
function EditAbsenceModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  
  const getDayStatus = (day) => {
    if (day === 1 || day === 7) return { label: 'Télétravail', color: 'bg-emerald-500' }
    if (day === 15 || day === 23) return { label: 'Congés payés', color: 'bg-orange-500' }
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"><X className="h-6 w-6" /></button>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronLeft size={18}/></button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronRight size={18}/></button>
          </div>
          <h2 className="text-xl font-bold">May 2024</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <User size={16} /> Select Employee
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-slate-200 rounded-2xl p-4">
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {days.map(day => {
                const status = getDayStatus(day);
                return (
                  <div key={day} className="h-16 bg-white p-1 text-sm relative flex flex-col justify-between">
                    <span className="text-slate-400">{day}</span>
                    {status && (
                      <div className={`${status.color} text-[8px] text-white px-1 rounded truncate`}>
                        {status.label}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-4">
              New Absence <span>▼</span>
            </button>
            
            {['Start Date', 'End Date'].map((label) => (
              <div key={label}>
                <label className="text-sm font-semibold text-slate-500 mb-2 block">{label}</label>
                <div className="flex gap-2">
                  <input placeholder="DD" className="w-full border rounded-lg p-2 text-center text-sm" />
                  <input placeholder="mm" className="w-full border rounded-lg p-2 text-center text-sm" />
                  <input placeholder="yyyy" className="w-full border rounded-lg p-2 text-center text-sm" />
                </div>
              </div>
            ))}

            <div>
              <label className="text-sm font-semibold text-slate-500 mb-2 block">Total Days</label>
              <div className="flex bg-blue-50 border border-blue-100 rounded-xl p-3 items-center">
                <div className="bg-blue-400 text-white p-2 rounded-lg"><Calendar className="h-5 w-5" /></div>
                <span className="ml-4 text-xl font-bold text-blue-600">49</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <div className="flex justify-between mb-2"><span>Description</span><Plus className="h-5 w-5" /></div>
            <p className="text-sm opacity-90">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <div className="flex justify-between mb-4"><span>Attachment</span><Plus className="h-5 w-5" /></div>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl text-blue-600"><Clipboard size={24} /></div>
              <div className="bg-white p-4 rounded-xl text-blue-600"><FileText size={24} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Page Component ---
const initialAbsenceData = [
    { id: 1, name: 'Albert Flores', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
    { id: 2, name: 'Wade Warren', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Pending' },
    { id: 3, name: 'Ronald Richards', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Approved' },
    { id: 4, name: 'Courtney Henry', contact: 'flores@mail.com\n(+62) 21-1234-5678', days: '23 Feb 2024', status: 'Rejected' },
]

export default function DaysOfAbsence() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [absenceData] = useState(initialAbsenceData)
    const [selectedAbsences, setSelectedAbsences] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [openDropdownId, setOpenDropdownId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
            
            {/* Modal integration */}
            <EditAbsenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar openSidebar={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 lg:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span>Show</span>
                            <select className="border border-slate-200 rounded-lg px-2 py-1.5 bg-white outline-none">
                                <option>10</option>
                                <option>25</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <button className="flex items-center gap-2 bg-[#0b73d8] text-white px-4 py-2 rounded-xl text-sm font-semibold">
                            <Plus className="h-4 w-4" /> Add Absence
                        </button>
                    </div>

                    <section className="rounded-[2rem] bg-white shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                        <th className="py-4 px-6 w-12"><input type="checkbox" onChange={handleSelectAll} className="h-4 w-4" /></th>
                                        <th className="py-4 px-6">Name</th>
                                        <th className="py-4 px-6">Contact</th>
                                        <th className="py-4 px-6">Days</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {absenceData.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50">
                                            <td className="py-4 px-6"><input type="checkbox" onChange={() => handleSelectAbsence(item.id)} checked={selectedAbsences.includes(item.id)} className="h-4 w-4" /></td>
                                            <td className="py-4 px-6 font-semibold text-sm text-slate-800">{item.name}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500 whitespace-pre-line">{item.contact}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500">{item.days}</td>
                                            <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(item.status)}`}>{item.status}</span></td>
                                            <td className="py-4 px-6 text-center relative">
                                                <button onClick={() => { setIsModalOpen(true); setOpenDropdownId(null); }} className="text-[#0b73d8] hover:underline text-sm font-medium">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}