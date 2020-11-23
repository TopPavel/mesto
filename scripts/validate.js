function showInputError(form, inputRow, errorMessage) {
    inputRow.classList.add('popup__input_type_error');
    const formError = form.querySelector(`#${inputRow.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
}

function hideInputError(form, inputRow) {
    inputRow.classList.remove('popup__input_type_error');
    const formError = form.querySelector(`#${inputRow.id}-error`);
    formError.textContent = '';
    formError.classList.remove('popup__input-error_active');
}

function isValid(form, inputRow) {
    if (!inputRow.validity.valid) {
        showInputError(form, inputRow, inputRow.validationMessage);
    } else {
        hideInputError(form, inputRow);
    }
}

function setFormEventListeners(form) {
    const formInputs = Array.from(form.querySelectorAll('.popup__input'));
    const button = form.querySelector('.popup__save-button');
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
        button.classList.add('popup__save-button_inactive');
    } else {
        button.disabled = false
        button.classList.remove('popup__save-button_inactive');
    }
}

/*
Т.к. добавление попапов в моей реализации происходит динамически (их структура идентична),
    слушатели на форму добавляются при их создании.
Соответственно в проектной работе не реализован обход всех форм на странице
    и добавление валидации при рендере (как указано в задании)
*/