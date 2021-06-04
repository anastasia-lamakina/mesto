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
  validatorSettings,
} from "../utils/constants";
import "./index.css";

const picturePopup = new PopupWithImage(Selectors.popupPicture);

const popupNew = new PopupWithForm(
  {
    onSubmit: ({ "picture-name": name, "picture-url": link }) => {
      popupNew.setIsLoading();
      api
        .postNewCard({ name, link })
        .then((data) => {
          popupNew.close();
          popupNew.clearIsLoading();
          cardsSection.prependItem(createCard(data));
        })
        .catch((err) => console.log("Ошибка добавления карточки", err));
    },
  },
  Selectors.popupNew
);

const popupEditProfile = new PopupWithForm(
  {
    onSubmit: ({ "profile-name": name, "profile-about": about }) => {
      popupEditProfile.setIsLoading();
      api
        .patchUserInformation({ name, about })
        .then((data) => {
          popupEditProfile.close();
          popupEditProfile.clearIsLoading();
          userProfile.setUserData(data);
        })
        .catch((err) =>
          console.log("Ошибка обновления данных пользователя", err)
        );
    },
  },
  Selectors.popupEdit
);

const popupEditAvatar = new PopupWithForm(
  {
    onSubmit: ({ "profile-avatar": avatar }) => {
      popupEditAvatar.setIsLoading();
      api
        .patchUserAvatar(avatar)
        .then((data) => {
          popupEditAvatar.close();
          popupEditAvatar.clearIsLoading();
          userProfile.setUserData(data);
        })
        .catch((err) => console.log("Ошибка загрузки нового аватара", err));
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
  popupEditAvatar.open();
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
        if (this.isLikedByCurrentUser) {
          api
            .deleteLikeClick(cardId)
            .then(({ likes }) => {
              updateLikesCallback(likes, false);
            })
            .catch((err) =>
              console.log("Ошибка удаления лайка с карточки", err)
            );
        } else {
          api
            .putLikeClick(cardId)
            .then(({ likes }) => {
              updateLikesCallback(likes, true);
            })
            .catch((err) =>
              console.log("Ошибка добавления лайка карточке", err)
            );
        }
      },
      handleCardClick: (values) => {
        picturePopup.open(values);
      },
      handleCardDelete: function (cardId, confirmDeleteCallback) {
        popupConfirm.open().then(() => {
          popupConfirm.setIsLoading();
          api
            .deleteCard(cardId)
            .then(() => {
              popupConfirm.clearIsLoading();
              popupConfirm.close();
              confirmDeleteCallback();
            })
            .catch((err) => {
              console.log("ошибка удаления карточки", err);
            });
        });
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
    .then((data) => {
      cardsSection.renderItems(data);
    })
    .catch((err) => console.log("Ошибка загрузки карт", err));
};

/** Load user profile info */
api
  .getUserProfile()
  .then(({ name, about, avatar, _id }) => {
    userProfile.setUserData({
      name,
      about,
      avatar,
      _id,
    });
    loadUserProfileCallback();
  })
  .catch((err) => console.log("Ошибка загрузки профиля пользователя", err));

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
