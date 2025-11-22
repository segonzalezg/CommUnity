/**
 * Mock Data for Matching Engine
 * Provides sample users and events for testing
 */

import { User, Event } from './matchEngine';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    skills: ['Teaching', 'Mentoring', 'Public Speaking', 'Childcare'],
    availability: [
      { dayOfWeek: 0, startTime: '09:00', endTime: '17:00' }, // Sunday
      { dayOfWeek: 1, startTime: '18:00', endTime: '21:00' }, // Monday evening
      { dayOfWeek: 5, startTime: '10:00', endTime: '16:00' }, // Saturday
    ],
    location: {
      latitude: 40.7128,
      longitude: -74.0060, // New York City
      address: 'New York, NY',
    },
    causePreferences: ['Education', 'Children', 'Youth Development'],
  },
  {
    id: 'user2',
    name: 'Bob Smith',
    skills: ['Cooking', 'Food Service', 'Event Planning'],
    availability: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '15:00' }, // Wednesday
      { dayOfWeek: 4, startTime: '10:00', endTime: '15:00' }, // Friday
      { dayOfWeek: 6, startTime: '08:00', endTime: '12:00' }, // Sunday morning
    ],
    location: {
      latitude: 40.7580,
      longitude: -73.9855, // Manhattan
      address: 'Manhattan, NY',
    },
    causePreferences: ['Hunger Relief', 'Food Security', 'Community'],
  },
  {
    id: 'user3',
    name: 'Carol Williams',
    skills: ['Medical', 'First Aid', 'Nursing', 'Health Education'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }, // Monday
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }, // Wednesday
      { dayOfWeek: 5, startTime: '10:00', endTime: '14:00' }, // Saturday
    ],
    location: {
      latitude: 40.7505,
      longitude: -73.9934, // Midtown Manhattan
      address: 'Midtown, NY',
    },
    causePreferences: ['Healthcare', 'Public Health', 'Elderly Care'],
  },
  {
    id: 'user4',
    name: 'David Brown',
    skills: ['Construction', 'Carpentry', 'Painting', 'General Maintenance'],
    availability: [
      { dayOfWeek: 0, startTime: '08:00', endTime: '16:00' }, // Sunday
      { dayOfWeek: 6, startTime: '08:00', endTime: '16:00' }, // Saturday
    ],
    location: {
      latitude: 40.6782,
      longitude: -73.9442, // Brooklyn
      address: 'Brooklyn, NY',
    },
    causePreferences: ['Housing', 'Community Development', 'Infrastructure'],
  },
  {
    id: 'user5',
    name: 'Emma Davis',
    skills: ['Marketing', 'Social Media', 'Graphic Design', 'Writing'],
    availability: [
      { dayOfWeek: 1, startTime: '19:00', endTime: '22:00' }, // Monday evening
      { dayOfWeek: 3, startTime: '19:00', endTime: '22:00' }, // Wednesday evening
      { dayOfWeek: 5, startTime: '13:00', endTime: '18:00' }, // Saturday afternoon
    ],
    location: {
      latitude: 40.7282,
      longitude: -73.9942, // Greenwich Village
      address: 'Greenwich Village, NY',
    },
    causePreferences: ['Arts', 'Environment', 'Animal Welfare'],
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'After-School Tutoring Program',
    description: 'Help elementary students with homework and reading',
    requiredSkills: ['Teaching', 'Mentoring', 'Patience'],
    eventDate: new Date('2024-02-04T14:00:00'), // Sunday 2 PM
    duration: 3,
    location: {
      latitude: 40.7140,
      longitude: -74.0060,
      address: 'Community Center, New York, NY',
    },
    cause: 'Education',
    organizationId: 'org1',
    organizationName: 'Youth Education Foundation',
  },
  {
    id: 'event2',
    title: 'Community Soup Kitchen',
    description: 'Prepare and serve meals to those in need',
    requiredSkills: ['Cooking', 'Food Service'],
    eventDate: new Date('2024-02-07T11:00:00'), // Wednesday 11 AM
    duration: 4,
    location: {
      latitude: 40.7600,
      longitude: -73.9850,
      address: 'Soup Kitchen, Manhattan, NY',
    },
    cause: 'Hunger Relief',
    organizationId: 'org2',
    organizationName: 'City Food Bank',
  },
  {
    id: 'event3',
    title: 'Health Screening Clinic',
    description: 'Provide basic health screenings to community members',
    requiredSkills: ['Medical', 'First Aid', 'Health Education'],
    eventDate: new Date('2024-02-05T10:00:00'), // Monday 10 AM
    duration: 6,
    location: {
      latitude: 40.7510,
      longitude: -73.9930,
      address: 'Community Health Center, Midtown, NY',
    },
    cause: 'Healthcare',
    organizationId: 'org3',
    organizationName: 'Community Health Alliance',
  },
  {
    id: 'event4',
    title: 'Habitat Restoration Project',
    description: 'Help build and repair homes for families in need',
    requiredSkills: ['Construction', 'Carpentry'],
    eventDate: new Date('2024-02-03T09:00:00'), // Saturday 9 AM
    duration: 6,
    location: {
      latitude: 40.6800,
      longitude: -73.9450,
      address: 'Construction Site, Brooklyn, NY',
    },
    cause: 'Housing',
    organizationId: 'org4',
    organizationName: 'Habitat for Humanity',
  },
  {
    id: 'event5',
    title: 'Environmental Cleanup Day',
    description: 'Clean up local parks and waterways',
    requiredSkills: ['Physical Labor', 'Teamwork'],
    eventDate: new Date('2024-02-10T10:00:00'), // Saturday 10 AM
    duration: 4,
    location: {
      latitude: 40.7300,
      longitude: -73.9950,
      address: 'Central Park, New York, NY',
    },
    cause: 'Environment',
    organizationId: 'org5',
    organizationName: 'Green Earth Initiative',
  },
  {
    id: 'event6',
    title: 'Senior Center Social Event',
    description: 'Organize activities and provide companionship to seniors',
    requiredSkills: ['Communication', 'Patience', 'Event Planning'],
    eventDate: new Date('2024-02-06T14:00:00'), // Tuesday 2 PM
    duration: 3,
    location: {
      latitude: 40.7550,
      longitude: -73.9920,
      address: 'Senior Center, Midtown, NY',
    },
    cause: 'Elderly Care',
    organizationId: 'org6',
    organizationName: 'Senior Support Network',
  },
  {
    id: 'event7',
    title: 'Animal Shelter Volunteer Day',
    description: 'Help care for animals and assist with adoption events',
    requiredSkills: ['Animal Care', 'Compassion'],
    eventDate: new Date('2024-02-10T13:00:00'), // Saturday 1 PM
    duration: 5,
    location: {
      latitude: 40.7200,
      longitude: -73.9900,
      address: 'Animal Shelter, Greenwich Village, NY',
    },
    cause: 'Animal Welfare',
    organizationId: 'org7',
    organizationName: 'City Animal Rescue',
  },
  {
    id: 'event8',
    title: 'Digital Marketing Workshop',
    description: 'Teach nonprofits how to use social media effectively',
    requiredSkills: ['Marketing', 'Social Media', 'Teaching'],
    eventDate: new Date('2024-02-05T19:00:00'), // Monday 7 PM
    duration: 2,
    location: {
      latitude: 40.7280,
      longitude: -73.9940,
      address: 'Community Center, Greenwich Village, NY',
    },
    cause: 'Education',
    organizationId: 'org8',
    organizationName: 'Tech for Good',
  },
];

