const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, head) => {
        try {
          const { skip, limit, nome } = request.query;

          let query = {};

          if (nome) {
            query = { nome: nome };
          }

          if (skip && isNaN(skip)) {
            throw Error('O tipo do skip é incorreto' + skip);
          }

          if (limit && isNaN(limit)) {
            throw Error('O tipo do limit é incorreto' + limit);
          }

          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.log('Erro interno ao listar herois', error);
          return 'Erro interno ao listar herois';
        }
      },
    };
  }

  // create() {
  //     return  {
  //         path: '/herois',
  //         method: 'POST',
  //         handler: (request, head) => {
  //             return this.db.create(request)
  //         }
  //     }
  // }
}

module.exports = HeroRoutes;
