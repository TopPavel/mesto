import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupId, imageSelector, titleSelector) {
        super(popupId);
        this._imageSelector = imageSelector;
        this._titleSelector = titleSelector;
        this._element = this._createPopup()
    }

    openPopup(title, image) {
        this._element.querySelector(this._imageSelector).src = image;
        this._element.querySelector(this._titleSelector).textContent = title;
        super.openPopup();
    }

    _createPopup() {
        const popup = super.element;
        super.setClosePopup(popup);
        return popup;
    }
}