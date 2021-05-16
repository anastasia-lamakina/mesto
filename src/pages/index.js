import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";

const profileEditButton = document.querySelector(".profile__edit-button");
const newPictureButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupEditForm = popupEdit.querySelector("[name=profile-form]");
const popupPictureForm = document.querySelector("[name=picture-form]");

const initialCards = [
  {
    name: "Borat",
    link: "https://pbs.twimg.com/profile_images/1979623485/borat_400x400.jpg",
  },
  {
    name: "Kombat wombat",
    link: "https://pbs.twimg.com/profile_images/753504723878154240/7Rq7PEho_400x400.jpg",
  },
  {
    name: "Batat",
    link: "https://image.dnevnik.hr/media/images/920x695/Mar2019/61657849.jpg",
  },
  {
    name: "Potat",
    link: "https://memeguy.com/photos/images/i-photoshopped-a-potato-426452.jpg",
  },
  {
    name: "Banan",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/1024px-Bananas_white_background_DS.jpg",
  },
  {
    name: "Plantan",
    link: "https://media.istockphoto.com/photos/plantain-or-green-banana-picture-id669719936",
  },
];

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
  ".destinations__list"
);

cardsSection.renderItems();

const userProfile = new UserInfo({
  nameSelector: ".profile__name",
  occupationSelector: ".profile__subtitle",
});

const picturePopup = new PopupWithImage(".popup_picture");

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
  ".popup_new"
);

const popupEditProfile = new PopupWithForm(
  {
    onSubmit: ({ "profile-name": name, "profile-occupation": occupation }) => {
      userProfile.setUserData({ name, occupation });
    },
  },
  ".popup_edit"
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
