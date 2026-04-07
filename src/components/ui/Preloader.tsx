import React from 'react';
import { motion } from 'motion/react';

const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0e12] overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        
        {/* Container for the whole animation */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 -mt-20">
          
          {/* Rotating 3D Gyroscope Rings - these spin freely */}
          <motion.div
            animate={{
              rotateX: [0, 180, 360],
              rotateY: [0, 360, 720],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 left-0 w-full h-full border-[1.5px] border-[#ffc107]/20 rounded-full"
                style={{
                  transform: `rotateX(${i * 22.5}deg) rotateY(${i * 22.5}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full absolute inset-0 rounded-full"
                >
                  <div className="absolute top-[-3px] left-1/2 w-2 h-2 bg-[#ffc107] shadow-[0_0_12px_#ffc107] rounded-full -translate-x-1/2" />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Static Bulb in Center - NOT inside the rotating container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            {/* Circular glowing container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#1d2025]/60 backdrop-blur-xl border border-[#ffc107]/30 flex items-center justify-center shadow-[0_0_60px_rgba(255,193,7,0.15)]"
            >
              {/* Floating bulb animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  filter: [
                    "drop-shadow(0 0 15px rgba(255,193,7,0.4))",
                    "drop-shadow(0 0 30px rgba(255,193,7,0.7))",
                    "drop-shadow(0 0 15px rgba(255,193,7,0.4))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/images/devailabsicon.png" alt="Dev AI Labs Icon" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]" />
              </motion.div>
            </motion.div>

            {/* Pulsing ring around the circle */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-[#ffc107]/30"
            />
          </div>
        </div>

        {/* Text and Loading Indicators underneath */}
        <div className="absolute bottom-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center gap-4"
          >
             <h1 className="text-4xl md:text-5xl font-black font-headline text-white tracking-tight uppercase shadow-black drop-shadow-lg">
                Dev <span className="text-[#ffc107]">AI</span> Labs
             </h1>
          </motion.div>
          
          {/* Equalizer-style loading bars */}
          <div className="mt-8 flex items-end justify-center gap-1.5 h-8">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: ['8px', '28px', '8px'] }} 
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} 
                className="w-1.5 bg-[#ffc107] rounded-full" 
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="text-[10px] md:text-sm font-label text-white uppercase tracking-[0.5em] mt-8 text-center"
          >
            Initializing System Core
          </motion.p>
        </div>
      </div>
      
      {/* 3D Environment Floor / Grid */}
      <div 
        className="absolute bottom-[-10%] w-[200vw] h-[60vh] flex justify-center pointer-events-none"
        style={{ transformOrigin: 'top center', transform: 'perspective(1000px) rotateX(75deg)' }}
      >
        <div className="absolute inset-0 bg-[#0c0e12] [mask-image:linear-gradient(to_bottom,transparent,black)]">
          <motion.div
            animate={{ backgroundPosition: ['0px 0px', '0px 3rem'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-[100vw] h-[100vh] absolute top-[-50vh] left-1/2 -translate-x-1/2 border-t border-[#ffc107]/20 bg-[linear-gradient(to_right,#ffc1071a_1px,transparent_1px),linear-gradient(to_bottom,#ffc1071a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"
          />
        </div>
      </div>
      
      {/* Intense center glow behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffc107] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />
    </motion.div>
  );
};

export default Preloader;
