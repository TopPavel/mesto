import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(onSubmit, popupSelector) {
        super(popupSelector)
        this._form = this._element.querySelector(popupSelector + ' form');
        this._onSubmit = onSubmit;
        this._params = this.params;
    }

    get params() {
        return this._params;
    }

    open(params) {
        super.open();
        this._params = params;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._onSubmit(this.params);
    }
}