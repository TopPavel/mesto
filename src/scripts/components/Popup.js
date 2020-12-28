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
        this._element.addEventListener('mousedown', (evt) => this._closeByOverlay(evt));
        this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this))
    }

    _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            /*Quote: После того как селекторы будут написаны по BEM достаточно будет оставить проверку только на класс popup*/
            // Вопрос к ревьюеру:
            // странно, почему я не могу обойтись одним слушателем для всего блока и за счет всплытия закрывать попап при нажатии по
            // иконке закрытия, как было сделано раньше?
            this.close();
        }
    }

    _getPopup() {
        return document.querySelector(this._popupSelector);
    }
}