import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { list, update,create, remove, toggle,getOne } from "../controllers/task.controller";

const router = Router();

router.use(authMiddleware);
router.get('/',list);
router.post('/',create);
router.patch('/:id',update);
router.get("/:id", getOne);
router.delete('/:id',remove);
router.patch('/:id/toggle',toggle);

export default router;