import 'reflect-metadata';

import express from 'express';
// src/server.ts
import routes from './routes';

// Importamos a conexão aqui. Como não precisamos nomear esta conexão, ou seja, como não vamos passar nenhum dado desse arquivo para outra variável então temos simplesmente que importar.
import './database';

const app = express();

app.use(express.json());

app.use(routes);

// app.get('/', (request, response) => {
//   response.json({ message: 'Hello my dudes!!!' })
// });

app.listen(3333, () => {
  console.log('✈✈✈ Server started on port 3333');
});
