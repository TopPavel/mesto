import '../../pages/index.css';
/*
* Комментарий ревьювера:
*
*  В данном файле отсутствуют:
*    ̶1̶.̶С̶о̶з̶д̶а̶н̶и̶е̶ ̶э̶к̶з̶е̶м̶п̶л̶я̶р̶о̶в̶ ̶в̶а̶л̶и̶д̶а̶т̶о̶р̶а̶ ̶д̶л̶я̶ ̶к̶а̶ж̶д̶о̶г̶о̶ ̶п̶о̶п̶а̶п̶а̶ ̶и̶ ̶в̶к̶л̶ю̶ч̶е̶н̶и̶е̶ ̶в̶а̶л̶и̶д̶а̶ц̶и̶и̶.̶
*    2. Включение слушателей для каждого попапа.
*
*Мой вопрос:
*    Почему слушатели должны включаться именно в этом фале?
*    Почему я не могу включать их при создании экземпляра в конструкторе класса?
* */
import Card from './../components/Card.js'
import {
    cardContainerSelector,
    cardForm,
    profileForm,
    cardPopupSelector,
    cardTemplateId,
    initialCards,
    profileDescSelector,
    profileNameSelector,
    profilePopupSelector,
    imagePopupSelector,
    cardTitleSelector,
    validationConfig,
    profileSettingButtonClass,
    addingContentButtonClass
} from "../utils/constants.js"
import PopupWithForm from "./../components/PopupWithForm.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import Section from "./../components/Section.js";
import UserInfo from "./../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js";

const profile = new UserInfo(profileNameSelector, profileDescSelector);
new FormValidator(validationConfig, profileForm).enableValidation();
new FormValidator(validationConfig, cardForm).enableValidation();

const profilePopup = new PopupWithForm(
    (inputs) => {
        profile.setUserInfo(inputs)
        profilePopup.close()
    },
    profilePopupSelector
);

const contentPopup = new PopupWithForm(
    (inputs) => {
        initialCards.push({name: inputs.name, link: inputs.link})
        cardList.render()
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
