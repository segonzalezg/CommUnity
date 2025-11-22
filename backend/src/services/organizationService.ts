/**
 * Organization Service
 * Business logic for organization management
 */

import { Organization } from '../../../src/models/Organization';
import { organizations, generateId } from '../data/dataStore';

export class OrganizationService {
  // Get all organizations
  getAllOrganizations(): Organization[] {
    return organizations;
  }

  // Get organization by ID
  getOrganizationById(id: string): Organization | undefined {
    return organizations.find(org => org.id === id);
  }

  // Get organization by slug
  getOrganizationBySlug(slug: string): Organization | undefined {
    return organizations.find(org => org.slug === slug);
  }

  // Get organizations by owner
  getOrganizationsByOwner(ownerId: string): Organization[] {
    return organizations.filter(org => org.ownerId === ownerId);
  }

  // Get public organizations
  getPublicOrganizations(): Organization[] {
    return organizations.filter(org => org.isPublic);
  }

  // Create new organization
  createOrganization(orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Organization {
    const newOrg: Organization = {
      ...orgData,
      id: generateId('org'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    organizations.push(newOrg);
    return newOrg;
  }

  // Update organization
  updateOrganization(id: string, updates: Partial<Organization>): Organization | null {
    const orgIndex = organizations.findIndex(org => org.id === id);
    if (orgIndex === -1) return null;

    organizations[orgIndex] = {
      ...organizations[orgIndex],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };
    return organizations[orgIndex];
  }

  // Delete organization
  deleteOrganization(id: string): boolean {
    const orgIndex = organizations.findIndex(org => org.id === id);
    if (orgIndex === -1) return false;
    organizations.splice(orgIndex, 1);
    return true;
  }

  // Search organizations
  searchOrganizations(query: string): Organization[] {
    const lowerQuery = query.toLowerCase();
    return organizations.filter(
      org =>
        org.name.toLowerCase().includes(lowerQuery) ||
        (org.description && org.description.toLowerCase().includes(lowerQuery))
    );
  }
}

