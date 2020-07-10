const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const PasswordHelper = require('./../helpers/passwordHelper');

const { methods } = require('./base/baseRoute');
const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username: 'draffa',
  password: '123',
};

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }
  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obter token',
        notes: 'Realiza login com user e senha',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        // if (
        //   username.toLowerCase() !== USER.username ||
        //   password !== USER.password
        // ) {
        //   return Boom.unauthorized();
        // }

        const [usuario] = await this.db.read({
          username: username.toLowerCase(),
        });

        if (!usuario) {
          return Boom.unauthorized('O usuario informado nao existe!');
        }

        const math = PasswordHelper.comparePassword(password, usuario.password);

        if (!math) {
          return Boom.unauthorized('O usuario ou senha invalida!');
        }

        console.log('usuario', usuario);

        const token = Jwt.sign(
          {
            username,
            id: usuario.id,
          },
          this.secret
        );

        return {
          token,
        };
      },
    };
  }
}

module.exports = AuthRoutes;
