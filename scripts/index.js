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
const popupEditFormNameInput = popupEdit.querySelector("[name=profile-name]");
const popupEditFormOccupationInput = popupEdit.querySelector(
  "[name=profile-occupation]"
);
const popupNewClose = popupNew.querySelector(".popup__close");
const popupPictureForm = popupNew.querySelector("[name=picture-form]");

const createCard = (destination) => {
  const destinationCard = destinationCardTemplate.cloneNode(true);

  const destinationCardPicture = destinationCard.querySelector(
    ".destination-card__picture"
  );
  destinationCardPicture.src = destination.link;
  destinationCardPicture.alt = destination.name;
  destinationCardPicture.addEventListener("click", () =>
    handlePicturePopupOpen(destination)
  );
  destinationCard.querySelector(".destination-card__text").textContent =
    destination.name;
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

const handleCloseClick = () => {
  closePopup(popup);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closePopup(popup);
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleCloseClick);
  document.addEventListener("keydown", handleKeydown);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleCloseClick);
  document.removeEventListener("keydown", handleKeydown);
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
  profileName.textContent = popupEditFormNameInput.value;
  profileOccupation.textContent = popupEditFormOccupationInput.value;
  closePopup(popupEdit);
};

const handleNewPopupSubmit = (event) => {
  event.preventDefault();
  destinationCardList.prepend(
    createCard({ name: popupNewName.value, link: popupNewPicture.value })
  );
  closePopup(popupNew);
};

const handleNewPopupOpen = () => {
  popupPictureForm.reset();
  openPopup(popupNew);
};

profileEditButton.addEventListener("click", handleEditPopupOpen);
newPictureButton.addEventListener("click", handleNewPopupOpen);
popupPictureClose.addEventListener("click", () => closePopup(popupPicture));
popupPictureEdit.addEventListener("click", () => closePopup(popupEdit));
popupNewClose.addEventListener("click", () => closePopup(popupNew));
popupEditForm.addEventListener("submit", handleEditPopupSubmit);
popupEditForm.addEventListener("click", (event) => event.stopPropagation());
popupPictureForm.addEventListener("submit", handleNewPopupSubmit);
popupPictureForm.addEventListener("click", (event) => event.stopPropagation());

initialCards.forEach((destination) => {
  destinationCardList.append(createCard(destination));
});
