let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close");
let popupNameInput = document.querySelector("[name='profile-name']");
let popupOccupationInput = document.querySelector(
  "[name='profile-occupation']"
);
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__subtitle");
let profileEditButton = document.querySelector(".profile__edit-button");

let urlParameters = new URLSearchParams(window.location.search);
let profileNameParameter = urlParameters.get("profile-name");
let profileOccupationParameter = urlParameters.get("profile-occupation");

if (profileNameParameter) {
  profileName.textContent = profileNameParameter;
}

if (profileOccupationParameter) {
  profileOccupation.textContent = profileOccupationParameter;
}

let closePopup = function () {
  popup.classList.remove("popup_opened");
};

let openPopup = function () {
  popupNameInput.value = profileName.innerText;
  popupOccupationInput.value = profileOccupation.innerText;

  popup.classList.add("popup_opened");
};

profileEditButton.addEventListener("click", openPopup);

popupClose.addEventListener("click", closePopup);
