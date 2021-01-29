let popup = document.querySelector("[class='popup']");
let popupContainer = document.querySelector("[class='popup__container']");
let popupNameInput = document.querySelector("[class='popup__name-input']");
let popupOccupationInput = document.querySelector(
  "[class='popup__occupation-input']"
);
let popupSubmit = document.querySelector("[class='popup__button']");
let profileName = document.querySelector("[class='profile__name']");
let profileOccupation = document.querySelector("[class='profile__subtitle']");

let closePopup = function () {
  popup.className = "popup";
};

let openPopup = function () {
  popupNameInput.value = profileName.innerText;
  popupOccupationInput.value = profileOccupation.innerText;

  popup.className = "popup popup_opened";
};

let submitValues = function () {
  let name = popupNameInput.value;
  let occupation = popupOccupationInput.value;

  if (name) {
    profileName.innerText = name;
  }

  if (occupation) {
    profileOccupation.innerText = occupation;
  }

  closePopup();
};

popup.addEventListener("click", function () {
  closePopup();
});

popupContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

popupSubmit.addEventListener("click", function () {
  submitValues();
});

popupContainer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitValues();
  }
});
