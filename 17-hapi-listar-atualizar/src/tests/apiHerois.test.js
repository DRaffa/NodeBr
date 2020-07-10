const assert = require('assert');
const api = require('./../api');
const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Mareta Bionica',
};

const MOCK_HEROI_INICIAL = {
  nome: 'Gaviao Negro',
  poder: 'A mira',
};

let MOCK_ID = '';

describe('Suite de testes da Api herois', function () {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: MOCK_HEROI_INICIAL,
    });

    const { _id } = JSON.parse(result.payload);
    MOCK_ID = _id;
  });

  it('Api listar herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois',
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
  it('listar / herois - deve retornar somente 3 registros', async () => {
    const TAMANHO_LIMITE = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });
  it('listar / herois - deve retornar Erro', async () => {
    const TAMANHO_LIMITE = 'AAA';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const errorResult = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: 'query', keys: ['limit'] },
    };

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });
  it('listar / herois - deve filtrar um item', async () => {
    const TAMANHO_LIMITE = 1000;
    const NOME = 'Flash';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NOME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NOME);
  });
  it('cadastrar /herois dee cadastrar heroi', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR,
    });

    const statusCode = result.statusCode;
    const { mensagem, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(mensagem, 'Heroi cadastrado com sucesso!');
  });
  it('Atualizar PATCH - herois:/id', async () => {
    const _id = MOCK_ID;
    const expected = {
      poder: 'Super Mira',
    };

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: expected,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.mensagem, 'Heroi atualizado com sucesso!');
  });
  it('Atualizar PATCH - herois:/id com erro', async () => {
    const _id = '5f072a71f020d10c615cb8a1'; //`${MOCK_ID}01`;
    const expected = {
      poder: 'Super Mira',
    };

    /* PATCH atualiza as informacoes parcialmente*/
    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: expected,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.mensagem, 'Não foi possivel atualizar o heroi!');
  });
});
