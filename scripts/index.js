const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__setting');
const profileTitleText = profile.querySelector('.profile__title-text')
const profileSpec = profile.querySelector('.profile__specialisation')
const popup = document.querySelector('.popup')
const popupCloseButton = popup.querySelector('.popup__close')
const popupEditForm = popup.querySelector('.popup__edit-form')
const popupInputTitle = popupEditForm.querySelector('.popup__input_title')
const popupInputSpec = popupEditForm.querySelector('.popup__input_spec')

function openPopup() {
    popup.classList.add('popup_opened');
    popupInputTitle.value = profileTitleText.textContent;
    popupInputSpec.value = profileSpec.textContent;
}

function saveProfileChanges(event) {
    event.preventDefault()
    profileTitleText.textContent = popupInputTitle.value;
    profileSpec.textContent = popupInputSpec.value;
    closePopup()
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup)
popupEditForm.addEventListener('submit', saveProfileChanges)