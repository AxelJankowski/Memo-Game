const cards = document.querySelectorAll('.card');

let flippedCard = false;
let firstCard, secondCard;

function flip() {
    this.classList.add('flip');

    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        flippedCard = false;
        secondCard = this;

        //check
        if (firstCard.dataset.name === secondCard.dataset.name) {
            //match
            firstCard.removeEventListener('click', flip);
            secondCard.removeEventListener('click', flip);
        } else {
            //mistake
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }
    }
}

cards.forEach(card => card.addEventListener('click', flip));