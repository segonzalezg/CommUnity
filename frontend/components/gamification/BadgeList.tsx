"use client";

import { Badge, Achievement } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

export interface BadgeListProps {
  achievements: Achievement[];
  badges: Badge[];
}

export function BadgeList({ achievements, badges }: BadgeListProps) {
  const getBadgeById = (badgeId: string) => {
    return badges.find((b) => b.id === badgeId);
  };

  const rarityColors = {
    common: "bg-gray-100 text-gray-700 border-gray-300",
    rare: "bg-blue-100 text-blue-700 border-blue-300",
    epic: "bg-purple-100 text-purple-700 border-purple-300",
    legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => {
        const badge = getBadgeById(achievement.badgeId);
        if (!badge) return null;

        return (
          <Card key={achievement.id} className="relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 px-2 py-1 text-xs font-medium border-b border-l rounded-bl-lg ${rarityColors[badge.rarity]}`}
            >
              {badge.rarity.toUpperCase()}
            </div>
            <CardContent className="p-6 text-center">
              {badge.iconUrl ? (
                <img
                  src={badge.iconUrl}
                  alt={badge.name}
                  className="w-16 h-16 mx-auto mb-4"
                />
              ) : (
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {badge.name.charAt(0)}
                </div>
              )}
              <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
              <div className="text-xs text-gray-500">
                Earned {formatDate(achievement.earnedAt)}
              </div>
              <div className="mt-2 text-xs text-blue-600 font-medium">
                +{badge.xpReward} XP
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

