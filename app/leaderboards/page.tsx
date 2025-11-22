"use client";

import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { LeaderboardEntry, UserRole } from "@/types";

export default function LeaderboardsPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "all" | "month" | "week"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - will connect to API later
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: "1",
        user: {
          id: "1",
          email: "user1@example.com",
          username: "volunteer1",
          displayName: "Alice Johnson",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          xp: 3500,
          level: 8,
        },
        xp: 3500,
        level: 8,
        rank: 1,
        badgesCount: 12,
      },
      {
        userId: "2",
        user: {
          id: "2",
          email: "user2@example.com",
          username: "volunteer2",
          displayName: "Bob Smith",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          xp: 2800,
          level: 6,
        },
        xp: 2800,
        level: 6,
        rank: 2,
        badgesCount: 9,
      },
      {
        userId: "3",
        user: {
          id: "3",
          email: "user3@example.com",
          username: "volunteer3",
          displayName: "Charlie Brown",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          xp: 2400,
          level: 5,
        },
        xp: 2400,
        level: 5,
        rank: 3,
        badgesCount: 8,
      },
      {
        userId: "4",
        user: {
          id: "4",
          email: "user4@example.com",
          username: "volunteer4",
          displayName: "Diana Prince",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          xp: 2100,
          level: 5,
        },
        xp: 2100,
        level: 5,
        rank: 4,
        badgesCount: 7,
      },
      {
        userId: "5",
        user: {
          id: "5",
          email: "user5@example.com",
          username: "volunteer5",
          displayName: "Eve Wilson",
          isEmailVerified: true,
          isActive: true,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          xp: 1800,
          level: 4,
        },
        xp: 1800,
        level: 4,
        rank: 5,
        badgesCount: 6,
      },
    ];

    setLeaderboard(mockLeaderboard);
    setLoading(false);
  }, [selectedPeriod]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-50 border-yellow-200";
    if (rank === 2) return "bg-gray-50 border-gray-200";
    if (rank === 3) return "bg-orange-50 border-orange-200";
    return "bg-white border-gray-200";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Leaderboards
          </h1>
          <p className="text-gray-600">
            See who&apos;s making the biggest impact in the community
          </p>
        </div>

        {/* Period Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPeriod("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setSelectedPeriod("month")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedPeriod("week")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Week
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Top Volunteers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`p-4 border-l-4 ${getRankColor(entry.rank)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-400 w-12 text-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {entry.user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {entry.user.displayName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{entry.user.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Level</div>
                        <div className="text-lg font-bold text-blue-600">
                          {entry.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">XP</div>
                        <div className="text-lg font-bold text-purple-600">
                          {entry.xp.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Badges</div>
                        <div className="text-lg font-bold text-yellow-600">
                          {entry.badgesCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
