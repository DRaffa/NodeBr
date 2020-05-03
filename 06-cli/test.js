const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }

describe('Suite de manipulacao de Herois', () => {

    // antes de tudo quero que der um await
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        //const resultado = await database.listar(expected.id)
        //uma forma de pegar o primeira posição
        const [resultado] = await database.listar(expected.id)
        // outra forma de pegar a primeira posição de um array
        //const posicaoUM = resultado[0]
        
        //deepEqual tem que ser o mesmo do esperado
        deepEqual(resultado, expected)

        //ok(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR        
        //Criando um objeto a partir de outro
        //const expected = { ...DEFAULT_ITEM_CADASTRAR, id:2, nome: 'Batman' } 

        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)

        //Pegando a primeira posicao de uma lista se nao existir a variavel sera undefined
        // idem usar o lista.find(x => x.id == id)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })
})