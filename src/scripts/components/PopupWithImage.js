import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.setEventListeners = super.setEventListeners()
    }

    open(title, image) {
        const img = this._element.querySelector('.popup__image');
        img.src = image;
        img.alt = title
        this._element.querySelector('.popup__title-image').textContent = title;
        super.open();
    }
}