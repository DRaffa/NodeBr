const ICrud = require('./interfaces/interfaceCrud')
const mongoose = require('mongoose');
const Status = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    async isConnected() {

        const estado = Status[this._driver.readyState]
       
        if (estado == 'Conectando') {//Espera um segundo
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        return Status[this._driver.readyState]
    }

    connect() {
        mongoose.connect('mongodb://draffa:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
            if (!error) return;

            console.log('Falha ao criar conexao', error)
        });

        const connection = mongoose.connection
        connection.once('open', () => console.log('database rodando!!!'))
        this._driver = connection
        this.defineModel()
    }

   async create(item) {
        return await this._herois.create(item)
    }

    async read (item, skip=0, limit=10) {
        return await this._herois.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
        return this._herois.updateOne({ _id:  id }, {$set: item})
    }

    async delete(id) {
        return await this._herois.deleteOne({ _id: id })
    }

    defineModel() {
        const heroiSchema = new mongoose.Schema({
            nome: {
                type: String,
                require: true
            },
            poder: {
                type: String,
                require: true
            },
            insertAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = mongoose.model('herois', heroiSchema)
    }
}

module.exports = MongoDB