import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  profileEditButton,
  newPictureButton,
  popupEditForm,
  popupPictureForm,
  profileAvatar,
  Selectors,
  API_KEY,
  API_BASE_PATH,
  profileAvatarEditIcon,
  avatarEditForm,
} from "../utils/constants";
import "./index.css";

const picturePopup = new PopupWithImage(Selectors.popupPicture);

const popupNew = new PopupWithForm(
  {
    onSubmit: function ({ "picture-name": name, "picture-url": link }) {
      this.setIsLoading();
      api
        .postNewCard({ name, link })
        .then((res) => res.json())
        .then((data) => {
          this.close();
          cardsSection.prependItem(createCard(data));
          this.clearIsLoading();
        });
    },
  },
  Selectors.popupNew
);

const popupEditProfile = new PopupWithForm(
  {
    onSubmit: function ({ "profile-name": name, "profile-about": about }) {
      this.setIsLoading();
      api
        .patchUserInformation({ name, about })
        .then((res) => res.json())
        .then((data) => {
          this.close();
          this.clearIsLoading();
          userProfile.setUserData(data);
        });
    },
  },
  Selectors.popupEdit
);

const popupEditAvatar = new PopupWithForm(
  {
    onSubmit: function ({ "profile-avatar": avatar }) {
      this.setIsLoading();
      api
        .patchUserAvatar(avatar)
        .then((res) => res.json())
        .then((data) => {
          this.close();
          this.clearIsLoading();
          userProfile.setUserData(data);
        });
    },
  },
  Selectors.popupEditAvatar
);

const popupConfirm = new PopupConfirm(Selectors.popupConfirm);

picturePopup.setEventListeners();
popupNew.setEventListeners();
popupConfirm.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();

newPictureButton.addEventListener("click", () => popupNew.open());

profileEditButton.addEventListener("click", () => {
  const profile = userProfile.getUserData();
  popupEditProfile.open({
    "profile-name": profile.name,
    "profile-about": profile.about,
  });
});

profileAvatar.addEventListener("click", () => {
  const profile = userProfile.getUserData();
  popupEditAvatar.open({
    "profile-avatar": profile.avatar,
  });
});

profileAvatar.onmouseenter = () => {
  profileAvatarEditIcon.style.visibility = "visible";
};

profileAvatar.onmouseleave = () => {
  profileAvatarEditIcon.style.visibility = "hidden";
};

const cardsSection = new Section(
  {
    renderer: (data) => {
      cardsSection.addItem(createCard(data));
    },
  },
  Selectors.destinationsList
);

const userProfile = new UserInfo({
  nameSelector: Selectors.profileName,
  aboutSelector: Selectors.profileSubtitle,
  avatarSelector: Selectors.avatarSelector,
});

const createCard = ({ owner, likes, ...rest }) =>
  new Card(
    {
      cardObject: {
        likes,
        ...rest,
      },
      isOwner: owner._id == userProfile.getUserData()._id,
      isLikedByCurrentUser: Boolean(
        likes.find(({ _id: likeId }) => likeId == userProfile.getUserData()._id)
      ),
      handleLikeClick: function (cardId, updateLikesCallback) {
        if (this._isLikedByCurrentUser) {
          api
            .deleteLikeClick(cardId)
            .then((res) => res.json())
            .then(({ likes }) => updateLikesCallback(likes));
          this._isLikedByCurrentUser = false;
        } else {
          api
            .putLikeClick(cardId)
            .then((res) => res.json())
            .then(({ likes }) => updateLikesCallback(likes));
          this._isLikedByCurrentUser = true;
        }
      },
      handleCardClick: (values) => {
        picturePopup.open(values);
      },
      handleCardDelete: function (cardId, confirmDeleteCallback) {
        popupConfirm
          .open()
          .then(() => {
            api
              .deleteCard(cardId)
              .then((res) => res.json())
              .then(() => {
                confirmDeleteCallback();
              })
              .catch(() => {
                console.log("ошибка удаления карточки");
              });
          })
          .catch(() => {});
      },
    },
    "#destination-card__template"
  ).generateCard();

const api = new Api({
  apiKey: API_KEY,
  basePath: API_BASE_PATH,
});

/** Load initial cards */
const loadUserProfileCallback = () => {
  api
    .getInitialCards()
    .then((res) => res.json())
    .then((data) => {
      cardsSection.renderItems(data);
    })
    .catch((err) => console.log("Ошибка загрузки карт", err));
};

/** Load user profile info */
api
  .getUserProfile()
  .then((res) => res.json())
  .then(({ name, about, avatar, _id }) => {
    userProfile.setUserData({
      name,
      about,
      avatar,
      _id,
    });
    loadUserProfileCallback();
  })
  .catch(() => console.log("Ошибка загрузки профиля пользователя"));

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

const avatarFormValidator = new FormValidator(
  validatorSettings,
  avatarEditForm
);

popupEditFormValidator.enableValidation();
popupPictureFormValidator.enableValidation();
avatarFormValidator.enableValidation();
