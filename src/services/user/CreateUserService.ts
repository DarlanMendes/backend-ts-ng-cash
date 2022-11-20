import prismaClient from '../../prisma'
import {hash} from 'bcryptjs';
interface UserRequest {
    user: string;
    password: string;
}
class CreateUserService {
    async execute({ user, password }: UserRequest) {
        //verifica se foi enviado usuário
        if (!user) {
            throw new Error("Nome do usuário deve ser informado!")
        }
        //verifica se usuário já está cadastrado 
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                username: user
            }
        })
        if (userAlreadyExists) {
            throw new Error("Usuário já cadastrado")
        }
        //Verifica se o nome do usuário tem pelo menos 3 caracteres
        if (user.length < 3) {
            throw new Error("Nome do usuário deve ter pelo menos 3 caracteres")
        }
        //Verifica se password tem pelo menos 8 caracteres
        if (password.length < 8) {
            throw new Error("A senha deve conter pelo menos 8 caracteres")
        }
        //Verifica se o password contem pelo um número e uma letra Maiuscula
        let passwordChecked = password.split('')
        let passwordHasUpperCase = false;
        let passwordHasNumber = false;
        passwordChecked.forEach((caracter) => {
            let maiuscula = caracter.toUpperCase();
            if (Number(caracter) === 0 ||
                Number(caracter) === 1 ||
                Number(caracter) === 2 ||
                Number(caracter) === 3 ||
                Number(caracter) === 4 ||
                Number(caracter) === 5 ||
                Number(caracter) === 6 ||
                Number(caracter) === 7 ||
                Number(caracter) === 8 ||
                Number(caracter) === 9) {
                
                passwordHasNumber = true;
            } else {
                if (maiuscula === caracter) {
                    passwordHasUpperCase = true;
                }
            }

        });
        if (!passwordHasNumber || !passwordHasUpperCase) {
            throw new Error("A senha deve conter pelo menos uma letra maiúscula e um pelo menos um número")

        }
        //criptografia da senha----------------------------------------------------------
        let passwordHash = await hash(password, 8)
        let userCreated = await prismaClient.user.create({
             data:{
                username: user,
                password: passwordHash
            },
            select:{
                username:true
            }
        })
        let userCreatedId = await prismaClient.user.findFirst({
            where:{
                username:user
            }
        })
        if(userCreatedId){
        let accountCreated = await prismaClient.account.create({
            data:{
                balance:100,
                userId:userCreatedId.id
            }
        })
        }else{
            throw new Error("Ocorreu um erro na criação do usuário e conta")
        }

        return {user:userCreated}
    }
}
export { CreateUserService }