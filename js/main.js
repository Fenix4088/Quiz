// Движение вперед
let btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach( function(button) {
    button.addEventListener('click', function() {
        console.log("Next");

        let thisCard = this.closest('[data-card]');
        let thisCardNumber = parseInt(thisCard.dataset.card);
        let nextCard = thisCardNumber + 1;

        thisCard.classList.add("hidden");

        document.querySelector(`[data-card="${nextCard}"]`).classList.remove('hidden');

    });
});

// Движение назат
let btnPrev = document.querySelectorAll('[data-nav="prev"]');
