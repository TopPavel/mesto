import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(onSubmit, popupSelector) {
        super(popupSelector);
        this._form = document.querySelector(popupSelector + ' form');
        this._onSubmit = onSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }

    close() {
        super.close();
        this._form.reset()
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._onSubmit(this._getInputValues());
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
