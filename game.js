const cards = document.querySelectorAll('.card');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flip() {
    if(lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;

        return;
    }
    
    secondCard = this;

    checkMatch();

    setTimeout(checkWin, 500);
}

function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : flipBack();
}

function disableCards() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);

    resetBoard();
}

function flipBack() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);

        card.style.order = randomPos;
    });
})();

function checkWin() {
    const testing = Array.from(cards);
    const checkIfAll = testing.every(card => card.classList.contains('flip'));
  
    if (checkIfAll){
        alert("You win!");
    }
}

cards.forEach(card => card.addEventListener('click', flip));