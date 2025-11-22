"use client";

import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Event, Organization } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Mock data - will connect to API later
    const mockEvent: Event = {
      id: params.id as string,
      title: "Community Garden Cleanup",
      description:
        "Join us for a day of community service at the local garden! We need volunteers to help with weeding, planting new flowers, and general maintenance. This is a great opportunity to give back to the community and meet like-minded people. All tools and materials will be provided. Please wear comfortable clothes and bring water. Lunch will be provided for all volunteers!",
      startDate: new Date(Date.now() + 86400000).toISOString(),
      endDate: new Date(Date.now() + 86400000 + 3600000).toISOString(),
      location: "Central Park, Main Garden Area",
      maxVolunteers: 20,
      currentVolunteers: 12,
      category: "Environment",
      tags: ["gardening", "community", "outdoor", "environment"],
      organizationId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };

    const mockOrg: Organization = {
      id: "1",
      name: "Green Community Initiative",
      slug: "green-community",
      description:
        "A non-profit organization dedicated to environmental conservation and community engagement.",
      logoUrl: undefined,
      isPublic: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: "1",
    };

    setEvent(mockEvent);
    setOrganization(mockOrg);
    setLoading(false);
  }, [params.id]);

  const handleRegister = () => {
    // TODO: Connect to API
    setIsRegistered(true);
    alert("Successfully registered for this event!");
  };

  const handleUnregister = () => {
    // TODO: Connect to API
    setIsRegistered(false);
    alert("Successfully unregistered from this event.");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg">Event not found</p>
            <Button className="mt-4" onClick={() => router.push("/events")}>
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  const spotsRemaining = (event.maxVolunteers || 0) - event.currentVolunteers;
  const isFull = spotsRemaining <= 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {event.category}
                  </span>
                  <span>
                    {formatDate(event.startDate)} • {event.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Start Date & Time
                  </h3>
                  <p className="text-gray-900">
                    {formatDateTime(event.startDate)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    End Date & Time
                  </h3>
                  <p className="text-gray-900">
                    {formatDateTime(event.endDate)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Location
                  </h3>
                  <p className="text-gray-900">{event.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Volunteers
                  </h3>
                  <p className="text-gray-900">
                    {event.currentVolunteers} / {event.maxVolunteers} registered
                    {!isFull && (
                      <span className="text-green-600 ml-2">
                        ({spotsRemaining} spots remaining)
                      </span>
                    )}
                    {isFull && (
                      <span className="text-red-600 ml-2">(Full)</span>
                    )}
                  </p>
                </div>
              </div>

              {organization && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Organized by
                  </h3>
                  <div className="flex items-center space-x-3">
                    {organization.logoUrl && (
                      <img
                        src={organization.logoUrl}
                        alt={organization.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {organization.name}
                      </p>
                      {organization.description && (
                        <p className="text-sm text-gray-600">
                          {organization.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                {isRegistered ? (
                  <Button
                    variant="danger"
                    onClick={handleUnregister}
                    className="flex-1"
                  >
                    Unregister from Event
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={isFull}
                    className="flex-1"
                  >
                    {isFull ? "Event Full" : "Register for Event"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
