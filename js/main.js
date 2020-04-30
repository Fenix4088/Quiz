// 1. Функционал перемещения по карточкам
// 2. Проверка на ввод данных
// 3. Сбор данных с карточек
// 4. Записывать все введенные данные
// 5. Рализовать работу прогресс бара
// 6. Подсветка рамки для радио и чекбоксов


// Обьект с сохраненными ответами
let answers = {
    2: null,
    3: null,
    4: null,
    5: null
}



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

// Функция для движения вперед и движения назат
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

// Функция которая союирает все данные из текущей карточки
function gatherCardData (number) {
    /* 
        {
            question: "Ваше любимое блюдо",
            answer: [
                {name: 'pirogi', value: "Pirogi"},
                {name: 'salaty', value: "Salaty"}
            ]
        }
    */

    let question;
    let result = [];

    // Находим карточку по номеру и по дата атрибуту
    let curentCard = document.querySelector(`[data-card="${number}"]`);
   
    // Находим главный вопрос карточки
    question = curentCard.querySelector("[data-question]").innerText;
    
    // 1. Находим все заполненые значения из радио кнопок
    let radioValues = curentCard.querySelectorAll('[type="radio"]');
    // console.log(radioValues);
    radioValues.forEach( function(item) {
        if (item.checked) {
           result.push({
               name: item.name,
               value: item.value
           });
        }
    });

    console.log(result);

    let data = {
        question: question,
        answer: result
    }

    return data;

}
