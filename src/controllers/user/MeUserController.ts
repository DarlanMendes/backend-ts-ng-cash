import{Request,Response} from 'express'
import {MeUserService} from '../../services/user/MeUserService'
class MeUserController {
    async handle(req:Request, res:Response){
        const userId=req.user_id

        const meUserService = new MeUserService();

        const user = await meUserService.execute({
            userId
        })
        return res.json(user)
    }
}
export {MeUserController}