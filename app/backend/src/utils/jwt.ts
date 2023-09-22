import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type Token = {
  token: string
};

type TokenPayload = {
  id: number,
  role: string,
};

function sign(payload: TokenPayload): Token {
  return { token: jwt.sign(payload, secret) };
}

function verify(token: string): TokenPayload {
  /* Ao utilizarmos Type Assertion para `TokenPayload` aqui, estamos garantindo que
  a função `jwt.verify` sempre retornará o `id` e o `email`. Nesse caso, irá, mas
  vale lembrar que, se não retornar, perdemos a proteção da tipagem aqui. Usamos
  a ferramenta com responsabilidade! */
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
}

export default {
  sign,
  verify,
};
