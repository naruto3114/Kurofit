import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const heroImages = [assets.hero_1, assets.hero_2, assets.hero_3];

const Hero = () => {
  const { navigate } = useContext(ShopContext);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[500px] sm:min-h-[calc(100vh-92px)] bg-white w-full overflow-hidden flex items-center">
      {/* Background Editorial Accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden sm:translate-y-20 translate-y-10">
        <span 
          style={{ WebkitTextStroke: '1px rgba(0,0,0,0.06)', color: 'transparent' }} 
          className="prata-regular text-[18vw] sm:text-[14vw] uppercase leading-[0.75] tracking-tighter block text-center"
        >
          GET YOUR <br />
          SELF INTO <br />
          RIGHT GEAR
        </span>
      </div>

      <div className="relative z-10 flex w-full flex-col-reverse items-center justify-center gap-10 px-4 md:flex-row py-10 sm:py-0">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >


          <h1 className="mt-6 text-[2.2rem] leading-[1.1] tracking-[-0.02em] text-black sm:text-[3.8rem] lg:text-[5rem] xl:text-[5.5rem]">
            Elevate Your <br className="hidden sm:block" />
            Shopping <br className="hidden sm:block" />
            Experience <br className="hidden sm:block" />
            Today!
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-gray-500 sm:text-[17px]">
            Refresh your style with on-trend pieces from our exclusive clothing
            collection. Anyone can get dressed up and glamorous.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => navigate("/collection")}
              className="rounded-xl bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800"
            >
              Explore Now
            </button>

            {/* dots */}
            <div className="flex items-center gap-2 opacity-70 scale-90">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-2 rounded-full transition-all ${activeImage === i
                      ? "w-8 bg-[#f06b2b]"
                      : "w-2 bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex w-full items-end justify-center self-stretch md:w-1/2 md:justify-end"
        >
          <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] h-full min-h-[420px] sm:min-h-[520px] md:min-h-[600px]">

            {/* SVG SHAPE */}
            <svg
              className="absolute inset-0 w-full h-full z-0"
              viewBox="0 0 400 500"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f06b2b" />
                  <stop offset="100%" stopColor="#ffd2a6" />
                </linearGradient>
              </defs>
              <path
                d="
                  M0,500 
                  L0,230
                  Q0,80 150,80 
                  L400,80 
                  L400,500 
                  Z
                "
                fill="url(#grad)"
              />
            </svg>

            {/* IMAGE */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={heroImages[activeImage]}
                alt="hero"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-[52%] -translate-x-1/2 h-[95%] object-contain z-10"
              />
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;