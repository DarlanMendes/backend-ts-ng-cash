import{Request,Response} from 'express'
import prismaClient from '../../prisma'
import {ListTransactionsUserService}from '../../services/transaction/ListTransactionsUserService'
 class ListTransactionsUserController{
  async  handle(req:Request,res:Response){
        const userId=req.user_id
        let accountUserId = await prismaClient.account.findFirst({
            where:{
                userId:userId
            },
            select:{
                id:true
            }
        })
        const listTransactionsService = new ListTransactionsUserService();
        const listTransactionsRequest = await listTransactionsService.execute({
            accountUserId:accountUserId.id
        })
        return res.json(listTransactionsRequest)
    }
 }
 export {ListTransactionsUserController}