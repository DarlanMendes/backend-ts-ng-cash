import prismaClient from "../../prisma"

interface BalanceRequest{
    userId:string
}
class BalanceUserService{
    async execute({userId}:BalanceRequest){
        let balanceRequested = await prismaClient.account.findFirst({
            where:{
                userId
            }   
        })
        if(!balanceRequested){
            throw new Error("Não foi possível carregar o saldo do usuário")
        }
        return {balance:balanceRequested}
    }
}
export {BalanceUserService}