import prismaClient from "../../prisma"

interface TransactionCashInRequest{
    debAccountId:string,
    credAccountId:string,
    value:number
}

//-------credito de bem (conta) significa desconto  
//-------debito de bem (conta) sigfica acrescimo


class TransactionCashOutService{
    async execute({debAccountId,credAccountId,value}:TransactionCashInRequest){

        let accountUserForDebit= await prismaClient.account.findFirst({
            where:{
                userId:debAccountId
            }
        })
        //verifica se o usuario que receberá cash in existe
        if(!accountUserForDebit){
            throw new Error("Não existe conta para débitar valores")
        }
        let accountUserForCredit= await prismaClient.account.findFirst({
            where:{
                userId:credAccountId
            }
        })
        //verifica se o usuario que receberá cash in existe
        if(!accountUserForCredit){
            throw new Error("Não existe conta para débitar valores")
        }
        if(accountUserForCredit.id===accountUserForDebit.id){
            throw new Error("Você não pode fazer transferência para você mesmo")
        }
        if( accountUserForDebit.balance>0
            &&accountUserForDebit.balance>=value
            &&accountUserForCredit.id!==accountUserForDebit.id){
            // fazer o cash out da conta do usuário com sua devidas atualizações 
            let desconto=accountUserForDebit.balance-value
            console.log( desconto)
           const cashOut= await prismaClient.account.update({
            where:{
                id:accountUserForDebit.id
            },data:{
                balance:desconto
            }
           })
           // fazer o cash out da conta do usuário com sua devidas atualizações 
           let credito=accountUserForCredit.balance+value
           const cashIn= await prismaClient.account.update({
            where:{
                id:accountUserForCredit.id
            },data:{
                balance:credito
            }
           })
           
           if(cashIn&&cashOut){
            let transactionHasBeenDone = await prismaClient.transaction.create({
                data:{
                   debitedAccountId:accountUserForDebit.id,
                   creditedAccountId:accountUserForCredit.id,
                   value:value
                }
            })
            return transactionHasBeenDone
           }

        }else{
            throw new Error("Saldo insuficiente para transferência")
        }
        
    }
}
export {TransactionCashOutService}