const assert = require('assert');
const api = require('./../api');
const Context = require('./../db/strategies/base/contextStrategy');
const PostGres = require('./../db/strategies/postgres/postgres');
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema');

const USER = {
  username: 'draffa',
  password: '123',
};

const USER_DB = {
  ...USER.username.toLocaleLowerCase(),
  password: '$2b$04$0Yf0wCampzMwi9Fa8bCMM.YVphu/t1vSJZeUoFkSCVfM/hZVeBrTe',
};

describe('Auth test suit', function () {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await PostGres.connect();
    const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema);
    const postgres = new Context(new PostGres(connectionPostgres, model));
    const result = await postgres.update(null, USER_DB, true);
  });
  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
  it('nao deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'thayani',
        password: '123',
      },
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 401);
    assert.ok(dados.error, 'Unauthorized');
  });
});
