const Sequelize = require('sequelize')

const driver = new Sequelize(
    'heroes',
    'draffa',
    'minhasenhasecreta',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    })

async function main () {

    const herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true,
        },
        poder: {
            type: Sequelize.STRING,
            required: true,
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await herois.sync()
    await herois.create({
        nome: 'Lanterna Verde',
        poder: 'luz'
    })

    //Para pegar as informacoes conforme a tabela
    //Atributes para pegar os campos especificados
    const result = await herois.findAll({ 
        raw: true,
        attributes: ['nome']  
    })

    console.log('result', result)
}

main()