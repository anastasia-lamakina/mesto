let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close");
let popupNameInput = document.querySelector("[name='profile-name']");
let popupOccupationInput = document.querySelector(
  "[name='profile-occupation']"
);
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__subtitle");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupForm = document.querySelector(".popup__container");

let submitValues = function (event) {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileOccupation.textContent = popupOccupationInput.value;
  closePopup();
};

let closePopup = function () {
  popup.classList.remove("popup_opened");
};

let openPopup = function () {
  popupNameInput.value = profileName.innerText;
  popupOccupationInput.value = profileOccupation.innerText;

  popup.classList.add("popup_opened");
};

profileEditButton.addEventListener("click", openPopup);

popupForm.addEventListener("submit", submitValues);

popupClose.addEventListener("click", closePopup);
