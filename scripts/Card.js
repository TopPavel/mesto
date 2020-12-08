import {ImagePopup} from './Popup.js'

export default class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template
    }

    addCard() {
        document.querySelector('.content__list').prepend(this._createCard());
    }

     _getCardFromTemplate() {
        const card = document
            .querySelector(this._template)
            .content
            .querySelector(".content__list-item")
            .cloneNode(true);
        card.id = `card-${document.querySelector('.content__list').children.length + 1}`;
        return card
    }

    _createCard() {
        const card = this._getCardFromTemplate();
        this._setCardImage(card, this._name, this._link);
        this._addListenersOnCardButtons(card);
        card.querySelector('.content__item-title').textContent = this._name;

        return card;
    }

    _setCardImage(card, name, link) {
        const image = card.querySelector('.content__item-image');
        image.addEventListener('click', () => new ImagePopup(image, name).openPopup());
        image.src = link;
        image.alt = name;
    }

    _addListenersOnCardButtons(card) {
        const removeButton = card.querySelector('.content__remove-button');
        const likeButton = card.querySelector('.content__like-button');
        likeButton.addEventListener('click', () => this._like(likeButton));
        removeButton.addEventListener('click', () => this._removeCard(card));
    }

    _like(likeItem) {
        likeItem.classList.toggle('content_liked');
    }

    _removeCard(card) {
        card.classList.add('content__list-item_remove');
        setTimeout(() => card.remove(), 200);
    }
}