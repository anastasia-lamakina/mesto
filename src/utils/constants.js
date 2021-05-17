export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const newPictureButton = document.querySelector(".profile__add-button");
export const popupEdit = document.querySelector(".popup_edit");
export const popupEditForm = popupEdit.querySelector("[name=profile-form]");
export const popupPictureForm = document.querySelector("[name=picture-form]");

export const Selectors = {
  destinationsList: ".destinations__list",
  profileName: ".profile__name",
  profileSubtitle: ".profile__subtitle",
  popupPicture: ".popup_picture",
  popupNew: ".popup_new",
  popupEdit: ".popup_edit",
  popupFieldset: ".popup__fieldset",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  popupInputError: ".popup__input_error",
  popupSpanError: ".popup__span_error",
};

export const initialCards = [
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
