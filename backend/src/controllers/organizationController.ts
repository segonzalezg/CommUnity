/**
 * Organization Controller
 * Handles HTTP requests for organization operations
 */

import { Request, Response } from 'express';
import { OrganizationService } from '../services/organizationService';

const organizationService = new OrganizationService();

export class OrganizationController {
  // GET /api/organizations
  getAllOrganizations = (req: Request, res: Response) => {
    try {
      const { search, owner, public: isPublic } = req.query;

      let organizations = organizationService.getAllOrganizations();

      if (search && typeof search === 'string') {
        organizations = organizationService.searchOrganizations(search);
      }

      if (owner && typeof owner === 'string') {
        organizations = organizations.filter(org => org.ownerId === owner);
      }

      if (isPublic === 'true') {
        organizations = organizationService.getPublicOrganizations();
      }

      res.json(organizations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organizations' });
    }
  };

  // GET /api/organizations/:id
  getOrganizationById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const organization = organizationService.getOrganizationById(id);

      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organization' });
    }
  };

  // GET /api/organizations/slug/:slug
  getOrganizationBySlug = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const organization = organizationService.getOrganizationBySlug(slug);

      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organization' });
    }
  };

  // POST /api/organizations
  createOrganization = (req: Request, res: Response) => {
    try {
      const orgData = req.body;
      const newOrganization = organizationService.createOrganization(orgData);
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create organization' });
    }
  };

  // PUT /api/organizations/:id
  updateOrganization = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedOrganization = organizationService.updateOrganization(id, updates);

      if (!updatedOrganization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      res.json(updatedOrganization);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update organization' });
    }
  };

  // DELETE /api/organizations/:id
  deleteOrganization = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = organizationService.deleteOrganization(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete organization' });
    }
  };
}

