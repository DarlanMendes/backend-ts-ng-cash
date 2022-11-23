import prismaClient from "../../prisma";


interface MeUseRequest{
   userId:string
   
}
class MeUserService{
   async execute({userId}:MeUseRequest){
       let user = await prismaClient.user.findFirst({
           where:{
               id:userId
           },
           select:{
            id:true,
            username:true
           }
       })
       if(!user){
           throw new Error("Usuario inexiste")
       }
       //Verifica se senha está correta-----------
       
       //tudo deu certo? Gerar token usuario
       
       return {user}
   }
}
export{MeUserService}