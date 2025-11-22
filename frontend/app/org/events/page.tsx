"use client";

import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";

export default function OrgEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - will connect to API later
    const mockEvents: Event[] = [
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
        title: "Beach Cleanup Day",
        description: "Join us for a beach cleanup to protect marine life",
        startDate: new Date(Date.now() + 345600000).toISOString(),
        endDate: new Date(Date.now() + 345600000 + 1800000).toISOString(),
        location: "Sunset Beach",
        maxVolunteers: 50,
        currentVolunteers: 32,
        category: "Environment",
        tags: ["environment", "beach"],
        organizationId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
    ];

    setEvents(mockEvents);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Events
            </h1>
            <p className="text-gray-600">Manage all your organization's events</p>
          </div>
          <Button href="/org/events/create">Create New Event</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} hover>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle>{event.title}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      event.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {event.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
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
                    {formatDate(event.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {event.currentVolunteers} / {event.maxVolunteers}{" "}
                    volunteers
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1" href={`/org/events/${event.id}`}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Volunteers
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

