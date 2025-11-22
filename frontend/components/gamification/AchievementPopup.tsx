"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/types";
import { Card } from "@/components/ui/Card";

export interface AchievementPopupProps {
  badge: Badge | null;
  onClose: () => void;
}

export function AchievementPopup({ badge, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge || !isVisible) return null;

  const rarityColors = {
    common: "from-gray-400 to-gray-600",
    rare: "from-blue-400 to-blue-600",
    epic: "from-purple-400 to-purple-600",
    legendary: "from-yellow-400 to-yellow-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <Card className="max-w-md w-full animate-scale-in">
        <div
          className={`bg-gradient-to-br ${rarityColors[badge.rarity]} p-8 text-center text-white rounded-t-lg`}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
          <p className="text-lg opacity-90">{badge.name}</p>
        </div>
        <div className="p-6">
          <div className="text-center mb-4">
            {badge.iconUrl ? (
              <img
                src={badge.iconUrl}
                alt={badge.name}
                className="w-24 h-24 mx-auto mb-4"
              />
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {badge.name.charAt(0)}
              </div>
            )}
            <p className="text-gray-700 mb-2">{badge.description}</p>
            <div className="text-sm text-blue-600 font-medium">
              +{badge.xpReward} XP earned!
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Awesome!
          </button>
        </div>
      </Card>
    </div>
  );
}

