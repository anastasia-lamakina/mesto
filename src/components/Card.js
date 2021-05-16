export class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
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

    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick = (event) => {
    event.stopPropagation();
    event.target.classList.toggle("destination-card__like-button_active");
  };

  _setEventListeners() {
    this._element
      .querySelector(".destination-card__like-button")
      .addEventListener("click", this._handleLikeClick);

    this._element
      .querySelector(".destination-card__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        event.target.closest(".destination-card").remove();
      });

    this._element.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }
}
