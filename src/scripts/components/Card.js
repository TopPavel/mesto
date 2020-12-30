export default class Card {
    constructor(data, template, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    createCard() {
        const card = this._getCardFromTemplate();
        this._setCardImage(card, this._name, this._link);
        this._setEventListeners(card);
        card.querySelector('.content__item-title').textContent = this._name;

        return card;
    }

     _getCardFromTemplate() {
         return document
             .querySelector(this._template)
             .content
             .querySelector(".content__list-item")
             .cloneNode(true);
     }

    _setCardImage(card, name, link) {
        const image = card.querySelector('.content__item-image');
        image.src = link;
        image.alt = name;
    }

    _setEventListeners(card) {
        const removeButton = card.querySelector('.content__remove-button');
        const likeButton = card.querySelector('.content__like-button');
        const image = card.querySelector('.content__item-image');
        likeButton.addEventListener('click', () => this._like(likeButton));
        removeButton.addEventListener('click', () => this._removeCard(card));
        image.addEventListener('click', this._handleCardClick());
    }


    _like(likeItem) {
        likeItem.classList.toggle('content_liked');
    }

    _removeCard(card) {
        card.classList.add('content__list-item_remove');
        setTimeout(() => card.remove(), 200);
    }
}