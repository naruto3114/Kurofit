import React, { useState } from 'react'
import { Upload, X, Star, Zap } from 'lucide-react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../constants'
import { toast } from 'react-toastify'

const categoryMap = {
  topwear: ["tshirt", "hoodie", "shirt", "oversized", "vest"],
  bottomwear: ["jeans", "jogger", "trackpant", "shorts"],
  winterwear: ["jacket", "sweatshirt"]
}

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const BOTTOM_SIZES = ['26', '28', '30', '32', '34', '36', '38', '40']

const resetState = () => ({
  name:        '',
  description: '',
  price:       '',
  quantity:    1,
  category:    'topwear',
  subcategory: 'tshirt',
  limitedDrop: false,
  sizes:       [],
  image1:      null,
  image2:      null,
  image3:      null,
  image4:      null,
})

const Add = ({ token }) => {
  const [form, setForm] = useState(resetState())

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

  const removeImage = (index) => {
    set(imageKey(index), null)
  }

  // All assigned image slots for preview
  const imagePreviews = [0, 1, 2, 3].map(i => ({
    index: i,
    file:  form[imageKey(i)],
  })).filter(slot => slot.file)

  // ── submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
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

      const res = await axios.post(backendUrl + '/api/product/add', fd, { headers: { token } })

      if (res.data.success) {
        toast.success(res.data.message)
        setForm(resetState())
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Add New Item</h2>
        <p className="text-gray-600 mt-1">Create a new product for your store.</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="space-y-6">

          {/* ── Product Name ── */}
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

          {/* ── Description ── */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              >
                {categoryMap[form.category].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Price + Quantity ── */}
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

          {/* ── Sizes ── */}
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


          {/* ── Flags ── */}
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

          {/* ── Image Upload (4 slots) ── */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images <span className="text-gray-400 font-normal">(up to 4)</span>
            </label>

            {/* Upload zone — only show if fewer than 4 images selected */}
            {imagePreviews.length < 4 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={e => {
                    const files = Array.from(e.target.files || [])
                    // Fill remaining empty slots in order
                    let filled = 0
                    for (let i = 0; i < 4 && filled < files.length; i++) {
                      if (!form[imageKey(i)]) {
                        handleImageChange(i, files[filled])
                        filled++
                      }
                    }
                    e.target.value = '' // reset input
                  }}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-gray-600">Click to upload images</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB · {4 - imagePreviews.length} slot{4 - imagePreviews.length !== 1 ? 's' : ''} remaining</p>
                </label>
              </div>
            )}

            {/* Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map(({ index, file }) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full aspect-[3/4] object-cover object-top rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <X size={14} />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => setForm(resetState())}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Add
