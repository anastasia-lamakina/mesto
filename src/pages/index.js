import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  profileEditButton,
  newPictureButton,
  popupEditForm,
  popupPictureForm,
  initialCards,
  Selectors,
} from "../utils/constants";
import "./index.css";

const createCard = ({ name, link, handleCardClick }) =>
  new Card(
    { name, link, handleCardClick },
    "#destination-card__template"
  ).generateCard();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      cardsSection.addItem(
        createCard({
          name,
          link,
          handleCardClick: (values) => {
            picturePopup.open(values);
          },
        })
      );
    },
  },
  Selectors.destinationsList
);

cardsSection.renderItems();

const userProfile = new UserInfo({
  nameSelector: Selectors.profileName,
  occupationSelector: Selectors.profileSubtitle,
});

const picturePopup = new PopupWithImage(Selectors.popupPicture);

const popupNew = new PopupWithForm(
  {
    onSubmit: ({ "picture-name": name, "picture-url": link }) =>
      cardsSection.prependItem(
        createCard({
          name,
          link,
          handleCardClick: (values) => {
            picturePopup.open(values);
          },
        })
      ),
  },
  Selectors.popupNew
);

const popupEditProfile = new PopupWithForm(
  {
    onSubmit: ({ "profile-name": name, "profile-occupation": occupation }) => {
      userProfile.setUserData({ name, occupation });
    },
  },
  Selectors.popupEdit
);

picturePopup.setEventListeners();
popupNew.setEventListeners();
popupEditProfile.setEventListeners();

newPictureButton.addEventListener("click", () => popupNew.open());
profileEditButton.addEventListener("click", () => {
  const profile = userProfile.getUserData();
  popupEditProfile.open({
    "profile-name": profile.name,
    "profile-occupation": profile.occupation,
  });
});

const validatorSettings = {
  fieldsetSelector: Selectors.popupFieldset,
  inputSelector: Selectors.popupInput,
  submitButtonSelector: Selectors.popupButton,
  inputErrorClass: Selectors.popupInputError,
  spanErrorClass: Selectors.popupSpanError,
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
