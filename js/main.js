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
        let thisCardNumber = parseInt(thisCard.dataset.card);

        // Условие пи котором мы проверяем нужно валидировать эту карточку или нет
        if (thisCard.dataset.validate == "novalidate") {
            navigate("next", thisCard);
        } else {
            // При движении вперед сохраняем данные в обьект
            saveAnswer(thisCardNumber, gatherCardData(thisCardNumber));

            // Валидация на заплненость
            if(isFilled(thisCardNumber) && checkOnRequired(thisCardNumber)) {
                navigate("next", thisCard);
            } else {
                alert("Выберете вариант ответа прежде чем продолжить");
            }
            
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
    let currentCard = document.querySelector(`[data-card="${number}"]`);
   
    // Находим главный вопрос карточки
    question = currentCard.querySelector("[data-question]").innerText;
    
    // 1. Находим все заполненые значения из радио кнопок
    let radioValues = currentCard.querySelectorAll('[type="radio"]');

    radioValues.forEach( function(item) {
        if (item.checked) {
           result.push({
               name: item.name,
               value: item.value
           });
        }
    });

    // 2. Находим все заполненные значения из чекбоксов
    let checkboxValues = currentCard.querySelectorAll('[type="checkbox"]');
    checkboxValues.forEach(function(item) {
        console.dir(item)
        if (item.checked) {
            result.push({
                name: item.name,
                value: item.value
            });
         }
    });

    // 3. Находим все заполненные значения из импутов
    let inputValues = currentCard.querySelectorAll('[type="text"], [type="email"], [type="number"]');

    inputValues.forEach(function(item) {
        let itemValue = item.value;
        if (itemValue.trim() != "") {
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

// Функция записи ответов в обьект с ответами
function saveAnswer (number, data) {
    answers[number] = data;
}

// Функция проверки на заполненость
function isFilled(number) {
    console.log(answers[number].answer.length);
    if (answers[number].answer.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Доп функция для валидации имейла
function validateEmail (email) {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return pattern.test(email);
}

// Проверка на заполненость required чкбоксов и инпутов c email
function checkOnRequired(number) {
    let currentCard = document.querySelector(`[data-card="${number}"]`);
    let requiredFields = currentCard.querySelectorAll("[required]");

    let isValidArray = [];

    requiredFields.forEach(function(item) {
        console.dir(item.type)
        console.dir(item.value)
        console.dir(item.checked);

        if(item.type == "checkbox" && item.checked == "false") {
            isValidArray.push(false);
        } else if(item.type == "email") {
            if( validateEmail(item.value) ) {
                isValidArray.push(true);
            } else {
                isValidArray.push(false);
            }
        }
    });

    isValidArray.indexOf(false) 
    if(isValidArray.indexOf(false) == -1) {
        return true;
    } else {
        return false;
    }
}
