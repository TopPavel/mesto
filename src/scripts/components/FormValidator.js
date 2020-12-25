export class FormValidator {
    constructor(ValidationSelectors, form) {
        this._validationSelectors = ValidationSelectors;
        this._form = form
    }

    enableValidation() {
        const formInputs = Array.from(this._form.querySelectorAll(this._validationSelectors.inputSelector));
        const button = this._form.querySelector(this._validationSelectors.submitButtonSelector);
        this._disableButtonAfterReset(this._form, button)
        this._toggleButtonState(formInputs, button)
        formInputs.forEach(i => i.addEventListener('input', () => {
            this._isValid(this._form, i)
            this._toggleButtonState(formInputs, button)
        }));
    }

    _showInputError(form, inputRow, errorMessage) {
        inputRow.classList.add(this._validationSelectors.inputErrorClass);
        const formError = form.querySelector(`#${inputRow.id}-error`);
        formError.textContent = errorMessage;
        formError.classList.add(this._validationSelectors.errorClass);
    }

    _hideInputError(form, inputRow) {
        inputRow.classList.remove(this._validationSelectors.inputErrorClass);
        const formError = form.querySelector(`#${inputRow.id}-error`);
        formError.textContent = '';
        formError.classList.remove(this._validationSelectors.errorClass);
    }

    _isValid(form, inputRow) {
        if (!inputRow.validity.valid) {
            this._showInputError(form, inputRow, inputRow.validationMessage);
        } else {
            this._hideInputError(form, inputRow);
        }
    }

    _hasInvalidInput(inputs) {
        return inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputs, button) {
        if (this._hasInvalidInput(inputs)) {
            button.disabled = true
            button.classList.add(this._validationSelectors.submitButtonDisabledClass);
        } else {
            button.disabled = false
            button.classList.remove(this._validationSelectors.submitButtonDisabledClass);
        }
    }

    _disableButtonAfterReset(form, button) {
        form.addEventListener('reset', () => {
            button.disabled = true
            button.classList.add(this._validationSelectors.submitButtonDisabledClass);
            }
        );
    }
}

export class ValidationSelectors {
    constructor(
        formId,
        inputSelector,
        submitButtonSelector,
        submitButtonDisabledClass,
        inputErrorClass,
        errorClass
    ) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._submitButtonDisabledClass = submitButtonDisabledClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._formSelector = formId;
    }

    get formId() {
        return this._formSelector;
    }

    get inputSelector() {
        return this._inputSelector;
    }

    get submitButtonSelector() {
        return this._submitButtonSelector;
    }

    get submitButtonDisabledClass() {
        return this._submitButtonDisabledClass;
    }

    get inputErrorClass() {
        return this._inputErrorClass;
    }

    get errorClass() {
        return this._errorClass;
    }
}