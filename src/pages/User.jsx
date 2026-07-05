import { useState } from 'react'
import { Filter, ChevronDown, Plus, Edit, X, UserPlus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const initialUsers = [
  {
    id: 1,
    name: 'Carlos Fonte',
    department: 'Engineering',
    role: 'Frontend Engineer',
    status: 'Active',
    image: '/man.png',
  },
  {
    id: 2,
    name: 'Alice Johnson',
    department: 'Product Design',
    role: 'UI/UX Designer',
    status: 'Active',
    image: '/man.png',
  },
  {
    id: 3,
    name: 'Robert Carter',
    department: 'Marketing',
    role: 'Content Strategist',
    status: 'Pending',
    image: '/man.png',
  },
  {
    id: 4,
    name: 'Emilio Vance',
    department: 'Engineering',
    role: 'DevOps Specialist',
    status: 'Active',
    image: '/man.png',
  },
  {
    id: 5,
    name: 'Sophia Martinez',
    department: 'Human Resources',
    role: 'HR Manager',
    status: 'Inactive',
    image: '/man.png',
  },
  {
    id: 6,
    name: 'Liam Neilsen',
    department: 'Sales',
    role: 'Account Executive',
    status: 'Active',
    image: '/man.png',
  },
]

export default function User() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState(initialUsers)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // New user form state
  const [newName, setNewName] = useState('')
  const [newDept, setNewDept] = useState('Engineering')
  const [newRole, setNewRole] = useState('')
  const [newStatus, setNewStatus] = useState('Active')

  // Filter logic
  const filteredUsers = selectedStatus === 'All'
    ? users
    : users.filter((user) => user.status === selectedStatus)

  // Checkbox select handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((item) => item !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  // Handle create user
  const handleCreateUser = (e) => {
    e.preventDefault()
    if (!newName.trim() || !newRole.trim()) return

    const newUser = {
      id: Date.now(),
      name: newName,
      department: newDept,
      role: newRole,
      status: newStatus,
      image: '/man.png',
    }

    setUsers([newUser, ...users])
    setIsCreateModalOpen(false)

    // Reset form fields
    setNewName('')
    setNewRole('')
    setNewDept('Engineering')
    setNewStatus('Active')
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

          {/* User Section Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
              <p className="text-sm text-slate-500 mt-1">Manage employee accounts, roles, and status.</p>
            </div>
          </div>

          {/* White rounded table container */}
          <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100">
            {/* Top Bar with Filters & Create User */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              {/* Filter */}
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
                    {['All', 'Active', 'Inactive', 'Pending'].map((status) => (
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

              {/* Create User Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b73d8] hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create User</span>
              </button>
            </div>

            {/* Table wrapper with overflow-x-auto for responsiveness */}
            <div className="overflow-x-auto mt-6">
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-4 w-12">
                      <input
                        type="checkbox"
                        checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-[#0b73d8] focus:ring-[#0b73d8] h-4 w-4 transition duration-150 ease-in-out cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Department</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-center w-20">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-10 text-center text-slate-400 text-sm">
                        No users found for status "{selectedStatus}".
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const isSelected = selectedUsers.includes(user.id)
                      return (
                        <tr
                          key={user.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isSelected ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectUser(user.id)}
                              className="rounded border-slate-300 text-[#0b73d8] focus:ring-[#0b73d8] h-4 w-4 transition duration-150 ease-in-out cursor-pointer"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.image}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover shadow-sm"
                              />
                              <span className="font-semibold text-slate-800 text-sm">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600 font-medium">
                            {user.department}
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-500">
                            {user.role}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : user.status === 'Inactive'
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button className="text-slate-400 hover:text-[#0b73d8] transition-colors p-1 rounded-lg hover:bg-slate-100 inline-flex items-center justify-center cursor-pointer">
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Modal for Creating User */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCreateModalOpen(false)}
              />

              {/* Modal Content */}
              <div className="relative bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl border border-slate-100 z-10 transform scale-100 transition-all">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-blue-50 p-2 text-[#0b73d8]">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Create New User</h2>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Carlos Fonte"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Department
                    </label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none cursor-pointer"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      required
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Frontend Engineer"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0b73d8] transition-all outline-none"
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
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
                      Create User
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
