import Popup from "./Popup.js";
import {FormValidator} from "./FormValidator";

export default class PopupWithForm extends Popup {
    constructor({validationConfig, submit}, popupSelector, formSelector) {
        super(popupSelector);
        this._validationConfig = validationConfig;
        this._submit = submit;
        this.formSelector = formSelector;
        this._form = this._getForm();
        this.setEventListeners = this.setEventListeners()
    }

    setEventListeners() {
        super.setEventListeners();
        this._setProfileSettingForm()
    }

    _setProfileSettingForm() {
        new FormValidator(this._validationConfig, this._form).enableValidation()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            super.close();
        });
    }

    _getForm() {
        return this._element.querySelector(this.formSelector)
    }

    _getInputValues() {
        const inputValues = {}
        Array.from(this._form.elements).forEach(e => {
            if (e.localName === 'input' && e.name) {
                inputValues[e.name] = e.value
            }
        })
        return inputValues
    }
}
