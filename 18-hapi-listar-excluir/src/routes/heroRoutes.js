const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
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
          return Boom.internal();
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
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;

          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);

          if (result.nModified !== 1) {
            // return {
            //   mensagem: 'Não foi possivel atualizar o heroi!',
            // };
            return Boom.preconditionFailed('Heroi nao encontrado');
          }

          return {
            mensagem: 'Heroi atualizado com sucesso!',
          };
        } catch (error) {
          console.error('Erro interno ao atualizar Heroi');
          return Boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const resultado = await this.db.delete(id);
          if (resultado.n !== 1) {
            // return {
            //   mensagem: 'Não foi possivel excluir heroi',
            // };
            return Boom.preconditionFailed('Heroi nao encontrado');
          }

          return {
            mensagem: 'heroi excluido com sucesso!',
          };
        } catch (error) {
          console.log('Erro interno ao excluir heroi');
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
