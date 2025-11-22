"use client";

import { cn } from "@/lib/utils";

export interface XPBarProps {
  currentXP: number;
  level: number;
  className?: string;
}

export function XPBar({ currentXP, level, className }: XPBarProps) {
  const xpForCurrentLevel = level * 500;
  const xpForNextLevel = (level + 1) * 500;
  const xpInCurrentLevel = currentXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            Level {level}
          </span>
          <span className="text-xs text-gray-500">
            {xpInCurrentLevel} / {xpNeededForNextLevel} XP
          </span>
        </div>
        <span className="text-sm font-semibold text-blue-600">
          {currentXP} Total XP
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
