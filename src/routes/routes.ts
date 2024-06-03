import { Router, Request, Response } from "express";
import { auth } from "../middleware/authenticate";
import { createUserController } from "../useCases/CreateUser";
import { loginUserController } from "../useCases/LoginUser";
import { listAllUsersController } from "../useCases/ListAllUsers";
import { getOwnUserController } from "../useCases/GetOwnUser";
import { logoutUserController } from "../useCases/LogoutUser";
import { deleteUserController } from "../useCases/DeleteUser";
import { deleteUserFromTeamController } from "../useCases/DeleteUserFromTeam";
import { deleteTeamController } from "../useCases/DeleteTeam";
import { updateUserController } from "../useCases/UpdateUser";
import { updateTeamController } from "../useCases/UpdateTeam";
import { createTeamController } from "../useCases/CreateTeam";
import { setMemberController } from "../useCases/setMember"
import { getUserController } from "../useCases/getUser";
import { getTeamController } from "../useCases/GetTeamById";
import { getTeamMembersController } from "../useCases/GetTeamMembers";

const router: Router = Router();

router.post('/users', (req, res) => {
    return createUserController.handle(req, res);
});

router.post('/login', (req, res) => {
    return loginUserController.handle(req, res);
})

router.post('/teams',auth, (req, res) => {
    return createTeamController.handle(req, res)
})

router.post('/teams/:team_id/member/:user_id',auth, (req, res) => {
    return setMemberController.handle(req, res)
})

router.get('/users', auth, (req, res) => {
    return listAllUsersController.handle(req, res);
})

router.get('/users/me', auth, (req, res) =>{
    return getOwnUserController.handle(req, res);
})

router.delete('/logout', (req, res) => {
    return logoutUserController.handle(req, res);
})

router.delete('/users/:user_id', auth, (req, res) => {
    return deleteUserController.handle(req, res);
})

router.delete('/teams/:team_id', auth, (req, res) => {
    return deleteTeamController.handle(req, res);
})

router.delete('/teams/:team_id/member/:user_id', auth, (req, res) => {
    return deleteUserFromTeamController.handle(req, res);
})

router.patch('/users/:user_id', auth, (req, res) => {
    return updateUserController.handle(req, res);
})

router.patch('/teams/:team_id', auth, (req, res) => {
    return updateTeamController.handle(req, res);
})

router.get('/users/:user_id', auth, (req, res) => {
    return getUserController.handle(req, res);
});

router.get('/teams/:team_id', auth, (req, res) => {
    return getTeamController.handle(req, res);
})

router.get('/teams/:team_id/members', auth, (req, res) => {
    return getTeamMembersController.handle(req, res);
})

export default router;