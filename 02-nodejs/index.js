/* 
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {

    // quando der problema -> reject (Erro)
    // quando der sucesso => resolve

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {

            // return reject(new Error('Erro interno ao obter usuário'))

            return resolve({
                id: 1,
                nome: 'Rafael',
                dataNascimento: new Date(1988, 10, 23)
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {

    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {
            return resolve({
                telefone: '987654321',
                ddd: 11
            })
        }, 2000)
    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'iniciando node',
            numero: 10
        })
    }, 2000)
}

// representando public static main
// 1o passo adicionar a palavra async -> automaticamente ela retorna uma Promise
async function main() {
    try {
        console.time('medida')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const telefoneEndereco = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = telefoneEndereco[0]
        const endereco = telefoneEndereco[1]

        console.log(`
        Nome: ${usuario.nome}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
        Endereço: ${endereco.rua} ${endereco.numero}
        `)

        console.timeEnd('medida')

    } catch (error) {
        console.error('Erro', error)   
    }
}

main()

// para manipular o sucesso usamos a funçao .then
// para manipular erros, usamos o .catch
// conceito de pipe
// usuario -> telefone -> telefone