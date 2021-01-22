import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageTitle = this._element.querySelector('.popup__title-image');
        this._image = this._element.querySelector('.popup__image');
    }

    open(title, image) {
        this._image.src = image;
        this._image.alt = title
        this._imageTitle.textContent = title;
        super.open();
    }
}