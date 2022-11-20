import{Request,Response} from 'express'
import {BalanceUserService} from '../../services/user/BalanceUserService'
class BalanceUserController {
    async handle(req:Request, res:Response){
        const user_Id=req.user_id

        const balanceUserService = new BalanceUserService();

        const userCreated = await balanceUserService.execute({
            userId:user_Id
        })
        return res.json(userCreated)
    }
}
export {BalanceUserController}