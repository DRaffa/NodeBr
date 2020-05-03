const { readFile, writeFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
// outras formas de obter dados do json
//const dadosJson = require('./herois.json')

class DataBase {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <=2 ? heroi.id : Date.now();
        /*
        {
            nome: Flash,
            poder: Speed
        }

        {
            id: 123458792
        }

        {
            nome: Flash,
            poder: Speed,
            id: 123458792
        }
        */

        // com isso ele vai contatenar os atributos nome e poder
        const heroiComId = {
            id,
            ...heroi
        }

        //Incluido um objeto a uma lista de array
        //Outra forma seria usar o push
        //const dadosFinal = dados.push(heroiComId)
        const dadosFinal = [...dados, heroiComId]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id == id) : true))
        return dadosFiltrados
    }
}

module.exports = new DataBase()

// quem for utilizar nao precisara instanciar o objeto