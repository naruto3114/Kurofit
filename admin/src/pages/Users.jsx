import React, { useEffect, useState } from 'react'
import { Search, Trash2, Users as UsersIcon, UserCheck, UserX } from 'lucide-react'
import axios from 'axios'
import { backendUrl } from '../constants'
import { toast } from 'react-toastify'

const Users = ({ token }) => {
  const [users, setUsers]             = useState([])
  const [searchTerm, setSearchTerm]   = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // ── api ────────────────────────────────────────────────────────────────────

  const fetchUsers = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/user/all', { headers: { token } })
      if (res.data.success) {
        setUsers(res.data.users)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      // Silently fail — endpoint may not exist yet
    }
  }

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'
      const res = await axios.post(
        backendUrl + '/api/user/update-status',
        { userId, status: newStatus },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchUsers()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const removeUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await axios.post(
        backendUrl + '/api/user/delete',
        { userId },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchUsers()
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) fetchUsers()
  }, [token])

  // ── derived ────────────────────────────────────────────────────────────────

  // backend users may or may not have a `status` field; default to 'Active'
  const withStatus = users.map(u => ({ ...u, status: u.status ?? 'Active' }))

  const filteredUsers = withStatus.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount   = withStatus.filter(u => u.status === 'Active').length
  const inactiveCount = withStatus.filter(u => u.status !== 'Active').length

  // Initials from name
  const initials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  // Deterministic avatar colour based on user id
  const avatarColors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500',
    'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500',
  ]
  const avatarColor = (id = '') =>
    avatarColors[id.charCodeAt(id.length - 1) % avatarColors.length]

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600 mt-1">Manage your customer base.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{withStatus.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <UsersIcon className="text-white" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <UserCheck className="text-white" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Users</p>
              <p className="text-3xl font-bold text-gray-500 mt-2">{inactiveCount}</p>
            </div>
            <div className="bg-gray-400 p-3 rounded-lg">
              <UserX className="text-white" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Avatar + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${avatarColor(user._id)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
                        {initials(user.name)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600 break-all">{user.email}</td>

                  {/* ID */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                      {user._id}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span 
                      onClick={() => toggleStatus(user._id, user.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:brightness-95 transition-all ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeUser(user._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found matching your criteria.</p>
            {(searchTerm || statusFilter !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setStatusFilter('All') }}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
