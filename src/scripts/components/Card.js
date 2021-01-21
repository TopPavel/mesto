export default class Card {
    constructor(data, template, myId, handleCardClick, handleDeleteClick, handleLikeClick, handleUnlikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ovnerId = data.owner._id;
        this._id = data._id;
        this._myId = myId;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick.bind(this);
        this._handleLikeClick = handleLikeClick.bind(this);
        this._handleUnlikeClick = handleUnlikeClick.bind(this);
        this._element = this.createCard()
    }

    get element() {
        return this._element;
    }

    createCard() {
        const card = this._getCardFromTemplate();
        card.id = this._id;
        this._setCardLikes(card)
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

    _setCardLikes(card) {
        card.querySelector('.content__like-count').textContent = this._likes.length;
        if (this._likes.some((i) => i._id === this._myId)) {
            card.querySelector('.content__like-button').classList.add('content_liked');
        }
    }

    _setEventListeners(card) {
        const removeButton = card.querySelector('.content__remove-button');
        const likeButton = card.querySelector('.content__like-button');
        const image = card.querySelector('.content__item-image');
        likeButton.addEventListener('click', () => this._like(likeButton, card));
        this._ovnerId === this._myId ?
            removeButton.addEventListener('click', this._handleDeleteClick)
            : removeButton.style.display = 'none';

        image.addEventListener('click', this._handleCardClick());
    }

    _like(likeItem) {
        if (!likeItem.classList.contains('content_liked')) {
            this._handleLikeClick()
        } else {
            this._handleUnlikeClick()
        }
    }
}