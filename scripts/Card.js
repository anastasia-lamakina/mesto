const popupPicture = document.querySelector(".popup_picture");
const popupPictureSubtitle = popupPicture.querySelector(".popup__subtitle");
const popupPictureImage = popupPicture.querySelector(".popup__image");

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
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

    this._element.querySelector(
      ".destination-card__text"
    ).textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _handleCloseClick = (popup) => {
    this._closePopup(popup);
  };

  _handleKeydown = (event, popup) => {
    if (event.key === "Escape") {
      this._closePopup(popup);
    }
  };

  _openPopup(popup) {
    popup.classList.add("popup_opened");

    popup.addEventListener("click", () => this._handleCloseClick(popup));
    document.addEventListener("keydown", (event) =>
      this._handleKeydown(event, popup)
    );
  }

  _closePopup(popup) {
    popup.classList.remove("popup_opened");

    popup.removeEventListener("click", this._handleCloseClick);
    document.removeEventListener("keydown", this._handleKeydown);
  }

  _handleLikeClick = (event) => {
    event.stopPropagation();
    event.target.classList.toggle("destination-card__like-button_active");
  };

  _handlePicturePopupOpen = () => {
    popupPictureSubtitle.textContent = this._name;
    popupPictureImage.src = this._link;
    popupPictureImage.alt = this._name;

    this._openPopup(popupPicture);
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

    this._element.addEventListener("click", () => {
      this._handlePicturePopupOpen();
    });
  }
}
