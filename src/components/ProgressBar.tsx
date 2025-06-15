
import React from "react";

interface ProgressBarProps {
  active: number;
  total: number;
}

export default function ProgressBar({ active, total }: ProgressBarProps) {
  const percent = Math.round((active / total) * 100);
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center text-xs mb-1 px-1">
        <span>Outils disponibles : <b className="text-green-600">{active}</b> / {total}</span>
        <span className="font-semibold">{percent}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-sm">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-indigo-500 to-fuchsia-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
