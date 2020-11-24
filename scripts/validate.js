/* Вопрос к ревьюеру: Зачем делать промежуточною функцию "enableValidation" если в моей реализации попапы добавляются на страницу динамически?
(динамическое добавление попапов было зачтено в предыдущей работе)
  Функция setFormEventListeners(form) прекрасно с этим справляется.
  Именно для этого я и оставил комментарий вконце данного файла перед сдачей на проверку.
  Хочется узнать недостатки моего решения, в отличии от того, что представлено в задании (обход всей стриницы, поиск форм, добавление валидации на поля ввода)
  Буду очень рад обратной связи, спасибо))
 */


const validationSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonDisabledClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

function showInputError(form, inputRow, errorMessage) {
    inputRow.classList.add(validationSelectors.inputErrorClass);
    const formError = form.querySelector(`#${inputRow.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(validationSelectors.errorClass);
}

function hideInputError(form, inputRow) {
    inputRow.classList.remove(validationSelectors.inputErrorClass);
    const formError = form.querySelector(`#${inputRow.id}-error`);
    formError.textContent = '';
    formError.classList.remove(validationSelectors.errorClass);
}

function isValid(form, inputRow) {
    if (!inputRow.validity.valid) {
        showInputError(form, inputRow, inputRow.validationMessage);
    } else {
        hideInputError(form, inputRow);
    }
}

function setFormEventListeners(form) {
    const formInputs = Array.from(form.querySelectorAll(validationSelectors.inputSelector));
    const button = form.querySelector(validationSelectors.submitButtonSelector);
    toggleButtonState(formInputs, button)
    formInputs.forEach(i => i.addEventListener('input', () => {
        isValid(form, i)
        toggleButtonState(formInputs, button)
    }));
}

function hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.disabled = true
        button.classList.add(validationSelectors.submitButtonDisabledClass);
    } else {
        button.disabled = false
        button.classList.remove(validationSelectors.submitButtonDisabledClass);
    }
}

/*
Т.к. добавление попапов в моей реализации происходит динамически (их структура идентична),
    слушатели на форму добавляются при их создании.
Соответственно в проектной работе не реализован обход всех форм на странице
    и добавление валидации при рендере (как указано в задании)
*/