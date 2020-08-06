import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

// Como vamos precisar de passar email e senha dentro do execute, vamos criar uma interface
interface Request {
  email: string;
  password: string;
}

// Criando outra interface para declar o "user"
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  // Se não tivéssemos criado a interface para para o "user", poderiamos colocar dentro do Promise um objeto javascrip: Promise<{user: User}>
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Procurando um usuário cujo email bate com o email que estamos rebebendo como parámetro no execute().
    const user = await usersRepository.findOne({
      where: { email }, // /*Poderia ser where: {email: email}*/
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }
    // user.password - é a senha criptografada que está salvo no nosso banco de dados
    // password - senha não criptografada que está dentro do execute emé a senha que o usuário tentou fazer login.
    // O "compare" que importamos lá acima, permite comparar se a senha não criptografada bate com a senha não criptografada.
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    // Depois de importar o "sign", vamos criar a variável chamada token. Essa variável não será salvo no banco de dados
    // Importante: Não colocar informações sensíveis dentro do sign
    // 1º Parâmetro: Payload; 2º Parâmetro: Chave secreta, 3º Parâmetro: algumas configurações do token
    const token = sign({}, secret, {
      // subject é id do usuário que gerou o token
      subject: user.id,
      expiresIn, // Poderiamos ter deixado no formato de short sintax(expiresIn: expiresIn)
    });

    // O verify recebe o token como parâmetro e é responsável por verificar se o token foi gerado a partir desta chave. Por enquanto não vamos vazer isso.

    // Se der certo, então o usuário é autenticado. Precisamos retornar alguma coisa
    // Neste caso, estamos retornando o objeto user
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
