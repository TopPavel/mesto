const PROFILE = document.querySelector('.profile');
const EDIT_PROFILE_BUTTON = PROFILE.querySelector('.profile__setting');
const PROFILE_TITLE_TEXT = PROFILE.querySelector('.profile__title-text')
const PROFILE__SPEC = PROFILE.querySelector('.profile__specialisation')
const POPUP = document.querySelector('.popup')
const POPUP_CLOSE_BUTTON = POPUP.querySelector('.popup__close')
const POPUP_SAVE_BUTTON = POPUP.querySelector('.popup__save-button')
const POPUP_EDIT_FORM = POPUP.querySelector('.popup__edit-form')
const POPUP_INPUT_TITLE = POPUP_EDIT_FORM.querySelector('.popup__input_title')
const POPUP_INPUT_SPEC = POPUP_EDIT_FORM.querySelector('.popup__input_spec')


EDIT_PROFILE_BUTTON.addEventListener('mouseup', openPopup);
POPUP_CLOSE_BUTTON.addEventListener('mousedown', closePopup)
POPUP_EDIT_FORM.addEventListener('submit', saveProfileChanges)

function openPopup() {
    POPUP.classList.add('popup_opened');
    POPUP_INPUT_TITLE.value = PROFILE_TITLE_TEXT.textContent;
    POPUP_INPUT_SPEC.value = PROFILE__SPEC.textContent;
}

function saveProfileChanges(event) {
    event.preventDefault()
    PROFILE_TITLE_TEXT.textContent = POPUP_INPUT_TITLE.value;
    PROFILE__SPEC.textContent = POPUP_INPUT_SPEC.value;
    closePopup()
}

function closePopup() {
    POPUP.classList.remove('popup_opened');
}


console.log(EDIT_PROFILE_BUTTON)