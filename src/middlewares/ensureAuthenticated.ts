import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  // Aqui vou informar qual que é o retorno que o meu token tem
  iat: number;
  exp: number;
  sub: string;
}

// Esse é o nosso 1º middleware de autenticação. Essa vai ser como uma função qualquer do middleware do express.
// Ao escrever esse export, aparecerá alguns erros. Logo temos que lembrar da explicação no início do curso(sobre express, typescript) de que quando criarmos uma rota ou um middleware do express em um arquivo que não tem a importação do express(exemplos do arquivo appointments.routes.ts que tem importação de express "import { Router } from 'express';" onde podemos utilizá-la em "const appointmentsRouter = Router();" ), ele não vai conseguir definir o valor/a tipagem dos parãmetros Request, Response e next. Neste caso, precisamos definir de forma manual o tipo desses parâmetros. Para resolver isso, importamos o Request, Response e NextFunction do "express" lá em cima

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Aqui, vamos fazer a validação do token JWT
  // 1º Vamos pegar o token de dentro da requisição(lembrando que o token vai pelo header da aplicação)
  const authHeader = request.headers.authorization; // authorization é o nome do header

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  // Se o token existir(Lembrando que o token está no formato "Bearer afofjwofhowffweyf8"), então vamos dividir o token em duas partes: Bearer e o afofjwofhowffweyf8. Vamos utilizar a desestruturação. Como estamos interessado só na segunda posição(o "token").
  // O split('') está criando o espaço entre o Bearer e o afofjwofhowffweyf8
  const [, token] = authHeader.split(' '); /* É obrigatório deixar espaço */

  const { secret } = authConfig.jwt;

  // O verify vai retornar o token decodificado. o 2º valor dentro do verify é o nosso secrete. Esse secrete(dcdcd488dce09a5b900a9f45fef598d5) é o mesmo que utilizamos no service(AuthenticateUserService) para gerar o token. Como vamos ter esse secrete em dois lugares da aplicação é bom separá-las em um outro arquivo no src
  try {
    const decoded = verify(token, secret);
    // Estamos forsando o nosso decoded ser do tipo TokenPayLoad
    const { sub } = decoded as TokenPayload;

    // Informando quem é o usuário que está realizando esta requisição
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
