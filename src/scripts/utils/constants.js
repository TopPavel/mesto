export const initialCards = [
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

export const someInputEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
});
export const profilePopupSelector = '.profile-popup';
export const profileFormSelector = '.profile-form';
export const cardPopupSelector = '.card-popup';
export const cardFormSelector = '.card-form';

export const cardTemplateId = '#card-template'

export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    submitButtonDisabledClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const profileForm = document.querySelector('#profile-form');
export const cardForm = document.querySelector('#card-form');
export const profileNameSelector = '.profile__title-text';
export const profileDescSelector = '.profile__specialisation';
export const cardContainerSelector = '.content__list';
