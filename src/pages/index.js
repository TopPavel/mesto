import './index.css';
import Card from './../scripts/components/Card.js'
import {
    addingContentButtonClass,
    avatarButtonSettingClass,
    avatarForm,
    avatarPopupSelector,
    likedContentClass,
    cardContainerSelector,
    cardDeleteForm,
    cardForm,
    cardPopupSelector,
    cardTemplateId,
    cardTitleSelector,
    deleteCardPopupSelector,
    imagePopupSelector,
    profileAvatarSelector,
    profileDescSelector,
    profileForm,
    profileNameSelector,
    profilePopupSelector,
    profileSettingButtonClass,
    validationConfig,
    deleteCardSubmitButtonElement,
    myUserId
} from "../scripts/utils/constants.js"
import PopupWithForm from "./../scripts/components/PopupWithForm.js";
import PopupWithImage from "./../scripts/components/PopupWithImage.js";
import Section from "./../scripts/components/Section.js";
import UserInfo from "./../scripts/components/UserInfo.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";
import PopupDelete from "../scripts/components/PopupDelete.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '4b572fb9-4ad5-4a1b-9e4b-14bc91bf7314',
        'Content-Type': 'application/json'
    }
});

const cardList = new Section({
        renderer: (data) => {
            cardList.addItem(createCard(data), false)
        }
    },
    cardContainerSelector);

const profile = new UserInfo(profileNameSelector, profileDescSelector, profileAvatarSelector);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();
const contentFormValidator = new FormValidator(validationConfig, cardForm);
contentFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
    (inputs) => {
        profileFormValidator.submitButton.textContent = 'Сохранение...'
        api.setUserInfo(inputs)
            .then((data) => {
                profile.setUserInfo({name: data.name, desc: data.about, avatar: data.avatar})
                profilePopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => profileFormValidator.submitButton.textContent = 'Сохранить');
    },
    profilePopupSelector
);

const avatarPopup = new PopupWithForm(
    (inputs) => {
        avatarFormValidator.submitButton.textContent = 'Сохранение...'
        api.setAvatar(inputs.link)
            .then((data) => {
                profile.setUserInfo({name: data.name, desc: data.about, avatar: data.avatar})
                avatarPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => avatarFormValidator.submitButton.textContent = 'Сохранить');
    },
    avatarPopupSelector
);


const deleteCardPopup = new PopupDelete(
    (data) => {
        deleteCardSubmitButtonElement.textContent = 'Удаление...'
        api.deleteCard(data)
            .then(() => {
                data.element.classList.add('content__list-item_remove');
                setTimeout(() => data.element.remove(), 200);
                deleteCardPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => deleteCardSubmitButtonElement.textContent = 'Да');
    },
    deleteCardPopupSelector
)

const contentPopup = new PopupWithForm(
    (inputs) => {
        contentFormValidator.submitButton.textContent = 'Сохранение...'
        api.createSomeOneCards(inputs)
            .then((data) => {
                cardList.addItem(createCard(data), true)
                contentPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => contentFormValidator.submitButton.textContent = 'Сохранить');
    },
    cardPopupSelector
);

const imagePopup = new PopupWithImage(imagePopupSelector);

function createCard(data) {
    const card = new Card(
        data,
        cardTemplateId,
        myUserId,
        (evt) => openImagePopup.bind(evt),
        () => {
            cardDeleteForm.elements.cardId.value = data._id
            deleteCardPopup.open(card)
        },
        () => api.likeCard(card._id)
            .then(data => {
                card.likeCount.textContent = data.likes.length;
                card.likeButton.classList.add(likedContentClass)
            })
            .catch((err) => {
                console.log(err);
            }),
        () => api.unlikeCard(card._id)
            .then((data) => {
                card.likeCount.textContent = data.likes.length;
                card.likeButton.classList.remove(likedContentClass)
            })
            .catch((err) => {
                console.log(err);
            })
    )
    return card.createCard()
}

function openPopupHandler(evt) {
    if (evt.target.classList.contains(profileSettingButtonClass)) {
        openProfilePopup()
    } else if (evt.target.classList.contains(addingContentButtonClass)) {
        contentPopup.open()
    } else if (evt.target.classList.contains(avatarButtonSettingClass)) {
        avatarPopup.open()
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

document.addEventListener('click', openPopupHandler);
profilePopup.setEventListeners();
contentPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarPopup.setEventListeners()

api.getUserInfo()
    .then((data) => {
        profile.setUserInfo({name: data.name, desc: data.about, avatar: data.avatar})
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((data) => {
        cardList.render(data)
    })
    .catch((err) => {
        console.log(err);
    });