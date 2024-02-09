// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

const playBtn = document.querySelector('#btn-play'); //dichiarazione variabile per indicare il bottone di play
//console.log('Tasto di play:', playBtn);
const delateBtn = document.querySelector('#btn-delate'); //dichiarazione variabile per indicare il bottone di annulla
//console.log('Tasto di annulla:', delateBtn);

playBtn.addEventListener('click', function(){ //dichiarazione per indicare la funzione di click sul bottone
    gridCreate(); //richiamo la funzione della creazione del game-board
    
    
})

delateBtn.addEventListener('click', function(){
    //console.log('Tasto premuto!');
    window.location.reload(); //funzione che ricarica la pagina HTML
})

/*
* Funzione per indicare la selezione
* del livello
*/

function getLevel(){
    const level = document.querySelector('#get-level').value; //dichiarazione variabile per indicare il livello scelto
    //console.log('Valore:', level);
    
    return level;
}

/*
* Funzione per indicare la creazione
* della cella
*/

function cellsCreate(){
    const cell = document.createElement('div'); //dichiarazione variabile che crea un <div></div>
    //console.log('Creazione div:', cell);
    cell.classList.add('cell'); //aggiunge all'elemento cella la classe: cell
    
    return cell;
}

/*
* Funzione per indicare la creazione
* delle griglie
*/

function gridCreate(){
    const grid = document.querySelector('#game-board'); //dichiarazione variabile per indicare la game-board
    //console.log('Griglia:', grid);
    const level = getLevel(); //dichiarazione variabile che riprende la funzione
    const posizioneBombe = [];
    //console.log('Livello scelto:', level);
    let gridDimension = [ //dichiarazione array per indicare le celle presenti all'interno del game-board
        100,
        81,
        49
    ];
    //console.log('Dimensioni game-boards:', gridDimension);
    let totalCells = gridDimension[level - 1];
    //console.log('Celle totali:', totalCells);
    let rowCells = Math.sqrt(totalCells); //radice quadrata di un numero nell'array
    //console.log('Radice quadrata:', rowCells);
    let difficolta=document.getElementById("get-level").value;
    console.log(difficolta)
    if (difficolta == "Scegli la difficoltà"){
    } else  {
        for (let x = 0; x < 16; x++) {
            let newNumber = generaNumeri(1, totalCells);
            if ( posizioneBombe.includes(newNumber)){
                x--;
            } else {
                posizioneBombe.push(newNumber);
            }
        }
        playBtn.disabled = true;
        delateBtn.disabled = false;
        console.log(posizioneBombe);
    }


    /*
    * Ciclo for per la creazione delle celle
    * all'interno della griglia
    */

    for(let i = 0; i < totalCells; i++){

        let cell = cellsCreate(i); //dichiarazione variabile che dipende dalla funzione
        //console.log('Celle create:', cell);
        cell.style.width = `calc(100% / ${rowCells})`; //modifichiamo la grandezza delle celle
        cell.style.height = `calc(100% / ${rowCells})`; //modifichiamo l'altezza delle celle
        cell.innerHTML= i+1;
        grid.append(cell);


        // aggiungo un event listener del click ad ogni cella
        cell.addEventListener("click", cellClick)
        
    }
    let result = 0;
    function cellClick(event){

        console.log(this);
        console.log(event.target);
        event.target.classList.add("active");

        if (posizioneBombe.includes(parseInt(this.innerHTML))) {

            event.target.innerHTML = '<img src="img/icons8-film-jolly-100.png" class="jolly"></img>';
            let disabledCells = document.getElementsByClassName("cell");
            console.log(disabledCells)

            for (let a = 0; a < totalCells; a++ ) {

                disabledCells[a].removeEventListener("click", cellClick);
                if (posizioneBombe.includes(a + 1)) {

                    disabledCells[a].innerHTML = '<img src="img/icons8-film-jolly-100.png" class="jolly"></img>';

                }
            }
        document.getElementById("result").innerHTML = `il tuo risultato e' ${result} `;  
         
        } else {

            result++;
            console.log(result);

            if (result == totalCells - 16) {
                document.getElementById("result").innerHTML = ` HAI VINTO!! `;

            }

        } 
        this.removeEventListener("click", cellClick);
    }    
}




//funzione per indicare il numero di jolly
function generaNumeri(min, max){
    return Math.floor(Math.random()* max - min + 1);  
}