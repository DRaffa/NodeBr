const Hapi = require('hapi');

const Context = require('./db/strategies/base/contextStrategy');
const MondoDb = require('./db/strategies/mongodb/mongodb');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoute = require('./routes/heroRoutes');

const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  // ['list', 'create', 'update', 'delete']
  /* new HeroRoute().list() */
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MondoDb.connect();
  const context = new Context(new MondoDb(connection, HeroisSchema));

  console.log(HeroRoute.methods());
  app.route([...mapRoutes(new HeroRoute(context), HeroRoute.methods())]);

  await app.start();
  console.log('Servidor executando na porta', app.info.port);

  return app;
}

module.exports = main();
