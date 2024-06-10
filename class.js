

class Persona {                                        // UpperCamelCase -> buena practico con Clases

    nombre = '';
    codigo = '';
    frase = '';
    
    constructor( nombre = 'Sin nombre', codigo = 'Sin codigo', frase = 'Sin frase' ) {
                                                       // metodo que se ejecuta cuando se crea la nueva instancia
        this.nombre = nombre;                          // con this. hace referencia a la clase (si no, fuera de scope)
        this.codigo = codigo;
        this.frase = frase;

    }
}

const spiderman = new Persona( 'Peter Parker', 'Spider', 'Soy tu vecino Spiderman');
const ironman = new Persona( 'Tony Stark', 'Iron Man', 'Yo soy Iron Man');
console.log(spiderman);
console.log(ironman);