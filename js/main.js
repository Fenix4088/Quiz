// Движение вперед
let btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach( function(button) {
    button.addEventListener('click', function() {

        let thisCard = this.closest('[data-card]');
        navigate("next", thisCard);

    });
});

// Движение назат
let btnPrev = document.querySelectorAll('[data-nav="prev"]');
btnPrev.forEach( function(button) {
    button.addEventListener('click', function() {

        let thisCard = this.closest('[data-card]');
        navigate("prev", thisCard);

    });
});


function navigate (direction, thisCard) {
    let thisCardNumber = parseInt(thisCard.dataset.card);
    let nextCard;
    if (direction == "next") {

        nextCard = thisCardNumber + 1;

    } else if (direction == "prev") {

        nextCard = thisCardNumber - 1;

    }

    thisCard.classList.add("hidden");
    document.querySelector(`[data-card="${nextCard}"]`).classList.remove('hidden');

}