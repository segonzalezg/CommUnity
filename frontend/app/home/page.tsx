"use client";

import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { XPBar } from "@/components/gamification/XPBar";
import { useEffect, useState } from "react";
import { User, Event, UserRole } from "@/types";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - will connect to API later
    setUser({
      id: "1",
      email: "user@example.com",
      username: "volunteer123",
      displayName: "John Doe",
      avatarUrl: undefined,
      bio: "Passionate volunteer",
      isEmailVerified: true,
      isActive: true,
      role: UserRole.USER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      xp: 1250,
      level: 5,
    });

    setUpcomingEvents([
      {
        id: "1",
        title: "Community Garden Cleanup",
        description: "Help clean up and maintain the community garden",
        startDate: new Date(Date.now() + 86400000).toISOString(),
        endDate: new Date(Date.now() + 86400000 + 3600000).toISOString(),
        location: "Central Park",
        maxVolunteers: 20,
        currentVolunteers: 12,
        category: "Environment",
        tags: ["gardening", "community"],
        organizationId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
      {
        id: "2",
        title: "Food Bank Distribution",
        description: "Help distribute food to families in need",
        startDate: new Date(Date.now() + 172800000).toISOString(),
        endDate: new Date(Date.now() + 172800000 + 7200000).toISOString(),
        location: "Community Center",
        maxVolunteers: 15,
        currentVolunteers: 8,
        category: "Social",
        tags: ["food", "charity"],
        organizationId: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.displayName || "Volunteer"}!
          </h1>
          <p className="text-blue-100 dark:text-blue-200">
            Continue making a difference in your community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Level {user?.level || 1}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user?.xp || 0} XP earned
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>XP Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <XPBar currentXP={user?.xp || 0} level={user?.level || 1} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events Joined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                12
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total events
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <Button variant="outline" href="/events">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} hover>
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
                  />
                )}
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(event.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {event.currentVolunteers} / {event.maxVolunteers}{" "}
                      volunteers
                    </span>
                    <Button size="sm" href={`/events/${event.id}`}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
