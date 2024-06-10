


function Persona( nombre, edad ) {                             // UpperCamelCase -> va a servir para crear instancias

    this.nombre = nombre;
    this.edad = edad;

    this.imprimir = function() {
        console.log(`Nombre: ${ this.nombre } - edad: ${ this.edad }`);
    }
}

const maria   = new Persona( 'Maria', 10 );
const melissa = new Persona( 'Melissa', 35 );
console.log( maria );
maria.imprimir();
console.log( melissa );
melissa.imprimir();