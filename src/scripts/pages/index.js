import '../../pages/index.css';
import Card from './../components/Card.js'
import {
    cardContainerSelector,
    cardForm,
    cardFormSelector,
    cardPopupSelector,
    cardTemplateId,
    initialCards,
    profileDescSelector,
    profileForm,
    profileFormSelector,
    profileNameSelector,
    profilePopupSelector,
    validationConfig,
    someInputEvent
} from "../utils/constants.js"
import PopupWithForm from "./../components/PopupWithForm.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import Section from "./../components/Section.js";
import UserInfo from "./../components/UserInfo.js";

const profile = new UserInfo(profileNameSelector, profileDescSelector);

const profilePopup = new PopupWithForm(
    {validationConfig: validationConfig, submit: (inputs) => {
            profile.setUserInfo(inputs)
        }},
    profilePopupSelector,
    profileFormSelector
);

const contentPopup = new PopupWithForm(
    {
        validationConfig: validationConfig, submit: (inputs) => {
            const card = createCard(inputs);
            const section = new Section({
                    items: [inputs],
                    renderer: () => section.addItem(card)
                },
                cardContainerSelector
            );
            section.render()
            cardForm.reset();
        }
    },
    cardPopupSelector,
    cardFormSelector
);

const imagePopup = new PopupWithImage('.popup-image');

function createCard(data) {
    return new Card(data, cardTemplateId, (evt) => openImagePopup.bind(evt)).createCard();
}

function openPopupHandler(evt) {
    if (evt.target.classList.contains('profile__setting')) {
        openProfilePopup()
    } else if (evt.target.classList.contains('add-content')) {
        contentPopup.open()
    }
}

function openProfilePopup() {
    const userInfo = profile.getUserInfo()
    if (profileForm.elements.name.value === userInfo.name || profileForm.elements.name.value.length === 0) {
        profileForm.elements.name.value = userInfo.name;
        profileForm.elements.name.dispatchEvent(someInputEvent);
    }
    if (profileForm.elements.desc.value === userInfo.desc || profileForm.elements.desc.value.length === 0) {
        profileForm.elements.desc.value = userInfo.desc;
        profileForm.elements.name.dispatchEvent(someInputEvent);
    }
    profilePopup.open()
}

function openImagePopup(evt) {
    const image = evt.target.src;
    const title = evt.target.parentNode.querySelector('.content__item-title').textContent
    imagePopup.open(title, image)
}

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item));
        }
    },
    '.content__list');

cardList.render();

document.addEventListener('click', openPopupHandler);