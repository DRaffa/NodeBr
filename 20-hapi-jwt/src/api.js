const Hapi = require('hapi');

const Context = require('./db/strategies/base/contextStrategy');
const MondoDb = require('./db/strategies/mongodb/mongodb');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoute = require('./routes/heroRoutes');
const AuthRoute = require('./routes/authRoutes');
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const JWT_SECRET = 'MEU_SEGREDÃO_123@';
const HapiJwt = require('hapi-auth-jwt2');
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

  const swaggerOptions = {
    info: {
      title: 'Api Herois - #CursoNodeBR',
      version: 'v1.0',
    },
    lang: 'pt',
  };

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20,
    // },
    validate: (dado, request) => {
      //verifica no banco se usuario ativo
      //verifica no banco se usuario pagando
      return {
        isValid: true, //cado nao valido é false
      };
    },
  });

  app.auth.default('jwt');
  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods()),
  ]);

  await app.start();
  console.log('Servidor executando na porta', app.info.port);

  return app;
}

module.exports = main();
