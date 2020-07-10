const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const heroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')

let context = {}

const MOCK_HEROI_CADASTRAR = { nome: 'Mulher Maravilha', poder: 'Força'}
const MOCK_HEROI_DEFAULT = { nome: `Arqueiro Verde-${Date.now()}`, poder: 'Arco e Flecha'}
const MOCK_HEROI_ATUALIZAR = { nome: 'Superman', poder: 'Velocidade + Força'}
let MOCK_HEROI_ID = ''


describe('MongoDb Strategy', function () {
    // this.timeout(Infinity)

    this.beforeAll(async ()=> {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, heroisSchema))
        await context.create(MOCK_HEROI_ATUALIZAR)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })

    it('MongoDb Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, 'Conectado')
    })

    it('MongoDb cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR) 
        //const result = await context.create(MOCK_HEROI_CADASTRAR) 
        //console.log('result cadastro heroi', result)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('MongoDb Listar', async () => {
        const lista = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome}, 7, 10)
        // console.log('lista', lista)
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})
        
        const result = { nome, poder }
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('MongoDb Atualizar', async () => {

        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Super man Black'
        })

        //console.log('result', result)

        assert.deepEqual(result.nModified, 1)
    })

    it('MongoDb Excluir', async () => {
         const result = await context.delete(MOCK_HEROI_ID)
         assert.deepEqual(result.n, 1)
    })
})