export class Card {
  constructor(
    {
      cardObject: { name, link, likes, _id },
      handleCardClick,
      handleLikeClick,
      isOwner,
      isLikedByCurrentUser,
      handleCardDelete,
    },
    cardSelector
  ) {
    this._cardId = _id;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClickCallback = handleLikeClick;
    this._cardSelector = cardSelector;
    this._isOwner = isOwner;
    this._likes = likes;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".destination-card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementPicture = this._element.querySelector(
      ".destination-card__picture"
    );
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._name;

    this._element.querySelector(".destination-card__text").textContent =
      this._name;

    if (!this._isOwner) {
      this._element.querySelector(
        ".destination-card__delete-button"
      ).style.display = "none";
    }

    if (this._likes) {
      this._updateLikeCount();
    }

    this._updateLikeButtonStatus();

    this._setEventListeners();
    return this._element;
  }

  _updateLikeButtonStatus() {
    const likeButton = this._element.querySelector(
      ".destination-card__like-button"
    );
    if (this.isLikedByCurrentUser) {
      likeButton.classList.add("destination-card__like-button_active");
    } else {
      likeButton.classList.remove("destination-card__like-button_active");
    }
  }

  _updateLikeCount() {
    this._element.querySelector(".destination-card__like-count").textContent =
      this._likes.length;
  }

  _setLikes(likes, isLiked) {
    this._likes = likes;
    this.isLikedByCurrentUser = isLiked;
    this._updateLikeCount();
    this._updateLikeButtonStatus();
  }

  _handleLikeClick = (event) => {
    event.stopPropagation();
    this._handleLikeClickCallback(this._cardId, this._setLikes.bind(this));
  };

  _setEventListeners() {
    this._element
      .querySelector(".destination-card__like-button")
      .addEventListener("click", this._handleLikeClick);

    this._element
      .querySelector(".destination-card__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this._handleCardDelete(this._cardId, () => {
          event.target.closest(".destination-card").remove();
          this._element = null;
        });
      });

    this._elementPicture.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }
}
