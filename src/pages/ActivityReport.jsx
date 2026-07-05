import { useState } from 'react'
import { Eye, MoreHorizontal, ChevronLeft, ChevronRight, X, Calendar, Plus, User, FileText, Clipboard } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

// EditAbsenceModal component waisa hi rakha hai jaisa aapka tha
function EditAbsenceModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const getDayStatus = (day) => {
    if (day === 1 || day === 7) return { label: 'Télétravail', color: 'bg-emerald-500' }
    if (day === 15 || day === 23) return { label: 'Congés payés', color: 'bg-orange-500' }
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl p-4 sm:p-6 relative shadow-2xl max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-slate-100 rounded-full"><X className="h-5 w-5 sm:h-6 sm:w-6" /></button>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronLeft size={18}/></button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronRight size={18}/></button>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-center">May 2024</h2>
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
            <User size={16} /> Select Employee
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
          <div className="xl:col-span-2 border border-slate-200 rounded-2xl p-3 sm:p-4">
            <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-semibold text-slate-500 mb-3 sm:mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {days.map(day => {
                const status = getDayStatus(day);
                return (
                  <div key={day} className="h-12 sm:h-16 bg-white p-1 text-[10px] sm:text-sm relative flex flex-col justify-between">
                    <span className="text-slate-400">{day}</span>
                    {status && <div className={`${status.color} text-[7px] sm:text-[8px] text-white px-1 rounded truncate`}>{status.label}</div>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-4">
              New Absence <span>▼</span>
            </button>
            {['Start Date', 'End Date'].map((label) => (
              <div key={label}>
                <label className="text-sm font-semibold text-slate-500 mb-2 block">{label}</label>
                <div className="flex flex-col sm:flex-row gap-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
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

const initialReports = [
  { id: 1, name: 'Albert Flores', details: 'Flores', amount: '$1000', date: '23 Feb 2024', status: 'Approved' },
  { id: 2, name: 'Wade Warren', details: 'Warren', amount: '$1000', date: '23 Feb 2024', status: 'Approved' },
  { id: 3, name: 'Ronald Richards', details: 'Richards', amount: '$1000', date: '23 Feb 2024', status: 'Pending' },
  { id: 4, name: 'Courtney Henry', details: 'Courtney', amount: '$1000', date: '23 Feb 2024', status: 'Rejected' },
  { id: 5, name: 'Jerome Bell', details: 'Bell', amount: '$1000', date: '23 Feb 2024', status: 'Approved' },
]

export default function ExpenseReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) 

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Navbar openSidebar={() => setSidebarOpen(true)} />

        <main className="p-3 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            {/* Yahan overflow-x-auto ensure karega ki mobile pe scroll aaye */}
            <div className="overflow-x-auto w-full">
              <table className="min-w-[800px] w-full text-left text-sm">
                <thead className="bg-[#0b73d8] text-white">
                  <tr>
                    <th className="p-4 w-10"><input type="checkbox" /></th>
                    <th className="p-4">Employee ↕</th>
                    <th className="p-4">Amount ↕</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">View Report ↕</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {initialReports.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-4"><input type="checkbox" /></td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{row.name}</div>
                        <div className="text-xs text-slate-500">{row.details}</div>
                      </td>
                      <td className="p-4 text-[#0b73d8] font-bold">{row.amount}</td>
                      <td className="p-4 text-slate-600">{row.date}</td>
                      <td className="p-4"><Eye className="h-5 w-5 text-[#0b73d8]" /></td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${
                          row.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                          row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-center cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <div className="flex justify-center gap-2 text-slate-500">
                          <MoreHorizontal className="h-5 w-5" />
                          <span>▼</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Footer text jo aapne 2nd image mein dikhaya */}
            <div className="p-4 border-t border-slate-100 text-xs text-slate-500">
              Showing 1-5 of 13,370 expense reports
            </div>
          </div>
        </main>
      </div>

      <EditAbsenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}