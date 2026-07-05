import { useState } from 'react'
import { Filter, ChevronDown, Plus, Edit, X, UserPlus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const initialUsers = [
  {
    id: 1,
    name: 'Carlos Fonte',
    email: 'carlos.fonte@example.com',
    department: 'Engineering',
    role: 'Frontend Engineer',
    status: 'Active',
    createdDate: '25 April 2024',
    image: '/man.png',
  },
  {
    id: 2,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    department: 'Product Design',
    role: 'UI/UX Designer',
    status: 'Active',
    createdDate: '18 March 2024',
    image: '/man.png',
  },
  {
    id: 3,
    name: 'Robert Carter',
    email: 'robert.carter@example.com',
    department: 'Marketing',
    role: 'Content Strategist',
    status: 'Pending',
    createdDate: '12 February 2024',
    image: '/man.png',
  },
  {
    id: 4,
    name: 'Emilio Vance',
    email: 'emilio.vance@example.com',
    department: 'Engineering',
    role: 'DevOps Specialist',
    status: 'Active',
    createdDate: '02 January 2024',
    image: '/man.png',
  },
  {
    id: 5,
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    department: 'Human Resources',
    role: 'HR Manager',
    status: 'Inactive',
    createdDate: '10 April 2024',
    image: '/man.png',
  },
  {
    id: 6,
    name: 'Liam Neilsen',
    email: 'liam.neilsen@example.com',
    department: 'Sales',
    role: 'Account Executive',
    status: 'Active',
    createdDate: '03 March 2024',
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // New user form state
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newDept, setNewDept] = useState('Engineering')
  const [newRole, setNewRole] = useState('')
  const [newStatus, setNewStatus] = useState('Active')

  // Edit user form state
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editDept, setEditDept] = useState('Engineering')
  const [editRole, setEditRole] = useState('')
  const [editStatus, setEditStatus] = useState('Active')

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
    if (!newName.trim() || !newRole.trim() || !newEmail.trim()) return

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      department: newDept,
      role: newRole,
      status: newStatus,
      image: '/man.png',
    }

    setUsers([newUser, ...users])
    setIsCreateModalOpen(false)

    // Reset form fields
    setNewName('')
    setNewEmail('')
    setNewRole('')
    setNewDept('Engineering')
    setNewStatus('Active')
  }

  const openEditModal = (user) => {
    setEditingUser(user)
    setEditName(user.name)
    setEditEmail(user.email || '')
    setEditDept(user.department)
    setEditRole(user.role)
    setEditStatus(user.status)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (!editingUser) return

    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            name: editName,
            email: editEmail,
            department: editDept,
            role: editRole,
            status: editStatus,
          }
        : user
    )

    setUsers(updatedUsers)
    setIsEditModalOpen(false)
    setEditingUser(null)
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
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-slate-400 hover:text-[#0b73d8] transition-colors p-1 rounded-lg hover:bg-slate-100 inline-flex items-center justify-center cursor-pointer"
                            >
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

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="email@example.com"
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

          {isEditModalOpen && editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div
                className="absolute inset-0 bg-black/25 backdrop-blur-sm"
                onClick={() => setIsEditModalOpen(false)}
              />

              <div className="relative w-full max-w-5xl rounded-[2rem] bg-white shadow-2xl border border-slate-200 z-10 overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.4fr] bg-slate-50 p-6 lg:p-8">
                  <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <img
                        src={editingUser.image}
                        alt={editingUser.name}
                        className="h-44 w-44 rounded-[2rem] object-cover shadow-lg"
                      />
                      <div>
                        <p className="text-xl font-semibold text-slate-900">{editingUser.name}</p>
                        <p className="text-sm text-slate-500">{editingUser.role}</p>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Email Address</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{editingUser.email}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Department</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{editingUser.department}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Status</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{editingUser.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <p className="text-xl font-bold text-slate-900">Edit Information</p>
                        <p className="text-sm text-slate-500 mt-1">Update details for the selected user below.</p>
                      </div>
                      <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="rounded-full border border-slate-200 bg-white p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveEdit} className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Full Name</label>
                          <input
                            type="text"
                            required
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Department</label>
                          <select
                            value={editDept}
                            onChange={(e) => setEditDept(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                          >
                            <option value="Engineering">Engineering</option>
                            <option value="Product Design">Product Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Sales">Sales</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Role</label>
                          <input
                            type="text"
                            required
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Status</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#0b73d8] focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>

                        <div className="rounded-3xl bg-slate-50 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">User Created</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{editingUser.createdDate || '25 April 2024'}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-2 flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(false)}
                          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-2xl bg-[#0b73d8] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
