import { Router } from 'express';
import * as atmController from '../controllers/atmController';

const router = Router();

router.get('/balance/:username', atmController.getBalance);
router.post('/deposit', atmController.deposit);
router.post('/withdraw', atmController.withdraw);
router.post('/transfer', atmController.transfer);
router.get('/history/:username', atmController.history);

export default router;
