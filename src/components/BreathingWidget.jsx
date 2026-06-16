import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind } from "lucide-react";

export default function BreathingWidget({ isOpen, onClose }) {
  const [phase, setPhase] = useState("Inhale");
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            setPhase((curr) => {
              if (curr === "Inhale") return "Hold";
              if (curr === "Hold") return "Exhale";
              return "Inhale";
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPhase("Inhale");
      setSeconds(4);
    }
    return () => clearInterval(interval);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  const phaseConfig = {
    Inhale: { text: "Breathe In", color: "text-indigo-600/90", scale: 1.4 },
    Hold: { text: "Hold", color: "text-purple-600/90", scale: 1.4 },
    Exhale: { text: "Breathe Out", color: "text-indigo-500/90", scale: 0.95 },
  };

  return (
    <div className="fixed inset-0 bg-[#F4F2FF]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 z-50 overflow-hidden select-none">

      <div className="flex flex-col items-center justify-center max-w-md w-full text-center space-y-12">

        <div className="relative w-64 h-64 flex items-center justify-center">

          <motion.div
            animate={{ scale: phase === "Exhale" ? 0.95 : [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-indigo-200/40 rounded-full"
          />

          <motion.button
            onClick={onClose}
            animate={{ scale: phaseConfig[phase].scale }}
            transition={{ duration: phase === "Hold" ? 0 : 4, ease: "easeInOut" }}
            className="w-44 h-44 bg-white rounded-full flex flex-col items-center justify-center shadow-xl shadow-indigo-100/60 border border-indigo-50/50 cursor-pointer group active:scale-[0.97] transition-shadow hover:shadow-indigo-200/50"
          >
            <Wind size={44} className="text-indigo-500 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="text-2xl font-black mt-1.5 text-slate-700">{seconds}</span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity easeInOut">
              Tap to Exit
            </span>
          </motion.button>
        </div>

        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h2 className={`text-4xl font-black tracking-tight ${phaseConfig[phase].color}`}>
            {phaseConfig[phase].text}
          </h2>
          <p className="text-xs text-indigo-400/80 font-semibold tracking-wide max-w-xs mx-auto">
            Click the white button at any time to stop.
          </p>
        </motion.div>

      </div>
    </div>
  );
}