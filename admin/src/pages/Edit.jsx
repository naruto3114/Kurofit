import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../constants'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { Star, Zap, Save, X as CloseIcon } from 'lucide-react'
import { assets } from '../assets/assets'

const categoryMap = {
  topwear: ["tshirt", "hoodie", "shirt", "oversized", "vest"],
  bottomwear: ["jeans", "jogger", "shorts"],
  winterwear: ["jacket", "sweatshirt"]
}

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const BOTTOM_SIZES = ['26', '28', '30', '32', '34', '36', '38', '40']

const Edit = ({ token }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const productData = location.state

  if (!productData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 mb-4">No product data found.</p>
        <button onClick={() => navigate('/list')} className="text-blue-500 hover:underline">Go back to products list</button>
      </div>
    )
  }

  const getInitialCategory = () => {
    const rawCat = (productData.category || "").toLowerCase()
    if (categoryMap[rawCat]) return rawCat
    return 'topwear'
  }

  const getInitialSubcategory = (cat) => {
    const rawSub = (productData.subcategory || productData.productType || "").toLowerCase()
    if (categoryMap[cat].includes(rawSub)) return rawSub
    return categoryMap[cat][0]
  }

  const initialCategory = getInitialCategory()

  const [form, setForm] = useState({
    name:        productData.name || "",
    description: productData.description || "",
    price:       productData.price || "",
    category:    initialCategory,
    subcategory: getInitialSubcategory(initialCategory),
    limitedDrop: productData.limitedDrop || false,
    quantity:    productData.quantity || 1,
    sizes:       productData.sizes || [],
    image1:      null,
    image2:      null,
    image3:      null,
    image4:      null,
  })

  // ── helpers ────────────────────────────────────────────────────────────────

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleCategoryChange = (cat) => {
    setForm(prev => ({ 
      ...prev, 
      category: cat, 
      subcategory: categoryMap[cat][0],
      sizes: []
    }))
  }

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))
  }

  // Map slot index → image key
  const imageKey = (i) => `image${i + 1}`

  const handleImageChange = (index, file) => {
    set(imageKey(index), file || null)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append('id',          productData._id)
      fd.append('name',        form.name)
      fd.append('description', form.description)
      fd.append('price',       form.price)
      fd.append('category',    form.category)
      fd.append('subcategory', form.subcategory)
      fd.append('limitedDrop', form.limitedDrop)
      fd.append('quantity',    form.quantity)
      fd.append('sizes',       JSON.stringify(form.sizes))

      form.image1 && fd.append('image1', form.image1)
      form.image2 && fd.append('image2', form.image2)
      form.image3 && fd.append('image3', form.image3)
      form.image4 && fd.append('image4', form.image4)

      const response = await axios.post(backendUrl + "/api/product/edit", fd, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Edit Product</h2>
        <p className="text-gray-600 mt-1">Update details for "{productData.name}"</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="space-y-6">
          
          {/* Product Images Enhancement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="relative aspect-[3/4] group">
                  <label htmlFor={`image-edit-${idx}`} className="cursor-pointer block h-full">
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all overflow-hidden bg-gray-50 flex items-center justify-center">
                      {(form[imageKey(idx)] || productData.image[idx]) ? (
                        <div className="relative w-full h-full">
                          <img
                            src={form[imageKey(idx)] ? URL.createObjectURL(form[imageKey(idx)]) : productData.image[idx]}
                            alt={`Product ${idx + 1}`}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <img src={assets.upload_area} alt="" className="w-12 opacity-50" />
                      )}
                    </div>
                    <input 
                      type="file" 
                      id={`image-edit-${idx}`} 
                      className="hidden" 
                      onChange={(e) => handleImageChange(idx, e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                  <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                    Slot {idx + 1}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-gray-400 font-normal">* Click an image slot to replace it. Unchanged slots will keep their original images.</p>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                required
                value={form.category}
                onChange={e => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white capitalize"
              >
                {Object.keys(categoryMap).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select
                required
                value={form.subcategory}
                onChange={e => set('subcategory', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white capitalize"
              >
                {categoryMap[form.category].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                required
                min="0"
                value={form.quantity}
                onChange={e => set('quantity', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {(form.category === 'bottomwear' ? BOTTOM_SIZES : SIZES).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                    form.sizes.includes(size)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => set('limitedDrop', !form.limitedDrop)}
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  form.limitedDrop ? 'bg-purple-500 border-purple-500' : 'border-gray-300 bg-white'
                }`}
              >
                {form.limitedDrop && <Zap size={12} className="text-white fill-white" />}
              </div>
              <span className="text-sm text-gray-700 font-medium">Add to Limited Drops</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all font-medium active:scale-[0.98]"
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate('/list')}
              className="px-6 py-3 flex items-center gap-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <CloseIcon size={18} />
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Edit
