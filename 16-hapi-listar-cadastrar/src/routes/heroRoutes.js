const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const failAction = (request, headers, erro) => {
  throw erro;
};

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        validate: {
          // payload -> body
          // headers -> header
          // params -> na URL: id
          // query -> ?skip=10&limit=10
          failAction,
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, head) => {
        try {
          const { skip, limit, nome } = request.query;

          let query = !nome ? {} : { nome: { $regex: `.*${nome}*.` } };

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.log('Erro interno ao listar herois', error);
          return 'Erro interno ao listar herois';
        }
      },
    };
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });

          return {
            mensagem: 'Heroi cadastrado com sucesso!',
            _id: result._id,
          };
        } catch (error) {
          console.log('Erro interno ao incluir heroi');
          return 'Erro interno ao incluir heroi';
        }
      },
    };
  }
}

module.exports = HeroRoutes;
