export default class Popup {
    constructor(popupId) {
        this._popupId = popupId;
        this._element = this._getPopup();
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
    }

    get element() {
        return this._element;
    }

    openPopup() {
        this._element.classList.remove('popup_hide');
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }

    closePopup() {
        this._element.classList.add('popup_hide');

        setTimeout(() => {
            this._element.classList.remove('popup_opened');
        }, 300);

        document.removeEventListener('keydown', this._closePopupByEsc);
    }

    setClosePopup(popup) {
        popup.addEventListener('mousedown', (evt) => this._closePopupByPopup(evt));
    }

    _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _closePopupByPopup(evt) {
        if (
            evt.currentTarget.classList.contains('popup__edit-form')
            || evt.target.classList.contains('popup__close')
            || evt.target.classList.contains('popup')
        ) {
            this.closePopup();
        }
    }

    _getPopup() {
        return document.querySelector(`#${this._popupId}`);
    }
}