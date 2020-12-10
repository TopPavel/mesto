import {FormValidator} from './FormValidator.js'

class Popup {
    constructor(element) {
        this._element = element
    }

    openPopup() {
        this._element.classList.remove('popup_hide');
        this._element.classList.add('popup_opened');
    }

    closePopup(evt) {
        if (
            evt.currentTarget.classList.contains('popup__edit-form')
            || evt.key === 'Escape'
            || evt.target.classList.contains('popup__close')
            || evt.target.classList.contains('popup')
        ) {
            this._element.classList.add('popup_hide');

            setTimeout(() => {
                this._element.classList.remove('popup_opened');
            }, 300);
        }
    }

    _setClosePopup(popup) {
        document.querySelector('.page').addEventListener('keydown', (evt) => this.closePopup(evt, popup));
        popup.addEventListener('mousedown', (evt) => this.closePopup(evt, popup));
    }
}

export class PopupWithForm extends Popup {
    constructor(popupId, ValidationSelectors, submit, setInputRows) {
        super();
        this._popupId = popupId;
        this._validationSelectors = ValidationSelectors;
        this._submit = submit;
        this._setInputRows = setInputRows;
        this._element = this._createPopup();
    }


    _createPopup() {
        const popup = this._getPopup();
        super._setClosePopup(popup);
        this._setProfileSettingForm(popup);
        return popup;
    }

    _setProfileSettingForm(popup) {
        const popupEditForm = popup.querySelector(`#${this._validationSelectors.formId}`);
        if (typeof (this._setInputRows) === 'function') {
            this._setInputRows();
        }
        new FormValidator(this._validationSelectors, popupEditForm).enableValidation()
        popupEditForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
            super.closePopup(evt, popup)
        });
    }

    _getPopup() {
        return document.querySelector(`#${this._popupId}`);
    }
}

export class ImagePopup extends Popup {
    constructor(popupId, imageSelector, titleSelector) {
        super();
        this._popupId = popupId;
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
        const popup = document.querySelector(`#${this._popupId}`);
        super._setClosePopup(popup)
        return popup;
    }
}