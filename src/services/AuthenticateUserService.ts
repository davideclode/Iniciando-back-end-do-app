
import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import User from "../models/User";

// Como vamos precisar de passar email e senha dentro do execute, vamos criar uma interface
interface Request {
    email: string;
    password: string;
}

// Criando outra interface para declar o "user"
interface Response {
    user: User;
}

class AuthenticateUserService {
    // Se não tivéssemos criado a interface para para o "user", poderiamos colocar dentro do Promise um objeto javascrip: Promise<{user: User}>
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        // Procurando um usuário cujo email bate com o email que estamos rebebendo como parámetro no execute().
        const user = await usersRepository.findOne({
            where: {email: email},
        })

        if (!user) {
            throw new Error("Incorrect email/password combination");
        }
        // user.password - é a senha criptografada que está salvo no nosso banco de dados
        // password - senha não criptografada que está dentro do execute emé a senha que o usuário tentou fazer login.
        // O "compare" que importamos lá acima, permite comparar se a senha não criptografada bate com a senha não criptografada.
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new Error("Incorrect email/password combination !!!");
        }

        // Se der certo, então o usuário é autenticado. Precisamos retornar alguma coisa
        // Neste caso, estamos retornando o objeto user
        return { user, };
    }
}

export default AuthenticateUserService;
