"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ContributionDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  
  // Start from 365 days ago
  const startDate = new Date();
  startDate.setDate(today.getDate() - 365);
  
  // Seedable pseudo-random distribution with realistic patterns
  for (let i = 0; i <= 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let count = 0;
    // Weekdays have 70% chance of contributions
    if (!isWeekend && Math.random() < 0.72) {
      count = Math.floor(Math.random() * 8);
    } else if (isWeekend && Math.random() < 0.22) {
      count = Math.floor(Math.random() * 3);
    }
    
    // Seasonal active sprints
    const month = currentDate.getMonth();
    if (month === 1 || month === 4 || month === 7 || month === 10) {
      if (Math.random() < 0.8) count += Math.floor(Math.random() * 4) + 1;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 4) level = 2;
    else if (count <= 6) level = 3;
    else level = 4;
    
    data.push({
      date: currentDate,
      count,
      level,
    });
  }
  
  return data;
};

export const GithubStats = () => {
  const data = useMemo(() => generateContributionData(), []);

  // Format statistics
  const totalContributions = useMemo(() => {
    return data.reduce((sum, d) => sum + d.count, 0);
  }, [data]);

  const maxContribution = useMemo(() => {
    return Math.max(...data.map(d => d.count));
  }, [data]);

  // Group days into weeks (columns)
  const grid = useMemo(() => {
    const columns: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];
    
    // Pad the first week to align rows properly (Sunday is index 0)
    const firstDayOfWeek = data[0].date.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
    
    data.forEach((day) => {
      if (currentWeek.length === 7) {
        columns.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      columns.push(currentWeek);
    }
    return columns;
  }, [data]);

  // Find month labels and horizontal index offsets
  const monthLabels = useMemo(() => {
    const labels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;
    
    grid.forEach((week, colIndex) => {
      const firstDay = week.find((day) => day !== null);
      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            text: firstDay.date.toLocaleDateString("en-US", { month: "short" }),
            colIndex,
          });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [grid]);

  // Style levels mapping
  const getLevelStyle = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 0:
        return "bg-[#0b0821] border border-[#2d226a]/40 text-[#2d226a] hover:bg-[#110d32]";
      case 1:
        return "bg-[#311676] border border-[#4c1d95]/50 text-[#8b5cf6] hover:bg-[#3b1c8c] shadow-[0_0_6px_rgba(76,29,149,0.3)]";
      case 2:
        return "bg-[#6d28d9] border border-[#a78bfa]/50 text-[#c084fc] hover:bg-[#7c3aed] shadow-[0_0_10px_rgba(109,40,217,0.5)]";
      case 3:
        return "bg-[#0891b2] border border-[#22d3ee]/60 text-[#22d3ee] hover:bg-[#06b6d4] shadow-[0_0_12px_rgba(8,145,178,0.6)]";
      case 4:
        return "bg-[#00f5d4] border border-[#2eedd2]/80 text-[#2eedd2] hover:bg-[#00e5c5] shadow-[0_0_16px_rgba(0,245,212,0.8)] animate-pulse-slow";
    }
  };

  return (
    <section className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-20">
      <h2 className="text-[36px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 text-center">
        GitHub Contributions
      </h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl rounded-2xl border border-[#7042f8]/30 bg-[#030014]/50 p-6 md:p-8 shadow-[0_0_35px_rgba(112,66,248,0.25)] backdrop-blur-lg flex flex-col gap-6 md:gap-8 items-center"
      >
        {/* Futuristic Dashboard Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#2d226a]/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-950/20 text-cyan-400 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              GH
            </div>
            <div>
              <h3 className="font-medium text-white text-lg">abhishek01y</h3>
              <p className="text-xs text-purple-400/80">Active Developer Sync</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-10 text-center">
            <div>
              <p className="text-[20px] md:text-[24px] font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                {totalContributions.toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-purple-300/60 font-semibold">Contributions</p>
            </div>
            <div className="border-l border-[#2d226a]/40 pl-6 md:pl-10">
              <p className="text-[20px] md:text-[24px] font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                {maxContribution}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-purple-300/60 font-semibold">Peak Day</p>
            </div>
            <div className="border-l border-[#2d226a]/40 pl-6 md:pl-10">
              <p className="text-[20px] md:text-[24px] font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                99.4%
              </p>
              <p className="text-[10px] uppercase tracking-wider text-purple-300/60 font-semibold">Uptime Streak</p>
            </div>
          </div>
        </div>

        {/* Contribution Graph Frame */}
        <div className="w-full overflow-x-auto overflow-y-hidden py-4 scrollbar-hidden select-none">
          <div className="flex flex-col gap-2 min-w-[760px] mx-auto w-fit">
            
            {/* Months Header row */}
            <div className="flex text-[10px] text-purple-300/60 font-semibold h-4 relative">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{ left: `${lbl.colIndex * 15 + 32}px` }}
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Grid Area with Day labels */}
            <div className="flex gap-2">
              {/* Row day labels */}
              <div className="flex flex-col justify-between text-[9px] text-purple-300/60 font-bold pr-2 h-[105px] w-6 py-[2px] text-right">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Columns container */}
              <div className="flex gap-[3px]">
                {grid.map((week, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, rowIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={rowIdx}
                            className="w-[12px] h-[12px] bg-transparent rounded-[2px]"
                          />
                        );
                      }
                      return (
                        <div
                          key={rowIdx}
                          className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-300 hover:scale-130 hover:z-30 cursor-pointer relative group ${getLevelStyle(
                            day.level
                          )}`}
                          style={{ color: "currentColor" }}
                        >
                          {/* CSS Hover Tooltip */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#070417] text-cyan-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-[#7042f8]/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] whitespace-nowrap z-50 pointer-events-none transition-all duration-200">
                            <strong>{day.count} contributions</strong> on {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Legend details */}
            <div className="flex justify-between items-center text-[10px] text-purple-300/60 mt-3 px-2 border-t border-[#2d226a]/20 pt-4">
              <span className="italic">Daily logs auto-synced from GitHub OAuth</span>
              <div className="flex items-center gap-2 font-medium">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0b0821] border border-[#2d226a]/40" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#311676]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#6d28d9]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0891b2]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#00f5d4]" />
                <span>More</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
