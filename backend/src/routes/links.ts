import {Router} from 'express';
import linksController from '../controllers/links';

const router = Router();

router.get('/links', linksController.getLinks)

router.get('/links/:code', linksController.hitLink)

router.post('/link', linksController.postLink)

router.get('/links/:code/stats', linksController.getLinkStats)

export default router;
