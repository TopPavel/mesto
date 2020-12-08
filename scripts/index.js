import Card from './Card.js'
import {initialCards} from './Data.js'
import {SettingPopup, ContentPopup} from "./Popup.js";

const settingPopup = new SettingPopup('#popup-template','.popup')
const contentPopup = new ContentPopup('#popup-template','.popup')
const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__setting');
const addContentButton = profile.querySelector('.add-content');

function openPopupHandler(evt) {
    if (evt.target.classList.contains('profile__setting')) {
        settingPopup.openPopup()
    } else if (evt.target.classList.contains('add-content')) {
        contentPopup.openPopup()
    }
}

(function initialCustomCards() {
    initialCards.forEach(e => {
        const card = new Card(e.name, e.link, '#card-template')
        card.addCard()
    });
})();

editProfileButton.addEventListener('click', openPopupHandler);
addContentButton.addEventListener('click', openPopupHandler);