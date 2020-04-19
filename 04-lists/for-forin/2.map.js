const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        result.results.forEach(function (item) {
            names.push(item.name)
        });

    } catch (error) {
        console.error('Erro interno', error)
    }
}

main()