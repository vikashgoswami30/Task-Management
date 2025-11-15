import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { list, update,create, remove, toggle } from "../controllers/task.controller";

const router = Router();

router.use(authMiddleware);
router.get('/',list);
router.post('/',create);
router.patch('/:id',update);
router.delete('/:id',remove);
router.patch('/:id/toggle',toggle);

export default router;