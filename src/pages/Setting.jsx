import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Edit, Trash2, Save, X, Settings, Activity, FileText, Bell } from 'lucide-react';

function Setting() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const userProfile = {
        firstName: 'Tomiwa',
        lastName: 'Oyelodu',
        email: 'test@gmail.com',
        team: 'Web Development',
        phone: '0321-2111623',
        status: 'Active',
        createdDate: '24-April-2024',
        lastActivity: '24-April-2024',
        image: '/man.png',
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar fixed for desktop, hidden on mobile if needed */}
            <Sidebar />

            <div className="flex-1 flex flex-col w-full overflow-hidden">
                <Navbar />

                <main className="p-4 md:p-8 w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Advanced Settings and Management</h1>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 text-gray-600 border rounded-xl hover:bg-gray-100">
                                <X size={18} /> Cancel
                            </button>
                            <button onClick={() => setIsProfileModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md">
                                <Save size={18} /> Edit information
                            </button>
                        </div>
                    </div>

                    {/* Responsive Tabs - scrollable on mobile */}
                    <div className="flex gap-6 border-b mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide text-gray-600">
                        <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold flex items-center gap-2"><Settings size={16} />General</button>
                        <button className="pb-4 hover:text-blue-600 flex items-center gap-2"><Activity size={16} />Activity report</button>
                        <button className="pb-4 hover:text-blue-600 flex items-center gap-2"><FileText size={16} />Expense report</button>
                        <button className="pb-4 hover:text-blue-600 flex items-center gap-2"><Bell size={16} />Notifications</button>
                    </div>

                    {/* Settings Content Card */}
                    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">

                        {/* Rows Section */}
                        <div className="space-y-2">
                            {['Create Teams', 'Create Departments', 'Create Roles'].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-5 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item}</p>
                                        <p className="text-sm text-gray-400">Development team</p>
                                    </div>
                                    <button className="p-2 text-blue-600 bg-blue-50 rounded-xl"><Edit size={20} /></button>
                                </div>
                            ))}
                        </div>

                        {/* Toggles Section */}
                        <div className="py-6 space-y-6">
                            {['Activity Reports', 'Expense Reports', 'Configure all the categories for activity reports'].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-700">{item}</p>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Delete Section */}
                        <div className="flex justify-between items-center py-6 border-t border-gray-100 text-red-500">
                            <div>
                                <p className="font-semibold">Delete User</p>
                                <p className="text-sm text-red-300">Carlos Fonte</p>
                            </div>
                            <Trash2 size={22} className="cursor-pointer hover:text-red-700" />
                        </div>

                        {/* Footer Media Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {['Logo', 'Login Screen logo'].map((label, idx) => (
                                <div key={idx} className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center gap-4 hover:border-blue-300 transition-colors">
                                    <p className="font-bold text-gray-700">{label}</p>
                                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-2xl text-blue-600 font-bold text-xl border">Caasi</div>
                                    <div className="flex gap-3">
                                        <button className="text-sm text-gray-400 hover:text-red-500 transition-colors">Remove</button>
                                        <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-md">Change Logo</button>
                                    </div>
                                </div>
                            ))}

                            {/* Color Picker Card */}
                            <div className="p-6 border rounded-3xl bg-gray-50">
                                <p className="font-bold text-gray-700 mb-4">Background</p>
                                <p className="text-sm text-gray-500 mb-2">Color</p>
                                <div className="flex gap-4 items-center">
                                    <div className="w-14 h-14 bg-[#2596be] rounded-2xl shadow-inner border-2 border-white"></div>
                                    <input type="text" value="#2596be" readOnly className="border-none bg-white rounded-xl px-4 py-3 w-full shadow-sm font-mono text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isProfileModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)} />
                            <div className="relative w-full max-w-5xl rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden">
                                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.3fr] p-6 lg:p-8 bg-slate-50">
                                    <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100 text-center">
                                        <img src={userProfile.image} alt={userProfile.firstName} className="mx-auto h-52 w-52 rounded-[2rem] object-cover shadow-lg" />
                                        <div className="mt-6 text-left">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">First Name</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.firstName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Last Name</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.lastName}</p>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2 mt-6">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Email Address</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Team</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.team}</p>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2 mt-6">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone Number</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
                                                    <p className="mt-2 text-base font-semibold text-slate-900">{userProfile.status}</p>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2 mt-6">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">User's creation date</p>
                                                    <p className="mt-2 text-sm text-slate-600">{userProfile.createdDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Last activity</p>
                                                    <p className="mt-2 text-sm text-slate-600">{userProfile.lastActivity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100">
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <div>
                                                <p className="text-xl font-bold text-slate-900">Edit Information</p>
                                                <p className="text-sm text-slate-500 mt-1">Update user details in one place.</p>
                                            </div>
                                            <button onClick={() => setIsProfileModalOpen(false)} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 transition-colors">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div className="grid gap-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>First name</span>
                                                    <input type="text" defaultValue={userProfile.firstName} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100" />
                                                </label>
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>Last name</span>
                                                    <input type="text" defaultValue={userProfile.lastName} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100" />
                                                </label>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>Email address</span>
                                                    <input type="email" defaultValue={userProfile.email} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100" />
                                                </label>
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>Team</span>
                                                    <input type="text" defaultValue={userProfile.team} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100" />
                                                </label>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>Phone number</span>
                                                    <input type="text" defaultValue={userProfile.phone} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100" />
                                                </label>
                                                <label className="space-y-2 text-sm text-slate-500">
                                                    <span>Status</span>
                                                    <select defaultValue={userProfile.status} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 cursor-pointer">
                                                        <option>Active</option>
                                                        <option>Inactive</option>
                                                        <option>Pending</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="rounded-3xl bg-slate-50 p-4">
                                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">User's creation date</p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">{userProfile.createdDate}</p>
                                                </div>
                                                <div className="rounded-3xl bg-slate-50 p-4">
                                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Last activity</p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">{userProfile.lastActivity}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                                <button onClick={() => setIsProfileModalOpen(false)} className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                                                <button className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Save Information</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Setting;