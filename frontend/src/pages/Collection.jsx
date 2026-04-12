import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';

const Collection = () => {

  const { products, search, setSearch, showSearch, setShowSearch, categories: dbCategories, subCategories: dbSubCategories, navigate } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const SORT_OPTIONS = [
    { value: 'relavent', label: 'Relevant Filters' },
    { value: 'newest', label: 'New Arrivals' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'low-high', label: 'Price: Low to High' },
    { value: 'high-low', label: 'Price: High to Low' },
  ];

  const PRICE_MAP = {
    '0-500': [0, 500],
    '501-1000': [501, 1000],
    '1001-2000': [1001, 2000],
    '2001+': [2001, 999999],
  };

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setSelectedCategory(prev => prev === value ? '' : value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    setSelectedSizes([]); // Reset sizes when category changes
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setSelectedSubcategory(prev => prev === value ? '' : value);
  }

  const togglePriceRange = (e) => {
    if (priceRange.includes(e.target.value)) {
      setPriceRange(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setPriceRange(prev => [...prev, e.target.value])
    }
  }

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  }

  const getProductCount = (type, value) => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (type === 'category') {
      return productsCopy.filter(item =>
        (item.category && item.category.toLowerCase() === value.toLowerCase()) ||
        (item.subCategory && item.subCategory.toLowerCase() === value.toLowerCase())
      ).length;
    }
    if (type === 'subcategory') {
      return productsCopy.filter(item =>
        (item.subcategory && item.subcategory.toLowerCase() === value.toLowerCase()) ||
        (item.productType && item.productType.toLowerCase() === value.toLowerCase())
      ).length;
    }
    if (type === 'price') {
      const [min, max] = PRICE_MAP[value];
      return productsCopy.filter(item => item.price >= min && item.price <= max).length;
    }
    if (type === 'size') {
      return productsCopy.filter(item => item.sizes && item.sizes.includes(value)).length;
    }
    return 0;
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (selectedCategory) {
      productsCopy = productsCopy.filter(item =>
        (item.category && item.category.toLowerCase() === selectedCategory) ||
        (item.subCategory && item.subCategory.toLowerCase() === selectedCategory)
      );
    }

    if (selectedSubcategory) {
      productsCopy = productsCopy.filter(item =>
        (item.subcategory && item.subcategory.toLowerCase() === selectedSubcategory) ||
        (item.productType && item.productType.toLowerCase() === selectedSubcategory)
      );
    }

    if (priceRange.length > 0) {
      productsCopy = productsCopy.filter(item => {
        return priceRange.some(range => {
          const [min, max] = PRICE_MAP[range];
          return item.price >= min && item.price <= max;
        });
      });
    }

    if (selectedSizes.length > 0) {
      productsCopy = productsCopy.filter(item =>
        selectedSizes.some(size => item.sizes && item.sizes.includes(size))
      );
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      case 'a-z':
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;

      case 'newest':
        setFilterProducts(fpCopy.sort((a, b) => b.date - a.date));
        break;

      case 'oldest':
        setFilterProducts(fpCopy.sort((a, b) => a.date - b.date));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const subcategoryFromUrl = searchParams.get('subcategory');
    const sizesFromUrl = searchParams.get('sizes');
    const searchTermFromUrl = searchParams.get('search');

    if (sizesFromUrl) {
      setSelectedSizes(sizesFromUrl.split(','));
    }

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl.toLowerCase());
    } else {
      setSelectedCategory('');
    }

    if (subcategoryFromUrl) {
      setSelectedSubcategory(subcategoryFromUrl.toLowerCase());
    } else {
      setSelectedSubcategory('');
    }

    if (searchTermFromUrl) {
      setSearch(searchTermFromUrl);
      setShowSearch(true);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearch, setShowSearch]);

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedSubcategory, selectedSizes, priceRange, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, selectedSizes, priceRange, search, showSearch, sortType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const Breadcrumbs = () => (
    <div className='flex items-center gap-2 text-[11px] font-medium text-gray-400 mb-2'>
      <span className='cursor-pointer hover:text-gray-900 transition-colors' onClick={() => navigate('/')}>Home</span>
      <span>/</span>
      <span className='text-gray-900 font-bold'>
        {search ? `Search Results for ${search}` : 'Collection'}
      </span>
    </div>
  );

  const displayCategories = ['topwear', 'bottomwear', 'winterwear'];

  const CATEGORY_MAP = {
    topwear: ["tshirt", "hoodie", "shirt", "oversized", "vest"],
    bottomwear: ["jeans", "jogger", "trackpant", "shorts"],
    winterwear: ["jacket", "sweatshirt"]
  };

  return (
    <div className='pt-12 pb-32 page-entrance'>


      <div className='flex flex-col sm:flex-row gap-12'>
        {/* Filter Options */}
        <div className='min-w-64'>
          <AnimatePresence mode="wait">
            {(showFilter || window.innerWidth > 640) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col gap-10'
              >
                {/* DYNAMIC CATEGORY FILTERS */}
                <div className='bg-white border-t border-gray-100 pt-8'>
                  <p className='mb-6 text-[11px] font-bold uppercase tracking-widest text-gray-900'>FILTERS</p>
                  <div className='flex flex-col gap-6'>
                    {displayCategories.map((cat) => (
                      <div key={cat} className='flex flex-col gap-3'>
                        <label className='flex items-center justify-between cursor-pointer group'>
                          <div className='flex items-center gap-3'>
                            <input
                              className='w-5 h-5 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer accent-zinc-900'
                              type="checkbox"
                              value={cat}
                              onChange={toggleCategory}
                              checked={selectedCategory === cat}
                            />
                            <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${selectedCategory === cat ? 'text-blue-600' : 'text-gray-900 group-hover:text-black'}`}>{cat}</span>
                          </div>
                          <span className='text-[10px] font-medium text-gray-400'>{getProductCount('category', cat)}</span>
                        </label>

                        {/* Nested Subcategories */}
                        <AnimatePresence>
                          {selectedCategory === cat && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className='flex flex-col gap-3 ml-8 border-l border-gray-100 pl-4 overflow-hidden'
                            >
                              {CATEGORY_MAP[cat].map((sub) => (
                                <label key={sub} className='flex items-center justify-between cursor-pointer group'>
                                  <div className='flex items-center gap-3'>
                                    <input
                                      className='w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600'
                                      type="checkbox"
                                      value={sub}
                                      onChange={toggleSubCategory}
                                      checked={selectedSubcategory === sub}
                                    />
                                    <span className={`text-[11px] font-medium transition-colors capitalize ${selectedSubcategory === sub ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'}`}>{sub}</span>
                                  </div>
                                  <span className='text-[10px] font-medium text-gray-400'>{getProductCount('subcategory', sub)}</span>
                                </label>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SIZES Filter */}
                <div className='bg-white border-t border-gray-100 pt-8'>
                  <p className='mb-6 text-[11px] font-bold uppercase tracking-widest text-gray-900'>SIZES</p>
                  <div className='grid grid-cols-4 gap-2'>
                    {(selectedCategory === 'bottomwear'
                      ? ['26', '28', '30', '32', '34', '36', '38', '40']
                      : ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                    ).map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 border text-[10px] font-bold transition-all flex items-center justify-center rounded-lg ${selectedSizes.includes(size)
                            ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                            : 'bg-white text-gray-900 border-gray-100 hover:border-gray-900'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>


                {/* PRICE Filter */}
                <div className='bg-white border-t border-gray-100 pt-8'>
                  <p className='mb-6 text-[11px] font-bold uppercase tracking-widest text-gray-900'>PRICE</p>
                  <div className='flex flex-col gap-4'>
                    {Object.keys(PRICE_MAP).map((range) => (
                      <label key={range} className='flex items-center justify-between cursor-pointer group'>
                        <div className='flex items-center gap-3'>
                          <input
                            className='w-5 h-5 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer accent-zinc-900'
                            type="checkbox"
                            value={range}
                            onChange={togglePriceRange}
                            checked={priceRange.includes(range)}
                          />
                          <span className='text-[12px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors'>₹{range.replace('+', ' and above')}</span>
                        </div>
                        <span className='text-[10px] font-medium text-gray-400'>{getProductCount('price', range)}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <div className='mb-4'>
            <Breadcrumbs />
          </div>

          <div className='flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl font-medium text-gray-900'>
                {search ? `Showing results for ${search}` : 'All Products'}
                <span className='text-gray-400 font-light ml-3'>- {filterProducts.length} items</span>
              </h1>
            </div>

            {/* Custom Product Sort */}
            <div className='relative z-30' ref={sortRef}>
              <p className='absolute -top-6 right-1 text-[10px] font-bold uppercase tracking-widest text-gray-400'>Sort By</p>

              <div
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center justify-between gap-8 min-w-[220px] px-6 py-3 border-2 transition-all cursor-pointer rounded-xl ${isSortOpen ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900 shadow-sm hover:shadow-md'}`}
              >
                <span className='text-[10px] font-bold uppercase tracking-widest'>{SORT_OPTIONS.find(o => o.value === sortType)?.label}</span>
                <img className={`h-2.5 transition-transform duration-300 ${isSortOpen ? 'rotate-180 brightness-0 invert' : 'opacity-40'}`} src={assets.dropdown_icon} alt="" />
              </div>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden'
                  >
                    <div className='flex flex-col'>
                      {SORT_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => { setSortType(option.value); setIsSortOpen(false); }}
                          className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${sortType === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory || selectedSubcategory || priceRange.length > 0) && (
            <div className='flex flex-wrap gap-2 mb-10'>
              {selectedCategory && (
                <div key={selectedCategory} className='flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full text-[11px] text-gray-500 bg-white group hover:border-gray-300 transition-colors'>
                  <span className='capitalize'>{selectedCategory}</span>
                  <X
                    size={14}
                    className='cursor-pointer hover:text-gray-900 transition-colors'
                    onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); }}
                  />
                </div>
              )}
              {selectedSubcategory && (
                <div key={selectedSubcategory} className='flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full text-[11px] text-gray-500 bg-white group hover:border-gray-300 transition-colors'>
                  <span className='capitalize'>{selectedSubcategory}</span>
                  <X
                    size={14}
                    className='cursor-pointer hover:text-gray-900 transition-colors'
                    onClick={() => setSelectedSubcategory('')}
                  />
                </div>
              )}
              {priceRange.map(item => (
                <div key={item} className='flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full text-[11px] text-gray-500 bg-white group hover:border-gray-300 transition-colors'>
                  <span>₹{item.replace('+', ' and above')}</span>
                  <X
                    size={14}
                    className='cursor-pointer hover:text-gray-900 transition-colors'
                    onClick={() => togglePriceRange({ target: { value: item } })}
                  />
                </div>
              ))}
              {selectedSizes.map(item => (
                <div key={item} className='flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full text-[11px] text-gray-500 bg-white group hover:border-gray-300 transition-colors'>
                  <span className='uppercase font-bold text-[10px]'>{item}</span>
                  <X
                    size={14}
                    className='cursor-pointer hover:text-gray-900 transition-colors'
                    onClick={() => toggleSize(item)}
                  />
                </div>
              ))}
              <button
                onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); setSelectedSizes([]); setPriceRange([]); }}
                className='text-sm font-medium text-gray-900 hover:underline ml-2 uppercase tracking-widest text-[10px]'
              >
                Clear all
              </button>
            </div>
          )}

          {/* Map Products */}
          <motion.div
            layout
            className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16'
          >
            <AnimatePresence mode='popLayout'>
              {
                filterProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((item, index) => (
                  <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} isCollection={true} category={item.subcategory || item.productType} limitedDrop={item.limitedDrop} inStock={item.inStock} />
                ))
              }
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {filterProducts.length > productsPerPage && (
            <div className='mt-24 flex flex-col items-center gap-8'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className={`px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === 1 ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-900 text-gray-900 hover:bg-black hover:text-white shadow-sm'}`}
                >
                  Previous
                </button>

                <div className='flex items-center gap-2'>
                  {[...Array(Math.ceil(filterProducts.length / productsPerPage))].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => { setCurrentPage(index + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-full text-[10px] font-bold transition-all ${currentPage === index + 1 ? 'bg-black text-white' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filterProducts.length / productsPerPage))); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === Math.ceil(filterProducts.length / productsPerPage)}
                  className={`px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === Math.ceil(filterProducts.length / productsPerPage) ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-900 text-gray-900 hover:bg-black hover:text-white shadow-sm'}`}
                >
                  Next
                </button>
              </div>

              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]'>
                Showing {Math.min((currentPage - 1) * productsPerPage + 1, filterProducts.length)}-{Math.min(currentPage * productsPerPage, filterProducts.length)} of {filterProducts.length} items
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Collection;
