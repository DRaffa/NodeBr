const service = require('./service')

Array.prototype.meuApp = function (callback) {
    const novoArrayMapeado = []

    for (let index = 0; index <= this.length - 1; index++) {
        const resultado = callback(this[index], index)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main() {
    try {
        const result = await service.obterPessoas('a')
        //const names = []
        //result.results.forEach(function (item) {
        //    names.push(item.name)
        //});

        //const names = result.results.map(function (pessoa){
        //    return pessoa.name
        //})

        //const names = result.results.map((pessoa) => pessoa.name)

        const names = result.results.meuApp(function (pessoa, index){
            return `[${index}-${pessoa.name}]`
        })

        console.log('nomes', names)

    } catch (error) {
        console.error('Erro interno', error)
    }
}

main()