import '../../pages/index.css';
/*
Я про то, что если в классе PopupWithForm в конструкторе добавить "переопределенное" включение слушателей,
то при создании экземпляра этого класса слушатели будут установлены "автоматически" при инициализации.

Пример: export default class PopupWithForm extends Popup {
    constructor(onSubmit, popupSelector) {
        super(popupSelector);
        this._form = document.querySelector(popupSelector + ' form');
        this._onSubmit = onSubmit;
        this.setEventListeners = this.setEventListeners() ---> вот об этой строке идет речь
    }

    Поэтому спросил, почему так нельзя?
* */
import Card from './../components/Card.js'
import {
    addingContentButtonClass,
    cardContainerSelector,
    cardForm,
    cardPopupSelector,
    cardTemplateId,
    cardTitleSelector,
    imagePopupSelector,
    initialCards,
    profileDescSelector,
    profileForm,
    profileNameSelector,
    profilePopupSelector,
    profileSettingButtonClass,
    validationConfig
} from "../utils/constants.js"
import PopupWithForm from "./../components/PopupWithForm.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import Section from "./../components/Section.js";
import UserInfo from "./../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js";

const profile = new UserInfo(profileNameSelector, profileDescSelector);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();
const contentFormValidator = new FormValidator(validationConfig, cardForm);
contentFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
    (inputs) => {
        profile.setUserInfo(inputs)
        profilePopup.close()
    },
    profilePopupSelector
);

const contentPopup = new PopupWithForm(
    (inputs) => {
        const card = createCard(inputs);
        cardList.addItem(card)
        contentPopup.close()
    },
    cardPopupSelector
);

const imagePopup = new PopupWithImage(imagePopupSelector);

function createCard(data) {
    return new Card(data, cardTemplateId, (evt) => openImagePopup.bind(evt)).createCard();
}

function openPopupHandler(evt) {
    if (evt.target.classList.contains(profileSettingButtonClass)) {
        openProfilePopup()
    } else if (evt.target.classList.contains(addingContentButtonClass)) {
        contentPopup.open()
    }
}

function openProfilePopup() {
    const userInfo = profile.getUserInfo()
    setInputValueWithCheck(profileForm.elements.name, userInfo.name);
    setInputValueWithCheck(profileForm.elements.desc, userInfo.desc);
    profilePopup.open()
}

function setInputValueWithCheck(input, value) {
    if (input.value === value || input.value.length === 0) {
        input.value = value
    }
}

function openImagePopup(evt) {
    const image = evt.target.src;
    const title = evt.target.parentNode.querySelector(cardTitleSelector).textContent
    imagePopup.open(title, image)
}

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item));
        }
    },
    cardContainerSelector);

cardList.render();

document.addEventListener('click', openPopupHandler);
profilePopup.setEventListeners();
contentPopup.setEventListeners();
imagePopup.setEventListeners();
