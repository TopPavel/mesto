const page = document.querySelector('.page');
const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__setting');
const addContentButton = profile.querySelector('.add-content');
const profileTitleText = profile.querySelector('.profile__title-text');
const profileSpec = profile.querySelector('.profile__specialisation');
const cardList = page.querySelector('.content__list');
const popupImage = page.querySelector('#popup-image');
const popupTemplate = document.querySelector('#popup-template').content.querySelector(".popup");
const cardTemplate = document.querySelector('#card-template').content.querySelector(".content__list-item");
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopupHandler(evt) {
    addPopupIfNecessary(evt);
    if (evt.target.classList.contains('profile__setting')) {
        openPopup(page.querySelector('#setting-popup'));
    } else if (evt.target.classList.contains('add-content')) {
        openPopup(page.querySelector('#add-content-popup'));
    }
}

function openPopup(popup) {
    popup.classList.remove('popup_hide');
    popup.classList.add('popup_opened');

}

function closePopup(evt, popup) {
    if (
        evt.currentTarget.classList.contains('popup__edit-form')
        || evt.target.classList.contains('popup__close')
        || evt.target.classList.contains('popup')
    ) {
        popup.classList.add('popup_hide');

        setTimeout(() => {
            popup.classList.remove('popup_opened');
        }, 300);
    }
}

function createProfileSettingPopup() {
    const popup = getPopupFromTemplate(popupTemplate);
    setClosePopup(popup);
    setPopupInfo(popup, "setting-popup", "Редактировать профиль", "Сохранить");
    setProfileSettingForm(popup);
    page.append(popup);
    return popup;
}

function setProfileSettingForm(popup) {
    const popupEditForm = popup.querySelector('.popup__edit-form');
    const nameInput = popupEditForm.elements.input1;
    nameInput.value = profileTitleText.textContent;
    nameInput.minLength = 2;
    nameInput.maxLength = 40;
    const inputDesc = popupEditForm.elements.input2;
    inputDesc.value = profileSpec.textContent;
    inputDesc.minLength = 2;
    inputDesc.maxLength = 200;
    setFormEventListeners(popupEditForm);
    popupEditForm.addEventListener('submit', saveProfileChanges);
}

function saveProfileChanges(evt) {
    evt.preventDefault();
    const popup = page.querySelector('#setting-popup');
    const popupEditForm = popup.querySelector('.popup__edit-form');
    profileTitleText.textContent = popupEditForm.elements.input1.value;
    profileSpec.textContent = popupEditForm.elements.input2.value;
    closePopup(evt, popup)
}

function createAddContentPopup() {
    const popup = getPopupFromTemplate(popupTemplate);
    setClosePopup(popup);
    setCreateContentForm(popup);
    setPopupInfo(popup, "add-content-popup", "Новое место", "Создать");
    page.append(popup);

    return popup;
}

function getPopupFromTemplate(template) {
    return template.cloneNode(true);
}

function setClosePopup(popup) {
    popup.addEventListener('mousedown', (evt) => closePopup(evt, popup));
}

function setCreateContentForm(popup) {
    const popupEditForm = popup.querySelector('.popup__edit-form');
    const nameInput = popupEditForm.elements.input1;
    nameInput.placeholder = "Название";
    nameInput.minLength = 2;
    nameInput.maxLength = 30;
    const linkInput = popupEditForm.elements.input2;
    linkInput.placeholder = "Ссылка на картинку";
    linkInput.type = "url";
    setFormEventListeners(popupEditForm);
    popupEditForm.addEventListener('submit', renderSomeOneCard);
}

function setPopupInfo(popup, id, title, buttonText) {
    popup.id = id;
    popup.querySelector('.popup__title').textContent = title;
    popup.querySelector('.popup__save-button').textContent = buttonText;
}

function clearInputRows(form) {
    form.reset()
}

function createCard(name, link) {
    const card = getCardFromTemplate(cardTemplate);
    setCardImage(card, name, link);
    addListenersOnCardButtons(card);
    card.querySelector('.content__item-title').textContent = name;

    return card;
}

function getCardFromTemplate(template) {
    const card = template.cloneNode(true);
    card.id = cardList.children.length + 1;

    return card;
}

function setCardImage(card, name, link) {
    const image = card.querySelector('.content__item-image');
    image.addEventListener('click', () => openPopup(createPopupImage(image, name)));
    image.src = link;
    image.alt = name;
}

function addListenersOnCardButtons(card) {
    const removeButton = card.querySelector('.content__remove-button');
    const likeButton = card.querySelector('.content__like-button');
    likeButton.addEventListener('click', () => like(likeButton));
    removeButton.addEventListener('click', () => removeCard(card));
}

function addCard(card) {
    cardList.prepend(card);
}

function removeCard(card) {
    card.classList.add('content__list-item_remove');
    setTimeout(() => card.remove(), 200);
}

function renderSomeOneCard(evt) {
    evt.preventDefault();
    const popup = page.querySelector('#add-content-popup');
    const popupEditForm = popup.querySelector('.popup__edit-form');
    const button = popupEditForm.querySelector('.popup__save-button');
    const name = popupEditForm.elements.input1;
    const link = popupEditForm.elements.input1;
    addCard(createCard(name.value, link.value));
    closePopup(evt, popup);
    clearInputRows(popupEditForm);
    toggleButtonState(Array.from(popupEditForm.elements), button)
}

function like(likeItem) {
    likeItem.classList.toggle('content_liked');
}

function createPopupImage(image, title) {
    const popup = page.querySelector('#popup-image');
    const popupImage = popup.querySelector('.popup__image');
    popup.querySelector('.popup__title-image').textContent = title;
    popupImage.src = image.src;

    return popup;
}

function addPopupIfNecessary(evt) {
    if (
        evt.target.classList.contains('profile__setting')
        && !page.querySelector('#setting-popup')
    ) {
        return createProfileSettingPopup(evt);
    } else if (
        evt.target.classList.contains('add-content')
        && !page.querySelector('#add-content-popup')
    ) {
        return createAddContentPopup(evt);
    }
}

function initialCustomCards() {
    initialCards.forEach(e => addCard(createCard(e.name, e.link)));
}

initialCustomCards();

editProfileButton.addEventListener('click', openPopupHandler);
addContentButton.addEventListener('click', openPopupHandler);
popupImage.addEventListener('click', (evt) => closePopup(evt, popupImage));