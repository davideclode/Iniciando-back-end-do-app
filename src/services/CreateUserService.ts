/* No "appointmentRepository.ts" temos o método personalizado chamado "findByDate" que não é um método nativo do typeorm e por isso criamos um repositório para tal. Se os únicos métodos que vamos utilizar são aqueles métodos padrões tipo "create", "update", "remove", "find", "findOne", etc basta de dentro de typeorm a gente importar a função chamada "getRepository". */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

// Vamos criar a interface aqui
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // Aqui teremos um único método chamado "execute".
  // Como o nosso método aqui é o "CreateUserSerce" então o retorno é o User.
  public async execute({ name, email, password }: Request ): Promise<User> {
    // Aqui dentro vamos fazer a criação do usuário

    // Primeiro precisamos pegar o User importado
    const usersRepository = getRepository(User);
    // Não pode ter emails duplicados
    const checkUserExists = await usersRepository.findOne({
      where: {email: email},
    })
    if(checkUserExists){
      throw new Error('Email address already used!!!');
    }

    // Criamos a variável que vai recer o password criptografado
    const hashedPassword = await hash(password, 8);

    // Agora sim podemos criar o usuário. Vamos criar ainda sem a criptografia.
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Agora vamos salvar no banco
    await usersRepository.save(user);

    return user;
  }

}

export default CreateUserService;
