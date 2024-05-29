import { Router } from "express";
import { auth } from "../middleware/authenticate";
import { createUserController } from "../useCases/CreateUser";

const router: Router = Router();

router.post('/users', (req, res) => {
    return createUserController.handle(req, res);
});

export default router;