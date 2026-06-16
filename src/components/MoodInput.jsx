import React, { useState } from "react";
import { GraduationCap, Users, Moon, Smartphone, Sparkles, BookOpen, Check, SmilePlus, Smile, Meh, Frown, Angry } from "lucide-react";

export default function MoodInput({ onSaveRecord }) {
  const [selectedMood, setSelectedMood] = useState("good");
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState("");

  const moods = [
    { id: "happy", label: "Amazing", icon: SmilePlus, color: "text-emerald-500", bg: "bg-emerald-50/60 border-emerald-100" },
    { id: "good", label: "Good", icon: Smile, color: "text-blue-500", bg: "bg-blue-50/60 border-blue-100" },
    { id: "neutral", label: "Neutral", icon: Meh, color: "text-gray-400", bg: "bg-gray-100/80 border-gray-200" },
    { id: "sad", label: "Not great", icon: Frown, color: "text-orange-400", bg: "bg-orange-50/60 border-orange-100" },
    { id: "angry", label: "Awful", icon: Angry, color: "text-red-500", bg: "bg-red-50/60 border-red-100" },
  ];

  const factors = [
    { id: "School", icon: GraduationCap, label: "School" },
    { id: "Friends", icon: Users, label: "Friends" },
    { id: "Sleep", icon: Moon, label: "Sleep" },
    { id: "Social Media", icon: Smartphone, label: "Social Media" },
    { id: "Other", icon: Sparkles, label: "Other" },
  ];

  const toggleFactor = (id) => {
    setSelectedFactors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    onSaveRecord({
      mood: selectedMood,
      factors: selectedFactors,
      note,
    });
    setNote("");
    setSelectedFactors([]);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/60 shadow-xs relative">

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">1. How are you feeling today?</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Your feelings matter. Choose one that fits you best.</p>

        <div className="grid grid-cols-5 gap-2 md:gap-3 mt-4">
          {moods.map((m) => {
            const Icon = m.icon;
            const active = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`group flex flex-col items-center p-3.5 md:p-4 rounded-2xl border transition-all relative ${
                  active
                    ? `${m.bg} shadow-md shadow-gray-100/50 scale-[1.02]`
                    : "border-gray-100/70 bg-white/50 hover:bg-white"
                }`}
              >
                {active && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-xs">
                    <Check size={8} className="text-indigo-600 font-bold" />
                  </div>
                )}

                <div className={`p-1 transition-transform group-hover:scale-110 ${active ? m.color : 'text-gray-400'}`}>
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                <span className={`text-[10px] font-bold mt-2 tracking-tight ${active ? 'text-gray-700' : 'text-gray-400'}`}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          2. What influenced your mood? <span className="text-[10px] text-gray-400 font-normal lowercase">(optional)</span>
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">
          {factors.map((f) => {
            const Icon = f.icon;
            const active = selectedFactors.includes(f.id);

            return (
              <button
                key={f.id}
                onClick={() => toggleFactor(f.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-white/90 border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <Icon size={13} className={active ? "text-white" : "text-gray-400"} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          <BookOpen size={13} className="text-gray-400" />
          Add a short note
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write down any thoughts, goals or reminders..."
          rows={2}
          className="w-full p-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-xs text-gray-600 outline-none focus:border-indigo-200 focus:bg-white transition-all placeholder-gray-400 shadow-2xs resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-500 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-indigo-100 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        Save Entry
      </button>
    </div>
  );
}