import './../pages/index.css';
import Card from './components/Card.js'
import {
    cardContainerSelector,
    cardForm,
    initialCards,
    profileDescSelector,
    profileForm,
    profileNameSelector
} from "./components/Data.js"
import {ImagePopup, PopupWithForm} from "./components/Popup.js";
import {FormValidator, ValidationSelectors} from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Profile from "./components/Profile.js";

const profileValidator = new FormValidator(
    new ValidationSelectors(
        'profile-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    profileForm
);

const cardFormValidator = new FormValidator(
    new ValidationSelectors(
        'card-form',
        '.popup__input',
        '.popup__save-button',
        'popup__save-button_inactive',
        'popup__input_type_error',
        'popup__input-error_active'
    ),
    cardForm
);

const profile = new Profile(profileNameSelector, profileDescSelector);

const profilePopup = new PopupWithForm(
    'profile-popup',
    profileValidator,
    () => {
        profile.setProfileInfo(profileForm.elements.name.value, profileForm.elements.desc.value)
    },
    'profile-form'
);

const contentPopup = new PopupWithForm(
    'card-popup',
    cardFormValidator,
    () => {
        const name = cardForm.elements.title.value;
        const link = cardForm.elements.url.value;
        const card = new Card({name, link}, '#card-template').createCard();
        const section = new Section({
                items: [{name, link}],
                renderer: () => section.addItem(card)
            },
            cardContainerSelector
        );
        section.render()
        cardForm.reset();
    },
    'card-form'
);

const imagePopup = new ImagePopup(
    'popup-image',
    '.popup__image',
    '.popup__title-image'
);

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
    profileForm.elements.name.value = profile.name;
    profileForm.elements.desc.value = profile.desc;
    profilePopup.openPopup()
}

function openImagePopup(evt) {
    const image = evt.target.parentNode.querySelector('.content__item-image').src;
    const title = evt.target.parentNode.querySelector('.content__item-title').textContent
    imagePopup.openPopup(title, image)
}

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(new Card(item, '#card-template').createCard());
        }
    },
    '.content__list');

cardList.render();

document.addEventListener('click', openPopupHandler);