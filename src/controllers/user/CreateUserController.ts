import{Request,Response} from 'express'
import {CreateUserService} from '../../services/user/CreateUserService'
class CreateUserController {
    async handle(req:Request, res:Response){
        const {user,password}=req.body

        const createUserService = new CreateUserService();

        const userCreated = await createUserService.execute({
            user,
            password
        })
        return res.json(userCreated)
    }
}
export {CreateUserController}