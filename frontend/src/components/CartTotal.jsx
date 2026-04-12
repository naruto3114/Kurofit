import React, { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"

const CartTotal = () => {

  const { currency, delivery_fee, getDeliveryFee, getCartAmount, discount, couponInfo, getCartCount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const shippingFee = getDeliveryFee()
  let total = subtotal === 0 ? 0 : subtotal + shippingFee
  
  // Apply discount if any is found in context
  // if (discount > 0 && subtotal > 0) {
  //     total = total - discount;
  // }

  return (
    <div className="w-full">

      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-3 mt-4 text-sm">

        <div className="flex justify-between">
          <p className="text-gray-600">{getCartCount()} item{getCartCount() !== 1 ? 's' : ''}</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>

        {/* Free Shipping Progress Bar */}
        {subtotal > 0 && subtotal <= 1000 && (
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 my-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Free Shipping Goal
              </p>
              <p className="text-[10px] font-black text-black">
                {Math.min(100, (subtotal / 1000) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out bg-blue-500"
                style={{ width: `${Math.min(100, (subtotal / 1000) * 100)}%` }}
              ></div>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
              Add <span className="text-black">{currency}{(1000 - subtotal).toFixed(2)}</span> more to save <span className="text-black">{currency}{delivery_fee.toFixed(2)}</span>
            </p>
          </div>
        )}

        <hr className="opacity-50" />

        <div className="flex justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          <div className="text-right">
            <p className={shippingFee === 0 ? "text-green-600 font-bold" : "text-gray-900"}>
              {shippingFee === 0 ? "Free" : `${currency} ${shippingFee.toFixed(2)}`}
            </p>
            {shippingFee === 0 && subtotal > 0 && (
              <p className="text-[8px] text-gray-400 line-through">
                was {currency}{delivery_fee.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <hr />

        <div className="flex justify-between text-base font-semibold">
          <p>Total</p>
          <p>{currency} {total.toFixed(2)}</p>
        </div>

      </div>

    </div>
  )
}

export default CartTotal
