const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Velocidade', id: 1 }
const DEFAULT_ITEM_ATUALIZAR = { nome: 'Lanterna Verde', poder: 'Energia do Anel', id: 2 }

describe('Suite de manipulacao de Herois', () => {

    // antes de tudo quero que der um await
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
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

    it('deve remover o heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = { ...DEFAULT_ITEM_ATUALIZAR, nome: 'Batman', poder: 'Dinheiro' }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})