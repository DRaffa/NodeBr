class BaseRoute {
    static methods() {
        //Quais sao os metodos da classe
        return Object.getOwnPropertyNames(this.prototype)
        .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute