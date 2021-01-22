export class FormValidator {
    constructor(validationSelectors, form) {
        this._config = validationSelectors;
        this._form = form
        this._formInputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    }

    get submitButton() {
        return this._submitButton;
    }

    enableValidation() {
        this._disableButtonAfterReset()
        this._toggleButtonState()
        this._formInputs.forEach(i => i.addEventListener('input', () => {
            this._isValid(this._form, i)
            this._toggleButtonState(this._formInputs, this._submitButton)
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

    _toggleButtonState = () =>
        this._hasInvalidInput(this._formInputs) ? this._disabledButton() : this._activateButton()

    _disabledButton = () => {
        this._submitButton.disabled = true
        this._submitButton.classList.add(this._config.submitButtonDisabledClass);
    }

    _activateButton = () => {
        this._submitButton.disabled = false
        this._submitButton.classList.remove(this._config.submitButtonDisabledClass);
    }

    _disableButtonAfterReset() {
        this._form.addEventListener('reset', () => {
                this._disabledButton(this._submitButton)
                this._formInputs.forEach(i => this._hideInputError(this._form, i))
            }
        );
    }
}