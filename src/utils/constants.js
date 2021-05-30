export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAvatar = document.querySelector(".profile__picture");
export const profileAvatarEditIcon = document.querySelector(
  ".profile__picture-edit-icon"
);
export const newPictureButton = document.querySelector(".profile__add-button");
export const popupEdit = document.querySelector(".popup_edit");
export const popupEditForm = popupEdit.querySelector("[name=profile-form]");
export const popupPictureForm = document.querySelector("[name=picture-form]");
export const avatarEditForm = document.querySelector(
  "[name=profile-avatar-form]"
);

export const Selectors = {
  destinationsList: ".destinations__list",
  profileName: ".profile__name",
  profileSubtitle: ".profile__subtitle",
  popupPicture: ".popup_picture",
  popupNew: ".popup_new",
  popupEdit: ".popup_edit",
  popupEditAvatar: ".popup_avatar",
  popupConfirm: ".popup_confirm",
  popupFieldset: ".popup__fieldset",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  popupInputError: ".popup__input_error",
  popupSpanError: ".popup__span_error",
  avatarSelector: ".profile__picture",
};

export const API_KEY = "86d254e6-e813-4798-a0b1-34874f11e3e8";
export const API_GROUP_IDENTIFIER = "cohort-24";
export const API_BASE_PATH = `https://mesto.nomoreparties.co/v1/${API_GROUP_IDENTIFIER}`;
