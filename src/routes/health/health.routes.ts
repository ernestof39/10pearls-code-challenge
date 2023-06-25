import { Router } from 'express';
import { checkHealth } from '../../controllers/health/health.controller';

const router = Router();

router.get('/', checkHealth);

export default router;
