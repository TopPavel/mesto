class Popup {
    constructor(element) {
        this._element = element
        this.closePopupByEsc = this.closePopupByEsc.bind(this);
    }

    openPopup() {
        this._element.classList.remove('popup_hide');
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this.closePopupByEsc);
    }

    closePopup() {
        this._element.classList.add('popup_hide');

        setTimeout(() => {
            this._element.classList.remove('popup_opened');
        }, 300);

        document.removeEventListener('keydown', this.closePopupByEsc);
    }

    closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    closePopupByPopup(evt) {
        if (
            evt.currentTarget.classList.contains('popup__edit-form')
            || evt.key === 'Escape'
            || evt.target.classList.contains('popup__close')
            || evt.target.classList.contains('popup')
        ) {
            this.closePopup()
        }
    }

    _setClosePopup(popup) {
        popup.addEventListener('mousedown', (evt) => this.closePopupByPopup(evt));
    }
}

export class PopupWithForm extends Popup {
    constructor(popupId, FormValidator, submit, formId) {
        super();
        this._popupId = popupId;
        this._formValidator = FormValidator;
        this._submit = submit;
        this.formId = formId;
        this._element = this._createPopup();
    }


    _createPopup() {
        const popup = this._getPopup();
        super._setClosePopup(popup);
        this._setProfileSettingForm(popup);
        return popup;
    }

    _setProfileSettingForm(popup) {
        const popupEditForm = popup.querySelector(`#${this.formId}`);
        this._formValidator.enableValidation()
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