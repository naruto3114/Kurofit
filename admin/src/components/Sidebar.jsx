import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Plus, Package,
  ShoppingCart, Users, Menu, X, LogOut
} from 'lucide-react'
import { assets } from '../assets/assets'

const NAV_ITEMS = [
  { path: '/',       label: 'Dashboard',  icon: LayoutDashboard },
  { path: '/add',    label: 'Add Item',   icon: Plus            },
  { path: '/list',   label: 'Products',   icon: Package         },
  { path: '/orders', label: 'Orders',     icon: ShoppingCart    },
  { path: '/users',  label: 'Users',      icon: Users           },
]

const Sidebar = ({ setToken }) => {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  const NavLinks = () => (
    <nav className="flex-1 p-4 space-y-1">
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <Icon size={19} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )

  const LogoutButton = () => (
    <div className="p-4 border-t border-gray-100">
      <button 
        onClick={() => setToken('')}
        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut size={19} />
        <span>Logout</span>
      </button>
    </div>
  )

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <img src={assets.logo} alt="Logo" className="w-24" />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <LogoutButton />
      </aside>

      {/* ── Desktop sidebar (static) ── */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 shrink-0">
        <div className="p-8 border-b border-gray-100 mb-2">
          <img src={assets.logo} alt="Logo" className="w-32 mx-auto" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <LogoutButton />
      </aside>
    </>
  )
}

export default Sidebar
