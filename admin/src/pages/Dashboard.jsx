import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { currency } from '../constants'
import { toast } from 'react-toastify'
import { Package, Users, ShoppingCart, IndianRupee } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Dashboard = ({ token }) => {
  const [monthlyRevenue, setMonthlyRevenue]       = useState(0)
  const [monthlyOrderCount, setMonthlyOrderCount] = useState(0)
  const [totalProducts, setTotalProducts]         = useState(0)
  const [totalUsers, setTotalUsers]               = useState(0)
  const [recentOrders, setRecentOrders]           = useState([])
  const [salesData, setSalesData]                 = useState([])
  const [orderData, setOrderData]                 = useState([])

  const fetchDashboardData = async () => {
    try {
      // --- Orders ---
      const orderRes = await axios.post(
        backendUrl + '/api/order/list', {}, { headers: { token } }
      )

      if (orderRes.data.success) {
        const allOrders = orderRes.data.orders

        const currentMonth = new Date().getMonth()
        const currentYear  = new Date().getFullYear()

        // Current-month stats
        const monthlyOrders = allOrders.filter(order => {
          const d = new Date(order.date)
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear && order.status !== 'Cancelled'
        })
        setMonthlyRevenue(monthlyOrders.reduce((acc, o) => acc + o.amount, 0))
        setMonthlyOrderCount(monthlyOrders.length)

        // Last 6 months chart data
        const last6 = Array.from({ length: 6 }, (_, i) => {
          const d     = new Date()
          d.setMonth(d.getMonth() - (5 - i))
          return { month: MONTH_NAMES[d.getMonth()], year: d.getFullYear(), sales: 0, orders: 0 }
        })

        allOrders.forEach(order => {
          if (order.status === 'Cancelled') return

          const d   = new Date(order.date)
          const mon = MONTH_NAMES[d.getMonth()]
          const yr  = d.getFullYear()
          const slot = last6.find(s => s.month === mon && s.year === yr)
          if (slot) {
            slot.sales  += order.amount
            slot.orders += 1
          }
        })

        setSalesData(last6.map(({ month, sales })   => ({ month, sales:  Math.round(sales)  })))
        setOrderData(last6.map(({ month, orders }) => ({ month, orders })))

        // 5 most recent orders
        setRecentOrders([...allOrders].reverse().slice(0, 5))
      } else {
        toast.error(orderRes.data.message)
      }

      // --- Products ---
      const productRes = await axios.get(backendUrl + '/api/product/list')
      if (productRes.data.success) {
        setTotalProducts(productRes.data.products.length)
      }

      // --- Users (optional endpoint) ---
      try {
        const userRes = await axios.get(backendUrl + '/api/user/all', { headers: { token } })
        if (userRes.data.success) setTotalUsers(userRes.data.users.length)
      } catch (_) { /* endpoint may not exist yet */ }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) fetchDashboardData()
  }, [token])

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts.toLocaleString(),
      icon: Package,
      badge: 'Available in Store',
      color: 'bg-blue-500',
    },
    {
      label: 'Total Users',
      value: totalUsers > 0 ? totalUsers.toLocaleString() : '—',
      icon: Users,
      badge: 'Registered Accounts',
      color: 'bg-green-500',
    },
    {
      label: 'Monthly Orders',
      value: monthlyOrderCount.toLocaleString(),
      icon: ShoppingCart,
      badge: 'This Month',
      color: 'bg-purple-500',
    },
    {
      label: 'Monthly Revenue',
      value: `${currency}${monthlyRevenue.toLocaleString()}`,
      icon: IndianRupee,
      badge: 'This Month',
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-2 bg-gray-50 inline-block px-2 py-1 rounded">
                    {stat.badge}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => [`${currency}${v}`, 'Revenue']} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">#{order._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{currency}{order.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order.paymentMethod === 'COD'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
