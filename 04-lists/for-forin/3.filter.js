const { obterPessoas } = require('./service')

/*Exemplo pegando so o necessario
const pessoa = {
    nome: Rafael,
    idade: 31
}

const { nome } = item
console.log(nome)

const { nome, idade } = item
console.log(nome, idade)
*/

Array.prototype.meuFilter = function(callback) {

    const lista = []

    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined
        if (!result) continue;
        lista.push(item)
    }

    return lista
}

async function main () {
    try {
        const {
            results
        } = await obterPessoas('a')

        //const familiaLars = results.filter(function (item) {
            // por padrao precisa retornar um booleano
            // para informar se deve mater ou remover da lista
            // false > remove da lista
            // true > mante
            // nao encontrou -1
            // encontrou = posicao NoArray

        //  const result = item.name.toLowerCase().indexOf(`lars`)  !== -1         
        //  return result
        //})

        const familiaLars = results.meuFilter((item, index, lista) => {
               console.log(`index: ${index}`, lista.length)

              return item.name.toLowerCase().indexOf('lars') !== -1
            })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log('nomes', names)

    } catch (error) {
        console.error('erro interno', error)
    }
}

main()