import initialCards from "./cards.js";

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const destinationCardList = document.querySelector(".destinations__list");
const destinationCardTemplate = document
  .querySelector("#destination-card__template")
  .content.querySelector(".destination-card");
const newPictureButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupEditName = popupEdit.querySelector("[name=profile-name]");
const popupEditOccupation = popupEdit.querySelector(
  "[name=profile-occupation]"
);
const popupPicture = document.querySelector(".popup_picture");
const popupPictureSubtitle = popupPicture.querySelector(".popup__subtitle");
const popupPictureImage = popupPicture.querySelector(".popup__image");
const popupNew = document.querySelector(".popup_new");
const popupNewName = popupNew.querySelector("[name=picture-name]");
const popupNewPicture = popupNew.querySelector("[name=picture-url]");
const popupPictureClose = popupPicture.querySelector(".popup__close");
const popupPictureEdit = popupEdit.querySelector(".popup__close");
const popupEditForm = popupEdit.querySelector("[name=profile-form]");
const popupNewClose = popupNew.querySelector(".popup__close");
const popupPictureForm = popupNew.querySelector("[name=picture-form]");

const createCard = (destination) => {
  const destinationCard = destinationCardTemplate.cloneNode(true);

  destinationCard.querySelector(".destination-card__text").textContent =
    destination.name;
  destinationCard.querySelector(".destination-card__picture").src =
    destination.link;
  destinationCard.querySelector(".destination-card__picture").alt =
    destination.name;
  destinationCard
    .querySelector(".destination-card__picture")
    .addEventListener("click", () => handlePicturePopupOpen(destination));
  destinationCard
    .querySelector(".destination-card__like-button")
    .addEventListener("click", handleLikeClick);
  destinationCard
    .querySelector(".destination-card__delete-button")
    .addEventListener("click", (event) =>
      event.target.closest(".destination-card").remove()
    );

  return destinationCard;
};

const mapInputToKeyValue = (target) => {
  const values = [...target.querySelectorAll(".popup__input")].map((input) => ({
    [input.name]: input.value,
  }));
  return Object.assign({}, ...values);
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

const handlePicturePopupOpen = ({ name, link }) => {
  popupPictureSubtitle.textContent = name;
  popupPictureImage.src = link;
  popupPictureImage.alt = name;

  openPopup(popupPicture);
};

const handleEditPopupOpen = () => {
  popupEditName.value = profileName.innerText;
  popupEditOccupation.value = profileOccupation.innerText;

  openPopup(popupEdit);
};

const handleEditPopupSubmit = (event) => {
  event.preventDefault();
  const values = mapInputToKeyValue(event.target);
  profileName.textContent = values["profile-name"];
  profileOccupation.textContent = values["profile-occupation"];
  closePopup(popupEdit);
};

const handleNewPopupSubmit = (event) => {
  event.preventDefault();
  const values = mapInputToKeyValue(event.target);
  destinationCardList.prepend(
    createCard({ name: values["picture-name"], link: values["picture-url"] })
  );
  closePopup(popupNew);
};

const handleNewPopupOpen = () => {
  popupNewName.value = "";
  popupNewPicture.value = "";
  openPopup(popupNew);
};

profileEditButton.addEventListener("click", handleEditPopupOpen);
newPictureButton.addEventListener("click", handleNewPopupOpen);
popupPictureClose.addEventListener("click", () => closePopup(popupPicture));
popupPictureEdit.addEventListener("click", () => closePopup(popupEdit));
popupNewClose.addEventListener("click", () => closePopup(popupNew));
popupEditForm.addEventListener("submit", handleEditPopupSubmit);
popupPictureForm.addEventListener("submit", handleNewPopupSubmit);

initialCards.forEach((destination) => {
  destinationCardList.append(createCard(destination));
});
