// 1. Функционал перемещения по карточкам
// 2. Проверка на ввод данных
// 3. Сбор данных с карточек
// 4. Записывать все введенные данные
// 5. Рализовать работу прогресс бара
// 6. Подсветка рамки для радио и чекбоксов



// Движение вперед
let btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach( function(button) {
    button.addEventListener('click', function() {

        let thisCard = this.closest('[data-card]');
        // Условие пи котором мы проверяем нужно валидировать эту карточку или нет
        if (thisCard.dataset.validate == "novalidate") {
            console.log("NOVALIDATE");
            navigate("next", thisCard);
        } else {
            console.log("VALIDATE");
            navigate("next", thisCard);
        }
        

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