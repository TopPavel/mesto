import '../../pages/index.css';
import Card from './../components/Card.js'
import {
    addingContentButtonClass,
    avatarButtonSettingClass,
    avatarForm,
    avatarPopupSelector,
    avatarSubmitButtonClass,
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
    profileSubmitButtonClass,
    validationConfig
} from "../utils/constants.js"
import PopupWithForm from "./../components/PopupWithForm.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import Section from "./../components/Section.js";
import UserInfo from "./../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js";
import Api from "../components/Api.js";
import {cardSubmitButtonClass, deleteCardSubmitButtonClass, myUserId} from "../utils/constants";

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
avatarFormValidator.enableValidation()

const profilePopup = new PopupWithForm(
    (inputs) => {
        document.querySelector(profileSubmitButtonClass).textContent = 'Сохранение...'
        api.setUserInfo(inputs)
            .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            ).then((data) => {
            profile.setUserInfo({name: data.name, desc: data.about, avatar: data.avatar})
            profilePopup.close()
        })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => document.querySelector(profileSubmitButtonClass).textContent = 'Сохранить');
    },
    profilePopupSelector
);

const avatarPopup = new PopupWithForm(
    (inputs) => {
        document.querySelector(avatarSubmitButtonClass).textContent = 'Сохранение...'
        api.setAvatar(inputs.link)
            .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            )
            .then((data) => {
                document.querySelector(profileAvatarSelector).src = data.avatar
                avatarPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => document.querySelector(avatarSubmitButtonClass).textContent = 'Сохранить');
    },
    avatarPopupSelector
);


const deleteCardPopup = new PopupWithForm(
    (input) => {
        document.querySelector(deleteCardSubmitButtonClass).textContent = 'Удаление...'
        api.deleteCard(input)
            .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            )
            .then(() => {
                const card = document.getElementById(`${input.cardId}`)
                card.classList.add('content__list-item_remove');
                setTimeout(() => card.remove(), 200);
                deleteCardPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => document.querySelector(deleteCardSubmitButtonClass).textContent = 'Да');
    },
    deleteCardPopupSelector
)

const contentPopup = new PopupWithForm(
    (inputs) => {
        document.querySelector(cardSubmitButtonClass).textContent = 'Сохранение...'
        api.createSomeOneCards(inputs)
            .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            )
            .then((data) => {
                cardList.addItem(createCard(data), true)
                contentPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => document.querySelector(cardSubmitButtonClass).textContent = 'Сохранить');
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
            deleteCardPopup.open()
        },
        () => api.likeCard(card._id)
            .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .then(data => {
                const cardElement = document.getElementById(`${data._id}`)
                cardElement.querySelector('.content__like-count').textContent = data.likes.length;
                cardElement.querySelector('.content__like-button').classList.add('content_liked')
            })
            .catch((err) => {
                console.log(err);
            }),
        () => api.unlikeCard(card._id)
            .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .then((data) => {
                const cardElement = document.getElementById(`${data._id}`)
                cardElement.querySelector('.content__like-count').textContent = data.likes.length;
                cardElement.querySelector('.content__like-button').classList.remove('content_liked')
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
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then((data) => {
        profile.setUserInfo({name: data.name, desc: data.about, avatar: data.avatar})
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then((data) => {
        cardList.render(data)
    })
    .catch((err) => {
        console.log(err);
    });