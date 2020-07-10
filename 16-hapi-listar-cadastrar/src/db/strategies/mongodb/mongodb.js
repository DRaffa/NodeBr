const ICrud = require('../interfaces/interfaceCrud')
const mongoose = require('mongoose');

const Status = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {

        const estado = Status[this._connection.readyState]

        if (estado == 'Conectando') {//Espera um segundo
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        return Status[this._connection.readyState]
    }

    static connect() {
        mongoose.connect('mongodb://draffa:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
            if (!error) return;

            console.log('Falha ao criar conexao', error)
        });

        const connection = mongoose.connection
        connection.once('open', () => console.log('database rodando!!!'))
        return connection
    }

    async create(item) {
        return await this._schema.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return await this._schema.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }

    async delete(id) {
        return await this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB