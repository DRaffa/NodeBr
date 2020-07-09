const mongoose = require('mongoose');
mongoose.connect('mongodb://draffa:minhasenhasecreta@localhost:27017/herois', {useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
    if(!error) return;

    console.log('Falha ao criar conexao', error)
});

const connection = mongoose.connection

/*
function nomeFuncao() {

}

const minhaFuncao = function () {

}

const minhaFuncaoArrow = () => unicaIntrucao


const minhaFuncaoArrow = () => {

}

const minhaFuncaoArrow = (params) => {
    
}
*/

connection.once('open', () => console.log('database rodando!!!') )

// setTimeout(() => {
//     const estado = conexao.readyState
//     console.log('estado da conexao', estado)
   
// }, 1000)

/*
    0: Desconectado
    1: Conectado
    2: Conectando
    3: Desconectando
*/

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

const model = mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Investigacao'
    })

    console.log('result cadastrar heroi', resultCadastrar)

    const listItens = await model.find();

    console.log('items', listItens)
}

main()