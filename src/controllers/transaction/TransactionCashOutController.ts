import{Request,Response} from 'express'
import prismaClient from '../../prisma'
import {TransactionCashOutService} from '../../services/transaction/TransactionCashOutService'

class TransactionCashOutController {
    async handle(req:Request, res:Response){
        const debAccountId=req.user_id

        const {credAccountId,value} =req.body
        const transactionCashOutService = new TransactionCashOutService();

        const userCashOut = await transactionCashOutService.execute({
            debAccountId:debAccountId,
            credAccountId:credAccountId,
            value:value
        })
        return res.json(userCashOut)
    }
}
export {TransactionCashOutController}