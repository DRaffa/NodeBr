const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        console.time('for')
        for (let index = 0; index < result.results.length; index++) {
            const pessoa = result.results[index];
            names.push(pessoa.name)
        }
        console.timeEnd('for')
        console.log('nomes', names)

    } catch (error) {
        console.error(`error interno`, error)
    }
}

main()