class teste{
    constructor(name, age, penis_size){
        this.name= name
        this.age = age,
        this.penis_size = penis_size
    }
}

const testando = {
    name: 'Luis Felipe',
    age: 18,
    penis_size: '18cm'
}

const newTeste = new teste(...testando)

console.log(newTeste)