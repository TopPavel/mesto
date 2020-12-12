import Card from './Card.js'
import * as data from './Data.js'
import {ImagePopup, PopupWithForm} from "./Popup.js";
import {ValidationSelectors, FormValidator} from "./FormValidator.js";

const profileValidator = new FormValidator(
    new ValidationSelectors(
        'profile-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    data.profileForm
)

const cardFormValidator = new FormValidator(
    new ValidationSelectors(
        'card-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    data.cardForm
)

const profilePopup = new PopupWithForm(
    'profile-popup',
    profileValidator,
    () => {
        data.profileName.textContent = data.profileForm.elements.name.value;
        data.profileDesc.textContent = data.profileForm.elements.desc.value;
    },
    'profile-form'
)

const contentPopup = new PopupWithForm(
    'card-popup',
    cardFormValidator,
    () => {
        const name = data.cardForm.elements.title;
        const link = data.cardForm.elements.url;
        new Card(name.value, link.value, '#card-template').addCard()
        data.cardForm.reset()
    },
    'card-form'
)
const imagePopup = new ImagePopup(
    'popup-image',
    '.popup__image',
    '.popup__title-image'
)

function openPopupHandler(evt) {
    if (evt.target.classList.contains('profile__setting')) {
        openProfilePopup()
    } else if (evt.target.classList.contains('add-content')) {
        contentPopup.openPopup()
    } else if (evt.target.classList.contains('content__item-image')) {
        openImagePopup(evt)
    }
}

function openProfilePopup() {
    const nameInput = data.profileForm.elements.name;
    const descInput = data.profileForm.elements.desc;
    nameInput.value = data.profileName.textContent;
    descInput.value = data.profileDesc.textContent;
    profilePopup.openPopup()
}

function openImagePopup(evt) {
    const image = evt.target.parentNode.querySelector('.content__item-image').src;
    const title = evt.target.parentNode.querySelector('.content__item-title').textContent
    imagePopup.openPopup(title, image)
}

(function initialCustomCards() {
    data.initialCards.forEach(e => {
        const card = new Card(e.name, e.link, '#card-template')
        card.addCard()
    });
})();

document.addEventListener('click', openPopupHandler);