import { X, Calendar, Plus, ChevronLeft, ChevronRight, User, FileText, Clipboard } from 'lucide-react'

export default function EditAbsenceModal({ isOpen, onClose }) {
  if (!isOpen) return null

  // Calendar ke 31 din generate karne ke liye
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Example data for indicators (aap ise dynamic bhi kar sakte hain)
  const getDayStatus = (day) => {
    if (day === 1 || day === 7) return { label: 'Télétravail', color: 'bg-emerald-500' }
    if (day === 15 || day === 23) return { label: 'Congés payés', color: 'bg-orange-500' }
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"><X className="h-6 w-6" /></button>
        
        {/* Header Section */}
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

        {/* Main Grid: Calendar (Left) + Inputs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Component */}
          <div className="lg:col-span-2 border border-slate-200 rounded-2xl p-4 h-[420px]">
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

          {/* Input Panel */}
          <div className="space-y-6">
            <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-4">
              New Absence <span>▼</span>
            </button>
            
            {['Start Data', 'End Data'].map((label) => (
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

        {/* Bottom Section */}
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