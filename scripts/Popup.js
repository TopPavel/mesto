import {FormValidator, ValidationSelectors} from './FormValidator.js'
import Card from "./Card.js";

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

export class SettingPopup extends Popup {
    constructor(template, selector) {
        super();
        this._template = template;
        this._selector = selector;
        this._id = "setting-popup";
        this._title = "Редактировать профиль";
        this._buttonText = "Сохранить";
        this._element = this._createPopup();
    }


    _createPopup() {
        const popup = this._getPopupFromTemplate();
        super._setClosePopup(popup);
        this._setPopupInfo(popup, this._id, this._title, this._buttonText);
        this._setProfileSettingForm(popup);
        this._addPopupIfNecessary(popup)
        return popup;
    }

    _setProfileSettingForm(popup) {
        const popupEditForm = popup.querySelector('.popup__edit-form');
        const nameInput = popupEditForm.elements.input1;
        nameInput.value = document.querySelector('.profile__title-text').textContent;
        nameInput.minLength = 2;
        nameInput.maxLength = 40;
        const inputDesc = popupEditForm.elements.input2;
        inputDesc.value = document.querySelector('.profile__specialisation').textContent;
        inputDesc.minLength = 2;
        inputDesc.maxLength = 200;
        new FormValidator(
            new ValidationSelectors(
                '.popup__input',
                '.popup__save-button',
                'popup__save-button_inactive',
                'popup__input_type_error',
                'popup__input-error_active'
            ),
            popupEditForm
        ).enableValidation()
        popupEditForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            document.querySelector('.profile__title-text').textContent = popupEditForm.elements.input1.value;
            document.querySelector('.profile__specialisation').textContent = popupEditForm.elements.input2.value;
            super.closePopup(evt, popup)
        });
    }

    _setPopupInfo(popup, id, title, buttonText) {
        popup.id = id;
        popup.querySelector('.popup__title').textContent = title;
        popup.querySelector('.popup__save-button').textContent = buttonText;
    }

    _getPopupFromTemplate() {
        return document.querySelector(this._template).content.querySelector(this._selector).cloneNode(true);
    }

    _addPopupIfNecessary(popup) {
        if (popup !== null && !document.querySelector(`#${this._id}`)) {
            document.querySelector('.page').append(popup);
        }
    }
}

export class ContentPopup extends SettingPopup {
    constructor(template, selector) {
        super(template, selector);
        this._id = "add-content-popup";
        this._title = "Новое место";
        this._buttonText = "Создать";
        this._element = this._createPopup();
    }

    _createPopup() {
        const popup = super._getPopupFromTemplate();
        super._setClosePopup(popup);
        super._setPopupInfo(popup, this._id, this._title, this._buttonText);
        this._setCreateContentForm(popup);
        super._addPopupIfNecessary(popup)

        return popup;
    }

    _setCreateContentForm(popup) {
        const popupEditForm = popup.querySelector('.popup__edit-form');
        const nameInput = popupEditForm.elements.input1;
        nameInput.placeholder = "Название";
        nameInput.minLength = 2;
        nameInput.maxLength = 30;
        const linkInput = popupEditForm.elements.input2;
        linkInput.placeholder = "Ссылка на картинку";
        linkInput.type = "url";
        new FormValidator(
            new ValidationSelectors(
                '.popup__input',
                '.popup__save-button',
                'popup__save-button_inactive',
                'popup__input_type_error',
                'popup__input-error_active'
            ),
            popupEditForm
        ).enableValidation()
        popupEditForm.addEventListener('submit', (evt => {
            evt.preventDefault();
            const name = popupEditForm.elements.input1;
            const link = popupEditForm.elements.input1;
            new Card(name.value, link.value, '#card-template').addCard()
            super.closePopup(evt, popup);
            this._clearInputRows(popupEditForm);
        }));
    }

    _clearInputRows(form) {
        form.reset()
    }
}

export class ImagePopup extends Popup {
    constructor(image, title) {
        super();
        this._id = '#popup-image';
        this._image = image;
        this._title = title
        this._element = this._createPopup()
    }

    _createPopup() {
        const popup = document.querySelector('#popup-image');
        const popupImage = popup.querySelector('.popup__image');
        popup.querySelector('.popup__title-image').textContent = this._title;
        popupImage.src = this._image.src;
        super._setClosePopup(popup)

        return popup;
    }
}