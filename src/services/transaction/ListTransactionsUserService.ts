import prismaClient from "../../prisma";

interface ListTransactionsRequest {
    accountUserId: string,
}
class ListTransactionsUserService {
    async execute({ accountUserId }: ListTransactionsRequest) {
        let transactionsUserDeb = await prismaClient.transaction.findMany({
            where:{
                debitedAccountId:accountUserId
            }
        })
        let transactionsUserCred = await prismaClient.transaction.findMany({
            where:{
                creditedAccountId:accountUserId
            }
        })
        if(!transactionsUserDeb||!transactionsUserCred){
            throw new Error("Não foi possível listar transações")
        }else{
            let transactionsUser ={cashOut:transactionsUserDeb, cashIn:transactionsUserCred}
            return transactionsUser
        }

    }
}
export { ListTransactionsUserService }