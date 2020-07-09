const hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MondoDb = require('./db/strategies/mongodb/mongodb')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const app = new hapi.Server({
    port: 5000
})

async function main() {

    const connection = MondoDb.connect()
    const context = new Context(new MondoDb(connection, HeroisSchema))

    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Servidor executando na porta', app.info.port)
}

main()