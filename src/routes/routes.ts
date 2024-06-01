import { Router } from "express";
import { auth } from "../middleware/authenticate";
import { createUserController } from "../useCases/CreateUser";
import { loginUserController } from "../useCases/LoginUser";
import { listAllUsersController } from "../useCases/ListAllUsers";
import { getOwnUserController } from "../useCases/GetOwnUser";

const router: Router = Router();

router.post('/users', (req, res) => {
    return createUserController.handle(req, res);
});

router.post('/login', (req, res) => {
    return loginUserController.handle(req, res);
})

router.get('/users', auth, (req, res) => {
    return listAllUsersController.handle(req, res);
})

router.get('/users/me', auth, (req, res) =>{
    return getOwnUserController.handle(req, res);
})

export default router;