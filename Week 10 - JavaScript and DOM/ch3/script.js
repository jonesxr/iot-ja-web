

function guess() {
    let guess = parseInt(document.getElementById('guess').value);
    let right_or_wrong = document.getElementById('right_or_wrong');

    let randnumber = Math.floor(Math.random() * 6); // 0-5

    if (guess === randnumber) {
        right_or_wrong.textContent = "right!";

    } 
    else {

        right_or_wrong.textContent = `wrong ! the right number was : ` + randnumber;
    }
}