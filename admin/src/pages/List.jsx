import React, { useEffect, useState } from 'react'
import { Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, PackageX } from 'lucide-react'
import axios from 'axios'
import { backendUrl, currency } from '../constants'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ITEMS_PER_PAGE = 15 // 3 rows of 5 on XL screens

const List = ({ token }) => {
  const navigate = useNavigate()

  const [list, setList]                   = useState([])
  const [searchTerm, setSearchTerm]       = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [subcategoryFilter, setSubcategoryFilter] = useState('All')
  const [currentPage, setCurrentPage]     = useState(1)

  // ── derived ────────────────────────────────────────────────────────────────

  const filteredList = list.filter(item => {
    const matchesSearch   = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesSubcategory = subcategoryFilter === 'All' || item.subcategory === subcategoryFilter
    return matchesSearch && matchesCategory && matchesSubcategory
  })

  const totalPages    = Math.ceil(filteredList.length / ITEMS_PER_PAGE)
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => { setCurrentPage(1) }, [searchTerm, categoryFilter, subcategoryFilter])
  
  // When category changes, reset subcategory filter
  useEffect(() => {
    setSubcategoryFilter('All')
  }, [categoryFilter])

  // Get available subcategories based on category filter
  const availableSubcategories = categoryFilter === 'All'
    ? [...new Set(list.map(item => item.subcategory).filter(Boolean))]
    : [...new Set(list.filter(item => item.category === categoryFilter).map(item => item.subcategory).filter(Boolean))]

  // ── api ────────────────────────────────────────────────────────────────────

  const handleApiError = (error) => {
    console.log(error)
    if (error.code === 'ERR_NETWORK' || !error.response) {
      toast.error('Backend is offline. Start the backend server and check the MongoDB connection.')
      return
    }
    toast.error(error.response?.data?.message || error.message)
  }

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      if (res.data.success) {
        setList(res.data.products)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      handleApiError(err)
    }
  }

  const toggleStock = async (id, inStock) => {
    try {
      const res = await axios.post(
        backendUrl + '/api/product/updatestock',
        { id, inStock },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchList()
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      handleApiError(err)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        await fetchList()
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      handleApiError(err)
    }
  }

  useEffect(() => { fetchList() }, [])

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Products List</h2>
        <p className="text-gray-600 mt-1">Manage all your products in one place.</p>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm capitalize"
            >
              <option value="All">All Categories</option>
              {['topwear', 'bottomwear', 'winterwear'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Subcategory filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={subcategoryFilter}
              onChange={e => setSubcategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm capitalize"
            >
              <option value="All">All Subcategories</option>
              {availableSubcategories.sort().map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
            {filteredList.length} product{filteredList.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Product grid */}
      {paginatedList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {paginatedList.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-gray-100">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Hover actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() => navigate('/edit/' + item._id, { state: item })}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                    title="Edit product"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Limited drop / bestseller badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {item.bestseller && (
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-medium">
                      Bestseller
                    </span>
                  )}
                  {item.limitedDrop && (
                    <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-medium">
                      Limited Drop
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                    {item.category} · {item.subcategory}
                  </span>
                  {/* Stock toggle */}
                  <button
                    onClick={() => toggleStock(item._id, item.inStock === false ? true : false)}
                    className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                      item.inStock !== false
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {item.inStock !== false ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {currency}{item.price}
                  </span>
                  <span className={`text-sm font-medium ${
                    (item.quantity ?? 0) > 100
                      ? 'text-green-600'
                      : (item.quantity ?? 0) > 50
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {item.quantity ?? 0} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <PackageX className="text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No products found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setSubcategoryFilter('All'); }}
            className="mt-3 text-sm text-blue-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={`p-2 rounded-lg border transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-white hover:bg-gray-50 border-gray-300'
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className={`p-2 rounded-lg border transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-white hover:bg-gray-50 border-gray-300'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default List
