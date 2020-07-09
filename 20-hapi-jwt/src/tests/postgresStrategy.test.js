const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
const heroisSchema = require('./../db/strategies/postgres/schemas/heroisSchema')

const MOCK_HEROI_CADASTRAR = { nome: 'Mulher Maravilha', poder: 'Força'}
const MOCK_HEROI_ATUALIZAR = { nome: 'Superman', poder: 'Velocidade + Força'}

let context = {}
describe('Postgres Strategy', function() {
    this.timeout(Infinity)

    this.beforeAll(async ()=> {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, heroisSchema)
        context = new Postgres(connection, model)
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Postgres cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR) 
        delete result.id
        // console.log('result', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Postgres Listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Postgres Atualizar', async () => {
        const [heroi] = await  context.read({nome: MOCK_HEROI_ATUALIZAR.nome})

        console.log('heroi', heroi.id)
        
        //pega todas as propriedades da variavel MOCK_HEROI_ATUALIZAR
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Gaviao' // sobreescreve a propriedade nome
        }

        await context.update(heroi.id, novoItem)
        const [itemAtualizado] = await context.read({ id: heroi.id})

        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
        
        /*
        No Javascript temos uma tecnica chamada rest/spread que é o metodo 
        usado para mergear objetos ou separa-lo
        {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        {
            dataNascimento: '1988-11-23'
        }

        //final 
        {
            nome: 'Batman',
            poder: 'Dinheiro'
            dataNascimento: '1988-11-23'
        }

        */


    })

    it('Postgres Excluir', async () => {
        const [item] = await context.read({ })
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})