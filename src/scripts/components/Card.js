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
        this._element = this._getCardFromTemplate();
        this._removeButton = this._element.querySelector('.content__remove-button');
        this._likeButton = this._element.querySelector('.content__like-button');
        this._cardImage = this._element.querySelector('.content__item-image');
        this._likeCount = this._element.querySelector('.content__like-count');
        this._title = this._element.querySelector('.content__item-title');
    }

    get element() {
        return this._element;
    }

    get likeCount() {
        return this._likeCount;
    }

    get likeButton() {
        return this._likeButton;
    }

    createCard() {
        this._element.id = this._id;
        this._setCardLikes()
        this._setCardImage(this._name, this._link);
        this._setEventListeners();
        this._title.textContent = this._name;

        return this.element;
    }

    _getCardFromTemplate() {
        return document
            .querySelector(this._template)
            .content
            .querySelector(".content__list-item")
            .cloneNode(true);
    }

    _setCardImage(name, link) {
        this._cardImage.src = link;
        this._cardImage.alt = name;
    }

    _setCardLikes() {
        this._likeCount.textContent = this._likes.length;
        if (this._likes.some((i) => i._id === this._myId)) {
            this._likeButton.classList.add('content_liked');
        }
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._like);
        this._ovnerId === this._myId ?
            this._removeButton.addEventListener('click', this._handleDeleteClick)
            : this._removeButton.style.display = 'none';

        this._cardImage.addEventListener('click', this._handleCardClick());
    }

    _like = () => {
        if (!this._likeButton.classList.contains('content_liked')) {
            this._handleLikeClick()
        } else {
            this._handleUnlikeClick()
        }
    }
}