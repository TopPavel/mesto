export class FormValidator {
    constructor(validationSelectors, form) {
        this._config = validationSelectors;
        this._form = form
    }

    enableValidation() {
        const formInputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const button = this._form.querySelector(this._config.submitButtonSelector);
        this._disableButtonAfterReset(this._form, button)
        this._toggleButtonState(formInputs, button)
        formInputs.forEach(i => i.addEventListener('input', () => {
            this._isValid(this._form, i)
            this._toggleButtonState(formInputs, button)
        }));
    }

    _showInputError(form, inputRow, errorMessage) {
        inputRow.classList.add(this._config.inputErrorClass);
        const formError = form.querySelector(`#${inputRow.id}-error`);
        formError.textContent = errorMessage;
        formError.classList.add(this._config.errorClass);
    }

    _hideInputError(form, inputRow) {
        const formError = form.querySelector(`#${inputRow.id}-error`);
        formError.textContent = '';
        inputRow.classList.remove(this._config.inputErrorClass);
        formError.classList.remove(this._config.errorClass);
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
            button.classList.add(this._config.submitButtonDisabledClass);
        } else {
            button.disabled = false
            button.classList.remove(this._config.submitButtonDisabledClass);
        }
    }

    _disableButtonAfterReset(form, button) {
        form.addEventListener('reset', () => {
            button.disabled = true
            button.classList.add(this._config.submitButtonDisabledClass);
            }
        );
    }
}