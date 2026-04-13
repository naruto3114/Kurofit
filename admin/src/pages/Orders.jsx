import React, { useEffect, useState } from 'react'
import { Search, Package, ClipboardList, Clock } from 'lucide-react'
import axios from 'axios'
import { backendUrl, currency } from '../constants'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const STATUS_COLORS = {
  'Order Placed':    'bg-gray-100 text-gray-700',
  'Packing':         'bg-blue-100 text-blue-700',
  'Shipped':         'bg-indigo-100 text-indigo-700',
  'Out for delivery':'bg-yellow-100 text-yellow-700',
  'Delivered':       'bg-green-100 text-green-700',
  'Cancelled':       'bg-red-100 text-red-700',
  'Return Requested':'bg-orange-100 text-orange-700',
  'Approved':        'bg-yellow-100 text-yellow-700',
  'Pickup Initiated':'bg-indigo-100 text-indigo-700',
  'Return Received': 'bg-purple-100 text-purple-700',
  'Returned':        'bg-purple-100 text-purple-700',
  'Refunded':        'bg-zinc-100 text-zinc-900',
}

const DELIVERY_STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled']
const RETURN_STATUSES = ['Return Requested', 'Approved', 'Pickup Initiated', 'Return Received', 'Refunded']

const Orders = ({ token }) => {
  const [orders, setOrders]             = useState([])
  const [searchTerm, setSearchTerm]     = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // ── api ────────────────────────────────────────────────────────────────────

  const handleApiError = (error) => {
    console.log(error)
    if (error.code === 'ERR_NETWORK' || !error.response) {
      toast.error('Backend is offline. Start the backend server and check the MongoDB connection.')
      return
    }
    toast.error(error.response?.data?.message || error.message)
  }

  const fetchAllOrders = async () => {
    if (!token) return
    try {
      const res = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (res.data.success) {
        setOrders(res.data.orders.reverse())
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      handleApiError(err)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { headers: { token } }
      )
      if (res.data.success) await fetchAllOrders()
    } catch (err) {
      handleApiError(err)
    }
  }

  const togglePayment = async (orderId, payment) => {
    try {
      const res = await axios.post(
        backendUrl + '/api/order/payment-status',
        { orderId, payment },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchAllOrders()
      }
    } catch (err) {
      handleApiError(err)
    }
  }

  useEffect(() => { fetchAllOrders() }, [token])

  // ── derived ────────────────────────────────────────────────────────────────

  const filteredOrders = orders.filter(order => {
    const customerName = `${order.address.firstName} ${order.address.lastName}`.toLowerCase()
    const itemNames    = order.items.map(i => i.name.toLowerCase()).join(' ')
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.includes(searchTerm.toLowerCase()) ||
      itemNames.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue   = orders.filter(o => !['Cancelled', 'Refunded', 'Returned'].includes(o.status) && o.payment).reduce((sum, o) => sum + o.amount, 0)
  const totalOrders    = orders.length
  const pendingOrders  = orders.filter(o =>
    !['Delivered', 'Cancelled', 'Refunded', 'Returned'].includes(o.status)
  ).length

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-600 mt-1">Track and manage all customer orders.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <ClipboardList className="text-white" size={22} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingOrders}</p>
            </div>
            <div className="bg-yellow-400 p-3 rounded-lg">
              <Clock className="text-white" size={22} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{currency}{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Package className="text-white" size={22} />
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
              placeholder="Search by order ID, customer or product..."
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
            <optgroup label="Delivery">
              {DELIVERY_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </optgroup>
            <optgroup label="Returns">
              {RETURN_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer & Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors align-top">
                  {/* Order icon + ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <img src={assets.parcel_icon} alt="" className="w-8 h-8 mt-0.5 shrink-0" />
                      <span className="text-xs font-mono text-gray-500 break-all max-w-[100px]">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.address.phone}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.address.street}, {order.address.city}, {order.address.state}
                    </p>
                    {order.status === 'Return Requested' && order.returnReason && (
                      <div className="mt-3 p-2 bg-orange-50 rounded border border-orange-100">
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Return Reason</p>
                        <p className="text-xs text-orange-700 mt-1 font-medium italic">"{order.returnReason}"</p>
                      </div>
                    )}
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-700">
                          {item.name}
                          <span className="text-gray-400 ml-1">x{item.quantity}</span>
                          {item.size && (
                            <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {item.size}
                            </span>
                          )}
                        </p>
                      ))}
                      <p className="text-xs text-gray-400 mt-1">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                    <span 
                      onClick={() => togglePayment(order._id, !order.payment)}
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer hover:brightness-95 transition-all ${
                        order.payment ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {order.payment ? 'Paid' : 'Pending'}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {currency}{order.amount}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  {/* Status dropdown */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={e => statusHandler(e, order._id)}
                        disabled={['Cancelled', 'Delivered', 'Refunded'].includes(order.status)}
                        className="block w-full text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option disabled>Change Status</option>
                        {(RETURN_STATUSES.includes(order.status) || order.status === 'Returned' ? RETURN_STATUSES : DELIVERY_STATUSES).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your criteria.</p>
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

export default Orders
