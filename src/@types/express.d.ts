// "declare namespace Express" Porque queremos sobreescrever uma tipagem de dentro de express
declare namespace Express {
  // Sobreescrevendo a exportação do Request que já existe de dentro do "express" no arquivo ensureAthenticated.ts.
  export interface Request {
    // Não ocorre a substituição e sim a anexação dessa para à parte que já existe no Request acima mencionado.
    user: {
      id: string;
    };
  }
}
