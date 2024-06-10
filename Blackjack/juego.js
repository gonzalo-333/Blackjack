
const miModulo = (() => {

    'use strict'

    let deck         = [];                                  // string vacio para llenar con ciclo for
    const tipos      = ['C', 'D', 'H', 'S'],                // para usar con for of anidado
          especiales = ['A', 'J', 'Q', 'K'];                // 
    
    // Referencias puntaje
    let puntosJugadores = [];                            // ultimo index = computadora
            
    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const divCartasJugadores   = document.querySelectorAll('.divCartas'),
          puntosHTML           = document.querySelectorAll('small');
    

    const inicializarJuego = ( numJugadores = 2 ) => {
        
        deck = crearDeck();
        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++ ){
            puntosJugadores.push(0);
            divCartasJugadores[i].innerHTML = '';

        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach ( elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
   }
        

                                                            //            .:: CREACION DE LA BARAJA ::.
    const crearDeck = () => {
    
        deck = [];
        for( let i = 2; i <= 10; i++ ){
            for( let tipo of tipos ){
                deck.push( i + tipo );                      // manda al array -> variable de for + variable de for of
            }
    
        }
    
        for( let tipo of tipos ){
            for( let esp of especiales){
                deck.push( esp + tipo);
            }
        }
    
        const shuffle = (array) => {                        //          .:: FISHER-YATES ALGORITHM ::.
            for( let i = array.length - 1; i > 0; i-- ){
                const j = Math.floor( Math.random() * (i + 1) );
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    return shuffle(deck);
    }
    

    const pedirCarta = () => {                              //          .:: SACA CARTA DEL MAZO ::.
    
        if( deck.length === 0 ){
            throw 'No hay cartas en el deck'
        }
        return deck.pop();                                  // antes tenia una variable carta a la que asignaba deck.pop
                                                            // para luego retornar esa variable
    }

                                                                // VERSION CORTA con return de ternario
    const valorCarta = ( carta ) => {
    
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor )) ?
                ( valor === 'A' ) ?  11 : 10
                : valor * 1;
    }
    
    // Turno: 0 = jugador, ultimo = computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta );
        puntosHTML[ turno ].innerText = puntosJugadores[ turno ];
        return puntosJugadores[ turno ];
    }

const crearCarta = ( carta, turno ) => {
    const imgCarta = document.createElement('img');         // crea elemento HTML img
    imgCarta.src = `cartas/${carta}.png`;            // lo toma de la carpeta de imagenes
    imgCarta.classList.add('carta');                        // atribuye clase carta para que tenga su css
    divCartasJugadores[ turno ].append( imgCarta )
}


const determinarGanador = () => {

    const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

    setTimeout ( () => {
        if( puntosComputadora > 21 ){
            alert('Ganaste');
        } else if( puntosComputadora === puntosJugadores ){
            alert('Empate');
        } else {
            alert('Perdiste');
        }
    }, 10 )

}



                                                                //          .::  TURNO DE LA PC  ::.
    const turnoComputadora = ( puntosMinimos ) => {                 // le paso el puntaje del jugador bajo el argumento
                                                                    // de 'puntosMinimos'

        let puntosComputadora = 0;
        
        do {
    
            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );    // si el numero de jugadores varia, el turno de la
                                                                    // computadora siempre sera el ultimo
            crearCarta( carta, puntosJugadores.length - 1 );

        
            if( puntosMinimos > 21 ){
                break;
            }
    
    
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos > 0, puntosMinimos <= 21) );   // aseguro condicion para 1er ejecucion
    
determinarGanador();
    
    }
    
                                                                    //              .::  EVENTOS  ::.
                                                                // (antes cargo referencias HTML al principio)
    btnPedir.addEventListener('click', () => {                  // evento + callback (funcion como argumento)
    
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );       // meto la funcion en una variable para que pueda
                                                                // hacer la validacion de 21
        crearCarta( carta, 0 );

        if( puntosJugador > 21 ){                               // valida que si el puntaje es mas de 21 el boton
            console.warn('Perdiste');
            btnPedir.disabled = true;                           // de pedir carta se anula
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );                  // (!) cuando jugador supera 21, dispara turnoComputadora
        } else if( puntosJugador === 21 ){
            console.warn('21, genial')                          // porque todavia falta el turno de la maquina
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );                  // (!) si saca 21, dispara turnoComputadora
        }
    
    
    })
    
    
    btnDetener.addEventListener('click', () => {
    
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    
    })
    
    btnNuevo.addEventListener( 'click', () => {
    

        inicializarJuego();

    })

    return {
        nuevoJuego: inicializarJuego        
    };


})();




