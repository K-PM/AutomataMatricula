 class Automata {
  constructor() {
    this.states = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17'];
    this.alphabet = {
      'P': /[Pp]/,
      'Q': /[Qq]/,
      'R': /[Rr]/,
      'a-zA-Z': /[a-zA-Z]/,
      '-': /[-]/,
      'v-zV-Z':/[v-zV-Z]/,
      'a-dA-D':/[a-dA-D]/,
      //NUMEROS
      '0': /[0]/,
      '1-9':/[1-9]/,
      '0-9':/[0-9]/,
    };
    this.transitions = {
      q0: {
        [this.alphabet['P'].source]: 'q1',
        [this.alphabet['Q'].source]: 'q2',
        [this.alphabet['R'].source]: 'q3',
      },
      q1: {
        [this.alphabet['v-zV-Z'].source]: 'q4',
      },
      q2: {
        [this.alphabet['a-zA-Z'].source]: 'q5',
      },
      q3: {
        [this.alphabet['a-dA-D'].source]: 'q6',
      },
      q4: {
        [this.alphabet['a-zA-Z'].source]: 'q7',
      },
      q5: {
        [this.alphabet['a-zA-Z'].source]: 'q8',
      },
      q6: {
        [this.alphabet['a-zA-Z'].source]: 'q9',
      },
      q7: {
        [this.alphabet['-'].source]: 'q10',
      },
      q8: {
        [this.alphabet['-'].source]: 'q10',
      },
      q9: {
        [this.alphabet['-'].source]: 'q10',
      },
      q10: {
        [this.alphabet['0'].source]: 'q11',
        [this.alphabet['1-9'].source]: 'q14',
      },
      q11: {
        [this.alphabet['0'].source]: 'q12',
        [this.alphabet['1-9'].source]: 'q15',
      },
      q12: {
        [this.alphabet['1-9'].source]: 'q13',
      },
      q13: {
        [this.alphabet['-'].source]: 'q16',
      },
      q14: {
        [this.alphabet['0-9'].source]: 'q15',
      },
      q15: {
        [this.alphabet['0-9'].source]: 'q13',
      },
      q16: {
        [this.alphabet['a-zA-Z'].source]: 'q17',
      },
      q17: {},
    };
    this.initialState = 'q0';
    this.acceptState = 'q17';
  }

  processcadena(cadena) {
    let currentState = this.initialState;
    for (const symbol of cadena) {
           
      const transitionFunction = this.transitions[currentState];
      if (!transitionFunction) {
        return false; // La cadena no es aceptada
      }
      let symbolMatched = false;
      for (const key in this.alphabet) {
        if (this.alphabet[key].test(symbol)) {
          if (transitionFunction[this.alphabet[key].source]) {
            currentState = transitionFunction[this.alphabet[key].source];
            symbolMatched = true;
            break;
          }
        }
      }

      console.log("Letra: "+ symbol);
      console.log("Transicion: "+ currentState);

      acceptedValues.push({symbol,currentState});
      console.log( "acceptedValues");
      console.log( acceptedValues);
      if (!symbolMatched) {
        return false; // La cadena no es aceptada
      }
    }
    return currentState === this.acceptState;
  }
}

export const automaton = new Automata();
export const acceptedValues = [];
export let stateCadena = false;

export function ingresarCadena(cadena){
    console.log("Cadena desde el script: " + cadena);

    acceptedValues.length = 0;
    if (automaton.processcadena(cadena)) {
      console.log(`La cadena "${cadena}" es aceptada.`);
      stateCadena=true;
    } else {
      console.log(`La cadena "${cadena}" no es aceptada.`);
      stateCadena=false;
    }
  }
  
