//taulukko vastauksille 
let answer = [];

function reset() {

    answer = [];
    //3 krt
    for (let i = 1; i <= 3; i++) {
        //arvotaan kaksi lukua 
        var n1 = Math.floor(Math.random() * 11); // 0-10

        var n2 = Math.floor(Math.random() * 11); // 0-10
        //kerrotaan toisillaa ja taulukkoo
        answer.push(n1 * n2);
        
        // näytetään laskut 
        var p = document.getElementById('p' + i);

        p.textContent = n1 + "x" + n2 + "=";
        
        // Tyhjennetään input-kenttä
        var input = document.getElementById('a' + i);
        //syöte tyhjäksi
        input.value = '';
    }
    
    // Tyhjennetään lopputulosteksti
    var f = document.getElementById('f');
    f.textContent = '';
}


//syöte tarkistukset 
function check() {
    //right or wrong
    var R_W = '';
    
    for (var i = 1; i <= 3; i++) {
        //haetaan syöte 
        var input = parseInt(document.getElementById('a' + i).value);
        
        // Tarkistetaan, onko vastaus oikein vai väärin
        if (input === answer[i - 1]) {
            R_W += i+'.' +'R  ';
        } 
        else {
            R_W += i+'.' +'W  ';
        }
    }
    
    // Näytetään lopputulos
    var result = document.getElementById('R_W');
    result.textContent = R_W;
}

//oikeat vastaukset 
function show() {
    //krt 3x
    for (var i = 1; i <= 3; i++) {
        // a1 jne..
        var input = document.getElementById('a' + i);
        // -1 indeksi oikein
        input.value = answer[i - 1];
    }
}



reset();
