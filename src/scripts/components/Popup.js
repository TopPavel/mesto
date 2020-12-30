export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._element = this._getPopup();
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByEsc);
    }

    setEventListeners() {
        this._element.addEventListener('mousedown', this._closeByOverlay.bind(this));
    }

    _closePopupByEsc = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByOverlay = (evt) => {
        if (evt.target.classList.contains('popup')
            || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    _getPopup() {
        return document.querySelector(this._popupSelector);
    }
}