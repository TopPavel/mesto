import Card from './Card.js'
import {initialCards} from './Data.js'
import {ImagePopup, PopupWithForm} from "./Popup.js";
import {ValidationSelectors} from "./FormValidator.js";

const profilePopup = new PopupWithForm(
    'profile-popup',
    new ValidationSelectors(
        'profile-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    () => {
        const popupEditForm = document.querySelector('#profile-form')
        document.querySelector('.profile__title-text').textContent = popupEditForm.elements.name.value;
        document.querySelector('.profile__specialisation').textContent = popupEditForm.elements.desc.value;
    },
    () => {
        const popupEditForm = document.querySelector('#profile-form')
        const nameInput = popupEditForm.elements.name;
        nameInput.value = document.querySelector('.profile__title-text').textContent;
        const inputDesc = popupEditForm.elements.desc;
        inputDesc.value = document.querySelector('.profile__specialisation').textContent;
    }
)

const contentPopup = new PopupWithForm(
    'card-popup',
    new ValidationSelectors(
        'card-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    () => {
        const popupEditForm = document.querySelector('#card-form')
        const name = popupEditForm.elements.title;
        const link = popupEditForm.elements.url;
        new Card(name.value, link.value, '#card-template').addCard()
        popupEditForm.reset()
    }
)
const imagePopup = new ImagePopup(
    'popup-image',
    '.popup__image',
    '.popup__title-image'
)

function openPopupHandler(evt) {
    if (evt.target.classList.contains('profile__setting')) {
        profilePopup.openPopup()
    } else if (evt.target.classList.contains('add-content')) {
        contentPopup.openPopup()
    } else if (evt.target.classList.contains('content__item-image')) {
        const image = evt.target.parentNode.querySelector('.content__item-image').src;
        const title = evt.target.parentNode.querySelector('.content__item-title').textContent
        imagePopup.openPopup(title, image)
    }
}

(function initialCustomCards() {
    initialCards.forEach(e => {
        const card = new Card(e.name, e.link, '#card-template')
        card.addCard()
    });
})();

document.addEventListener('click', openPopupHandler);