const Commander = require('commander')
const DataBase = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")

    .option('-c, --cadastrar', "Cadastrar Heroi")
    .option('-r, --remover', "Remover heroi pelo id")
    .option('-l, --listar', "Listar Heroi")
    .option('-a, --atualizar [value]', "Atualizar Heroi")
    .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        
        if (Commander.cadastrar) {
            delete heroi.id
            //console.log('heroi', heroi)
            //console.log('Commander', Commander)

            const resultado = await DataBase.cadastrar(heroi)

            if (!resultado) {
                console.error('Heroi nao foi cadastrado')
                return
            }

            console.log('Heroi cadastrado com sucesso')
        }
        else if (Commander.listar) {
            const resultado = await DataBase.listar()
            console.log(resultado)
            return;
        } else if (Commander.remover) {
            const resultado = await DataBase.remover(heroi.id)
            if(!resultado) {
                console.error('Nao foi possivel remover o heroi')
                return
            }
            console.log('Heroi removido com sucesso')
            return;
        } else if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remover todas as chaves que estiverem com undefined | null
            const dados = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dados)
            const resultado = await DataBase.atualizar(idParaAtualizar, heroiAtualizar)
            
            if (!resultado) {
                console.error('Nao foi possivel atualizar o heroi')
                return
            }

            console.log('Heroi atualizado com sucesso!')
        }

    } catch (error) {
        console.error('Erro interno', error)
    }
}

main()