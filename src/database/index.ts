import { createConnection } from 'typeorm';

// vamos chamar o "createConnection" aqui. Uma vez que chamarmos o createConection ele vai procurar neste projeto o arquivo chamado "ormconfig.json". Se ele achar, vai importar/ler os dados que estão nele e vai fazer a conecção do banco de dados. Por isso que não estamos passando nada dentro do "createConection"
createConnection();

/* Se fizessemos
createConection({
  // E passassemos as credenciais de acesso ao banco de dados aqui.
  type: 'postgres'
  . . .
})
Não ia dar certo. Isto porque se executarmos os comandos da CLI, esses comandos não vão conseguir ler diretamente as credenciais que estão no arquivo "index.ts". Por padrão, ela lê por padrão as credenciais que estão no arquivo "ormconfig.json".
Resumindo: Como a CLI do typeORM lê do arquivo "ormconfig.json" e o "createConection" também lê do arquivo "ormconfig.json" então não tem porquê não utilizarmos esta estrutura
*/
