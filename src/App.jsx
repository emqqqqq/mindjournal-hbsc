import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BgradientAnim } from "./components/ui/BgradientAnim";

import cloudImg from './assets/cloud.png';
import { ChevronRight, Heart, Home, ArrowRight } from "lucide-react";

import MoodInput from "./components/MoodInput";
import BreathingWidget from "./components/BreathingWidget";

export default function App() {
  const [activeTab, setActiveTab] = useState("Today’s Reflection");
  const [view, setView] = useState("landing");
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);

  return (
    <div className="min-h-screen w-full font-sans antialiased overflow-x-hidden text-[#1A202C] relative">

      <div className="fixed inset-0 -z-20 pointer-events-none">
        <BgradientAnim animationDuration={22} />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl" />
      </div>

      <AnimatePresence mode="wait">

        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col px-6 py-8"
          >
            <header className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/60 backdrop-blur-xl shadow-sm flex items-center justify-center border border-white/40">
                <Heart className="text-indigo-500 fill-indigo-400" />
              </div>
              <h1 className="font-bold">MoodTracker</h1>
            </header>

            <main className="text-center max-w-3xl mx-auto flex-1 flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Track your emotions.
                <br />
                <span className="bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
                  Find your balance.
                </span>
              </h1>

              <p className="mt-6 text-gray-600">
                Track emotions, patterns and daily wellbeing with a calm,
                minimal experience.
              </p>

              <button
                onClick={() => setView("dashboard")}
                className="mt-10 px-7 py-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-md text-indigo-600 font-semibold flex items-center gap-2 mx-auto hover:scale-[1.02] transition"
              >
                Start Journey <ChevronRight size={18} />
              </button>
            </main>
          </motion.div>
        )}

        {view === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen bg-[#F4F6FA]/40 backdrop-blur-xs p-5 rounded-xl"
          >
            <aside className="w-20 md:w-64 bg-white backdrop-blur-xl border-r rounded-tl-xl rounded-bl-xl border-white/40 p-6 flex flex-col justify-between hidden sm:flex">
              <div>
                <div className="flex items-center gap-3 mb-10 pl-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center border border-white/50">
                    <Heart className="text-indigo-500 fill-indigo-400" size={18} />
                  </div>
                  <div className="hidden md:block">
                    <h2 className="font-bold text-sm text-gray-800 tracking-tight">MoodTracker</h2>
                    <p className="text-[10px] text-gray-400">Understand yourself. Feel better.</p>
                  </div>
                </div>

                <nav className="space-y-1">
                 {(() => {
                     const isActive = activeTab === "Today’s Reflection";

                     return (
                       <div
                         onClick={() => setActiveTab("Today’s Reflection")}
                         className={`relative flex items-center gap-3 px-5 py-3.5 rounded-r-2xl rounded-l-none cursor-pointer text-xs tracking-wide group transition-all ${
                           isActive
                             ? "text-indigo-600 bg-[#F4F2FF]/70"
                             : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                         }`}
                       >
                         {isActive && (
                           <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-indigo-600 rounded-r-full" />
                         )}

                         <Home
                           size={16}
                           strokeWidth={2.3}
                           className={isActive ? "text-indigo-600" : "text-gray-400 transition-colors"}
                         />
                         <span className={`hidden md:block tracking-tight ${
                           isActive ? "text-indigo-600 font-medium" : "text-gray-400 transition-colors"
                         }`}>
                           Today’s Reflection
                         </span>
                       </div>
                     );
                   })()}
                </nav>
              </div>

              <div className="hidden md:block bg-[#f8f7fd]/60 border bg-[#f8f7fd]/60 p-4 rounded-2xl text-center shadow-xs">
               <div className="w-24 h-24 flex items-center justify-center mx-auto shadow-xs overflow-hidden">
                 <motion.img
                     src={cloudImg}
                     alt="Cute Cloud"
                     className="w-24 h-24 object-contain"
                     animate={{ y: [0, -4, 0] }}
                     transition={{
                       duration: 3,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   />
               </div>
                <h4 className="font-bold text-xs text-gray-800">Take a deep breath</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 mb-3">You're doing great</p>

                <button
                  onClick={() => setIsBreathingOpen(true)}
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-[11px] font-semibold shadow-md shadow-indigo-100 flex items-center justify-center gap-1 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Start breathing
                </button>
              </div>
            </aside>

            <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1400px] mx-auto w-full bg-[#f8f7fd] rounded-tr-xl rounded-br-xl">

              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    Good morning, Alex!
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">How are you feeling today?</p>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <MoodInput/>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <BreathingWidget isOpen={isBreathingOpen} onClose={() => setIsBreathingOpen(false)} />
    </div>
  );
}