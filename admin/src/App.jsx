import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from './constants'
import Dashboard from './pages/Dashboard'
// import Coupons from './pages/Coupons'
import Edit from './pages/Edit'
import Users from './pages/Users'

export { backendUrl }

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

  useEffect(() => {
    localStorage.setItem('adminToken', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <div className='flex h-screen overflow-hidden'>
            <Sidebar setToken={setToken} />
            {/* Main column: navbar on top, scrollable content below */}
            <div className='flex flex-col flex-1 overflow-hidden'>
              <Navbar setToken={setToken} />
              <main className='flex-1 overflow-y-auto p-6 lg:p-8'>
                <Routes>
                  <Route path='/' element={<Dashboard token={token} />} />
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/edit/:productId' element={<Edit token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  {/* <Route path='/coupons' element={<Coupons token={token} />} /> */}
                  <Route path='/users' element={<Users token={token} />} />
                </Routes>
              </main>
            </div>
          </div>
      }
    </div>
  )
}

export default App
