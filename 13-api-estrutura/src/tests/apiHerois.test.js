const assert = require('assert')
const api = require('./../api')

describe.only('Suite de testes da Api herois', function() {
    this.beforeAll(async ()=> {
        app = await api
    })

    it('Api listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
})