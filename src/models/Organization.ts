/**
 * Organization Model
 * Represents an organization or group in the CommUnity platform
 */

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  isPublic: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  ownerId: string;
  owner?: User;
  members?: User[];
  events?: Event[];
  messages?: Message[];
}

