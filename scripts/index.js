import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Borat",
    link: "https://pbs.twimg.com/profile_images/1979623485/borat_400x400.jpg",
  },
  {
    name: "Astronaut",
    link:
      "https://media.istockphoto.com/photos/astronaut-deep-space-image-science-fiction-fantasy-in-high-resolution-picture-id1153308175?k=6&m=1153308175&s=612x612&w=0&h=_DHjK_PgfSmezWxaJJZ8IRdOG59f_j-mKiC0vJxfdSs=",
  },
  {
    name: "Kombat wombat",
    link:
      "https://pbs.twimg.com/profile_images/753504723878154240/7Rq7PEho_400x400.jpg",
  },
  {
    name: "Wombat",
    link:
      "https://y8t9r4g5.stackpathcdn.com/wp-content/uploads/2019/01/Wombats-Facts.jpg",
  },
  {
    name: "Batat",
    link: "https://image.dnevnik.hr/media/images/920x695/Mar2019/61657849.jpg",
  },
  {
    name: "Potat",
    link:
      "https://memeguy.com/photos/images/i-photoshopped-a-potato-426452.jpg",
  },
];

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const destinationCardList = document.querySelector(".destinations__list");
const newPictureButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupEditName = popupEdit.querySelector("[name=profile-name]");
const popupEditOccupation = popupEdit.querySelector(
  "[name=profile-occupation]"
);
const popupPicture = document.querySelector(".popup_picture");
const popupPictureImage = popupPicture.querySelector(".popup__image");
const popupPictureSubtitle = popupPicture.querySelector(".popup__subtitle");

const popupNew = document.querySelector(".popup_new");
const popupNewName = popupNew.querySelector("[name=picture-name]");
const popupNewPicture = popupNew.querySelector("[name=picture-url]");
const popupPictureEdit = popupEdit.querySelector(".popup__close");
const popupEditForm = popupEdit.querySelector("[name=profile-form]");
const popupEditFormNameInput = popupEdit.querySelector("[name=profile-name]");
const popupEditFormOccupationInput = popupEdit.querySelector(
  "[name=profile-occupation]"
);
const popupNewClose = popupNew.querySelector(".popup__close");
const popupPictureForm = popupNew.querySelector("[name=picture-form]");

let openedPopup;

const handleCloseClick = () => {
  closePopup(openedPopup);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closePopup(openedPopup);
  }
};

const openPopup = (popup) => {
  openedPopup = popup;
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleCloseClick);
  document.addEventListener("keydown", handleKeydown);
};

const closePopup = (popup) => {
  openedPopup = null;
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleCloseClick);
  document.removeEventListener("keydown", handleKeydown);
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
    createCard(popupNewName.value, popupNewPicture.value)
  );
  closePopup(popupNew);
};

const handleNewPopupOpen = () => {
  popupPictureForm.reset();
  openPopup(popupNew);
};

export function handlePreviewPictureOpen(name, link) {
  popupPictureSubtitle.textContent = name;
  popupPictureImage.src = link;
  popupPictureImage.alt = name;
  openPopup(popupPicture);
}

const createCard = (name, link) =>
  new Card(name, link, "#destination-card__template").generateCard();

profileEditButton.addEventListener("click", handleEditPopupOpen);
newPictureButton.addEventListener("click", handleNewPopupOpen);
popupPictureEdit.addEventListener("click", () => closePopup(popupEdit));
popupNewClose.addEventListener("click", () => closePopup(popupNew));
popupEditForm.addEventListener("submit", handleEditPopupSubmit);
popupEditForm.addEventListener("click", (event) => event.stopPropagation());
popupPictureForm.addEventListener("submit", handleNewPopupSubmit);
popupPictureForm.addEventListener("click", (event) => event.stopPropagation());
popupPictureImage.addEventListener("click", (event) => event.stopPropagation());

initialCards.forEach(({ name, link }) => {
  destinationCardList.append(createCard(name, link));
});

const validatorSettings = {
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_error",
  spanErrorClass: "popup__span_error",
};

const popupEditFormValidator = new FormValidator(
  validatorSettings,
  popupEditForm
);
const popupPictureFormValidator = new FormValidator(
  validatorSettings,
  popupPictureForm
);

popupEditFormValidator.enableValidation();
popupPictureFormValidator.enableValidation();
