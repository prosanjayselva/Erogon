import { Router } from 'express';
import { list, create, update, remove } from '../../controllers/report-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadReport } from '../../middleware/upload.js';

const router = Router();

router.get('/', list);
router.post('/', authenticateWithSession, uploadReport.single('file'), create);
router.put('/:id', authenticateWithSession, uploadReport.single('file'), update);
router.delete('/:id', authenticateWithSession, remove);

export default router;
