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
        const popupEditForm = data.profileForm
        data.profileName.textContent = popupEditForm.elements.name.value;
        data.profileDesc.textContent = popupEditForm.elements.desc.value;
    },
    'profile-form'
)

const contentPopup = new PopupWithForm(
    'card-popup',
    cardFormValidator,
    () => {
        const popupEditForm = data.cardForm
        const name = popupEditForm.elements.title;
        const link = popupEditForm.elements.url;
        new Card(name.value, link.value, '#card-template').addCard()
        popupEditForm.reset()
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
    const popupEditForm = data.profileForm
    const nameInput = popupEditForm.elements.name;
    const descInput = popupEditForm.elements.desc;
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