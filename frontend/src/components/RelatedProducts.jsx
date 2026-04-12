import React, { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { motion } from "framer-motion"

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)

  const related = products
    .filter(
      (item) =>
        item.category === category &&
        item.subCategory === subCategory
    )
    .slice(0, 5)

  if (related.length === 0) return null

  return (
    <div className="py-24 border-t border-gray-50 bg-canvas/30">
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Title text1={"RELATED"} text2={"DROPS"} />
          <p className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase mt-4">Discover similar styles from our collections</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10 justify-items-center"
        >
          {related.map((item) => (
            <div key={item._id} className="w-full">
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                category={item.category}
                isCollection={true}
                limitedDrop={item.limitedDrop}
                inStock={item.inStock}
              />
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}

export default RelatedProducts
