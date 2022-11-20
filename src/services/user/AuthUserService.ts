 import prismaClient from "../../prisma";
 import{compare} from 'bcryptjs';
 import{sign} from 'jsonwebtoken'

interface AuthRequest{
    username:string,
    password:string
}
class AuthUserService{
    async execute({username,password}:AuthRequest){
        let user = await prismaClient.user.findFirst({
            where:{
                username
            }
        })
        if(!user){
            throw new Error("Usuario ou senha incorreta")
        }
        //Verifica se senha está correta-----------
        let passwordMatches = await compare(password, user.password)
        if(!passwordMatches){
            throw new Error("Usuario ou senha incorreta")
        }
        //tudo deu certo? Gerar token usuario
        let token = sign({
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            subject:user.id,
            expiresIn:'1d'
        }
        )

        return {id:user.id,
                username:user.username,
                token:token
                }
    }
}
export{AuthUserService}