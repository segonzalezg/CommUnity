/**
 * Organization Routes
 * Defines all organization-related API endpoints
 */

import { Router } from 'express';
import { OrganizationController } from '../controllers/organizationController';

const router = Router();
const organizationController = new OrganizationController();

router.get('/', organizationController.getAllOrganizations);
router.get('/slug/:slug', organizationController.getOrganizationBySlug);
router.get('/:id', organizationController.getOrganizationById);
router.post('/', organizationController.createOrganization);
router.put('/:id', organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);

export default router;

