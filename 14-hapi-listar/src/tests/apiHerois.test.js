const assert = require('assert');
const api = require('./../api');

describe('Suite de testes da Api herois', function () {
  this.beforeAll(async () => {
    app = await api;
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

    assert.deepEqual(result.payload, 'Erro interno ao listar herois');
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
});
