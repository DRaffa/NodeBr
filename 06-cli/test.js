const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }

describe('Suite de manipulacao de Herois', () => {

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

    // it('deve cadastrar um heroi, usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR

    //     //
    //     ok(null, expected)
    // })
})