"use strict";

const { match } = require("assert");
const { SIGFPE } = require("constants");

/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING


function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
    let sum = 0;
    
    const CompWord = word.toUpperCase();
    const CompGuess = guess.toUpperCase();

    let index = [];

    let bool = Boolean(true);

    for( let i = CompWord.length -1; i >=0 ; i --){
        for (let j = CompGuess.length-1 ; j >=0 ; j --){
            let a = CompWord[i];
            let b = CompGuess[j];
            
            if (CompWord[i] === CompGuess[j]){
                
                for(let k =0; k <= index.length; k ++){
                    if( j === index[k]){
                        bool = Boolean(false);
                    }
                }
                if( bool == true){
                    sum++;
                    index.push(j);
                    i --;
                }
                bool => Boolean(true);
            }
        }
    }

    return sum;
}
