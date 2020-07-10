/* 
    docker ps
    docker exec -it 2151d32f7141 mongo -u draffa -p minhasenhasecreta --authenticationDatabase herois

    * exibe os databases
    show dbs 

    * mudando o contexto para uma database
    use herois

    * mostrar tables (colecoes)
    show collections

    * create
    db.herois.insert({
        nome: 'Flash',
        poder: 'Velocidade',
        dataNascimento: '1988-11-23'
    })

    for(let i=0; i <= 10000; i++) {
        db.herois.insert({
            nome: `Clone-${i}`,
            poder: 'Velocidade',
            dataNascimento: '1988-11-23'
        })
    }

    * read
    db.herois.find()
    db.herois.find().pretty()
    db.herois.count()
    db.herois.findOne()
    db.herois.find().limit(1000).sort({ nome: -1}) --"-1 desc"
    "it" para ver mais registros
    db.herois.find({}, { poder: 1, _id: 0})
    db.herois.find({ nome: 'Flash' })
    db.herois.find({ poder: 'Velocidade' })

    * update
    
    db.herois.update({ _id: ObjectId("1651616546464")},  //Condicao Where
        { nome: 'Flash'}) //Propriedade a ser modificada porem remove as outras propriedades
    
    db.herois.update({ _id: ObjectId("1651616546464")},  //Condicao Where
       {$set: { nome: 'Flash'}}) //Propriedade a ser modificada e manter as outras propriedades

    db.herois.update({ _id: ObjectId("1651616546464")},  //Condicao Where
       {$set: { name: 'Flash'}}) //Se a propriedade nao existir ele vai criar a propriedade
    
    db.herois.update({ _id: ObjectId("1651616546464")},  //Condicao Where
       {$set: { poder: 'Velocidade'}}) //Ele atualiza apenas o primeiro que ele encontrar

    * delete
    db.herois.remove({}) //Remover tudo na base
    db.herois.remove({ nome: 'Flash' }) //Remove com condicao
    
*/