const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const { methods } = require('./base/baseRoute');
const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username: 'draffa',
  password: '123',
};

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
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

        if (
          username.toLowerCase() !== USER.username ||
          password !== USER.password
        ) {
          return Boom.unauthorized();
        }

        const token = Jwt.sign(
          {
            username,
            id: 1,
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
