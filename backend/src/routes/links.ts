import {Router} from 'express';
import linksController from '../controllers/links';

const router = Router();

router.get('/links/:code', linksController.hitLink)

router.post('/links', linksController.postLink)

router.get('/links/:code/stats', linksController.getLinkStats)

export default router;
