import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 50; // Base delivery fee
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [userAddresses, setUserAddresses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const hasShownBackendOfflineToast = useRef(false);
    const navigate = useNavigate();

    const handleApiError = (error, fallbackMessage = 'Something went wrong') => {
        console.log(error);

        const isNetworkError = error.code === 'ERR_NETWORK' || !error.response;
        if (isNetworkError) {
            if (!hasShownBackendOfflineToast.current) {
                toast.error('Backend is offline. Start the backend server and check the MongoDB connection.');
                hasShownBackendOfflineToast.current = true;
            }
            return;
        }

        hasShownBackendOfflineToast.current = false;
        toast.error(error.response?.data?.message || error.message || fallbackMessage);
    }

    const getApiUrl = (path) => {
        if (!backendUrl) {
            return null;
        }

        return `${backendUrl}${path}`;
    }

    const getUserProfile = async (token) => {
        const profileUrl = getApiUrl('/api/user/profile');
        if (!profileUrl) return;
        try {
            const response = await axios.get(profileUrl, { headers: { token } })
            if (response.data.success) {
                setUserData(response.data.userData)
                setUserAddresses(response.data.userData.addresses || [])
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const addUserAddress = async (address) => {
        if (token) {
            const addAddressUrl = getApiUrl('/api/user/add-address');
            if (!addAddressUrl) return false;
            try {
                const response = await axios.post(addAddressUrl, { address }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                    getUserProfile(token)
                    return true
                }
            } catch (error) {
                handleApiError(error)
            }
        }
        return false
    }

    const removeUserAddress = async (index) => {
        if (token) {
            const removeAddressUrl = getApiUrl('/api/user/remove-address');
            if (!removeAddressUrl) return;
            try {
                const response = await axios.post(removeAddressUrl, { index }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                    getUserProfile(token)
                }
            } catch (error) {
                handleApiError(error)
            }
        }
    }

    const updateUserAddress = async (index, address) => {
        if (token) {
            const updateAddressUrl = getApiUrl('/api/user/update-address');
            if (!updateAddressUrl) return false;
            try {
                const response = await axios.post(updateAddressUrl, { index, address }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                    getUserProfile(token)
                    return true
                }
            } catch (error) {
                handleApiError(error)
            }
        }
        return false
    }

    const addToCart = async (itemId, size) => {
        let itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo && itemInfo.inStock === false) {
            toast.error('Product is out of stock');
            return;
        }

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            const addToCartUrl = getApiUrl('/api/cart/add');
            if (!addToCartUrl) return;
            try {
                await axios.post(addToCartUrl, { itemId, size }, { headers: { token } })
            } catch (error) {
                handleApiError(error)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            const updateCartUrl = getApiUrl('/api/cart/update');
            if (!updateCartUrl) return;
            try {
                await axios.post(updateCartUrl, { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                handleApiError(error)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getDeliveryFee = () => {
        const amount = getCartAmount();
        return (amount > 1000 || amount === 0) ? 0 : delivery_fee;
    }

    const removeFromCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);

        if (token) {
            const removeFromCartUrl = getApiUrl('/api/cart/update');
            if (!removeFromCartUrl) return;
            try {
                await axios.post(removeFromCartUrl, { itemId, size, quantity: 0 }, { headers: { token } })
            } catch (error) {
                handleApiError(error)
            }
        }
    }

    const decrementQuantity = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size] > 1) {
            cartData[itemId][size] -= 1;
            setCartItems(cartData);
        } else {
            removeFromCart(itemId, size);
        }
    }

    const updateSize = async (itemId, oldSize, newSize) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][oldSize]) {
            const quantity = cartData[itemId][oldSize];
            
            // Local update
            delete cartData[itemId][oldSize];
            cartData[itemId][newSize] = (cartData[itemId][newSize] || 0) + quantity;
            setCartItems(cartData);

            // Backend sync
            if (token) {
                const updateCartUrl = getApiUrl('/api/cart/update');
                if (!updateCartUrl) return;
                try {
                    // Set old size quantity to 0
                    await axios.post(updateCartUrl, { itemId, size: oldSize, quantity: 0 }, { headers: { token } })
                    // Set new size to updated quantity
                    await axios.post(updateCartUrl, { itemId, size: newSize, quantity: cartData[itemId][newSize] }, { headers: { token } })
                } catch (error) {
                    handleApiError(error)
                }
            }
        }
    }

    const getUserCart = async (token) => {
        const getCartUrl = getApiUrl('/api/cart/get');
        if (!getCartUrl) return;
        try {
            const response = await axios.post(getCartUrl, {}, { headers: { token } })
            if (response.data.success) {
                hasShownBackendOfflineToast.current = false;
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const getUserWishlist = async (token) => {
        const wishlistUrl = getApiUrl('/api/user/wishlist');
        if (!wishlistUrl) return;
        try {
            const response = await axios.get(wishlistUrl, { headers: { token } })
            if (response.data.success) {
                hasShownBackendOfflineToast.current = false;
                setWishlist(response.data.wishlistData)
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const toggleWishlist = async (itemId) => {
        let wishlistCopy = [...wishlist];
        if (wishlistCopy.includes(itemId)) {
            wishlistCopy = wishlistCopy.filter(id => id !== itemId);
            setWishlist(wishlistCopy);
            toast.success('Removed from Wishlist');
            if (token) {
                const removeWishlistUrl = getApiUrl('/api/user/remove-wishlist');
                if (!removeWishlistUrl) return;
                try {
                    await axios.post(removeWishlistUrl, { itemId }, { headers: { token } })
                } catch (error) {
                    handleApiError(error);
                }
            }
        } else {
            wishlistCopy.push(itemId);
            setWishlist(wishlistCopy);
            toast.success('Added to Wishlist');
            if (token) {
                const addWishlistUrl = getApiUrl('/api/user/add-wishlist');
                if (!addWishlistUrl) return;
                try {
                    await axios.post(addWishlistUrl, { itemId }, { headers: { token } })
                } catch (error) {
                    handleApiError(error);
                }
            }
        }
    }

    const getProductsData = async (filters = {}) => {
        const productListUrl = getApiUrl('/api/product/list');
        if (!productListUrl) {
            setProducts([]);
            return;
        }
        try {
            const queryParams = new URL(productListUrl);
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    queryParams.searchParams.append(key, Array.isArray(filters[key]) ? filters[key].join(',') : filters[key]);
                }
            });

            const response = await axios.get(queryParams.href)
            if (response.data.success) {
                hasShownBackendOfflineToast.current = false;
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const fetchCategories = async () => {
        const categoriesUrl = getApiUrl('/api/product/categories');
        if (!categoriesUrl) {
            setCategories([]);
            setSubCategories([]);
            return;
        }
        try {
            const response = await axios.get(categoriesUrl)
            if (response.data.success) {
                setCategories(response.data.categories || [])
                setSubCategories(response.data.subcategories || [])
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        }
    }

    const addReview = async (productId, rating, comment) => {
        if (!token) {
            toast.error("Please login to submit a review");
            return { success: false };
        }
        try {
            const addReviewUrl = getApiUrl('/api/reviews/add');
            if (!addReviewUrl) return { success: false };
            const response = await axios.post(addReviewUrl, { productId, rating, comment }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                return { success: true };
            } else {
                toast.error(response.data.message);
                return { success: false };
            }
        } catch (error) {
            handleApiError(error);
            return { success: false };
        }
    }

    const getProductReviews = async (productId) => {
        const productReviewsUrl = getApiUrl('/api/reviews/product');
        if (!productReviewsUrl) return [];
        try {
            const response = await axios.post(productReviewsUrl, { productId });
            if (response.data.success) {
                return response.data.reviews;
            }
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const deleteReview = async (reviewId) => {
        if (!token) {
            toast.error("Please login to delete your review");
            return { success: false };
        }
        try {
            const deleteReviewUrl = getApiUrl('/api/reviews/delete');
            if (!deleteReviewUrl) return { success: false };
            const response = await axios.post(deleteReviewUrl, { reviewId }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                return { success: true };
            } else {
                toast.error(response.data.message);
                return { success: false };
            }
        } catch (error) {
            handleApiError(error);
            return { success: false };
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        if (!backendUrl && !hasShownBackendOfflineToast.current) {
            toast.error('Backend URL is not configured. Set VITE_BACKEND_URL in the frontend environment.');
            hasShownBackendOfflineToast.current = true;
        }

        getProductsData();
        fetchCategories();
    }, [])

    useEffect(() => {
        if (!token) {
            setCartItems({});
            setWishlist([]);
            setUserData(null);
            setUserAddresses([]);
            return;
        }

        getUserCart(token);
        getUserWishlist(token);
        getUserProfile(token);
    }, [token])

    const requestReturn = async (orderId, reason) => {
        if (!token) {
            toast.error("Please login to request a return");
            return { success: false };
        }
        try {
            const returnOrderUrl = getApiUrl('/api/order/return');
            if (!returnOrderUrl) return { success: false };
            const response = await axios.post(returnOrderUrl, { orderId, reason }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                return { success: true };
            } else {
                toast.error(response.data.message);
                return { success: false };
            }
        } catch (error) {
            handleApiError(error);
            return { success: false };
        }
    }

    const value = {
        products, currency, delivery_fee, getDeliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, setCartItems,
        removeFromCart, decrementQuantity, updateSize,
        wishlist, setWishlist, toggleWishlist,
        showLogin, setShowLogin,
        categories, subCategories, getProductsData,
        addReview, getProductReviews, deleteReview,
        userData, setUserData, userAddresses,
        getUserProfile, addUserAddress, removeUserAddress, updateUserAddress,
        requestReturn
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
