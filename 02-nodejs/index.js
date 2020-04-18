/* 
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null,
            {
                id: 1,
                nome: 'Rafael',
                dataNascimento: new Date(1988, 10, 23)
            })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function () {
        return callback (null, {
            telefone: '987654321',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'iniciando node',
            numero: 10
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

//obterUsuario(resolverUsuario)

obterUsuario(function resolverUsuario(errorUsuario, usuario){

    //null || "" 0 === false

    if(errorUsuario) {
        console.error('Erro ao obter o usuario', errorUsuario)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(errorTelefone, telefone){
        if (errorTelefone) {
            console.error('Erro ao obter o telefone', errorTelefone)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(errorEndereco, endereco) {
            if (errorEndereco) {
                console.error('Erro ao obter o endereco', erro)
                return;
            }
    
            console.log(`
            Nome: ${usuario.nome}, Data de Nascimento ${new Date(usuario.dataNascimento).toLocaleString() },
            Endereço: ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            `); 
        })
    })    
})


// const usuario = obterUsuario();
// const telefone = obterTelefone();
