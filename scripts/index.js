const profileEditPopup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupNameInput = document.querySelector("[name='profile-name']");
const popupOccupationInput = document.querySelector(
  "[name='profile-occupation']"
);
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupForm = document.querySelector(".popup__container");
const destinationCardList = document.querySelector(".destinations__list");
const destinationCardTemplate = document.querySelector(
  "#destination-card__template"
).content;
const likeButtons = document.querySelectorAll(".destination-card__like-button");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const renderDestinationCards = () => {
  destinationCardList.textContent = "";

  initialCards.forEach((destination) => {
    const destinationCard = destinationCardTemplate
      .querySelector(".destination-card")
      .cloneNode(true);

    destinationCard.querySelector(".destination-card__text").textContent =
      destination.name;
    destinationCard.querySelector(".destination-card__picture").src =
      destination.link;
    destinationCard
      .querySelector(".destination-card__like-button")
      .addEventListener("click", handleLikeClick);

    destinationCardList.append(destinationCard);
  });
};

const submitValues = (event) => {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileOccupation.textContent = popupOccupationInput.value;
  closePopup(profileEditPopup);
};

const handleProfileEdit = () => {
  popupNameInput.value = profileName.innerText;
  popupOccupationInput.value = profileOccupation.innerText;

  openPopup(profileEditPopup);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const handleLikeClick = (event) => {
  event.target.classList.toggle("destination-card__like-button_active");
};

profileEditButton.addEventListener("click", handleProfileEdit);

popupForm.addEventListener("submit", submitValues);

popupClose.addEventListener("click", () => closePopup(profileEditPopup));

renderDestinationCards();
