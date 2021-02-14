const profileEditPopup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupNameInput = document.querySelector("[name='profile-name']");
const popupOccupationInput = document.querySelector(
  "[name='profile-occupation']"
);
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupForm = document.querySelector(".popup__container");
const destinationCardList = document.querySelector(".destinations__list");
const destinationCardTemplate = document.querySelector(
  "#destination-card__template"
).content;
const likeButtons = document.querySelectorAll(".destination-card__like-button");
const popupFormTemplate = document.querySelector("#popup-form__template")
  .content;
const popupPictureTemplate = document.querySelector("#popup-picture__template")
  .content;
const popupEntry = document.querySelector("#popup__entry");
const newPictureButton = document.querySelector(".profile__add-button");

const initialCards = [
  {
    name: "Borat",
    link: "https://pbs.twimg.com/profile_images/1979623485/borat_400x400.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
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

const renderDestinationCards = () => {
  destinationCardList.textContent = "";

  initialCards.forEach((destination, index) => {
    const destinationCard = destinationCardTemplate
      .querySelector(".destination-card")
      .cloneNode(true);

    destinationCard.querySelector(".destination-card__text").textContent =
      destination.name;
    destinationCard.querySelector(".destination-card__picture").src =
      destination.link;
    destinationCard
      .querySelector(".destination-card__picture")
      .addEventListener("click", () =>
        picturePreviewPopup.open(destination.name, destination.link)
      );
    destination.link;
    destinationCard
      .querySelector(".destination-card__like-button")
      .addEventListener("click", handleLikeClick);
    destinationCard
      .querySelector(".destination-card__delete-button")
      .addEventListener("click", () => handleDeleteDestinationClick(index));

    destinationCardList.append(destinationCard);
  });
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const handleLikeClick = (event) => {
  event.target.classList.toggle("destination-card__like-button_active");
};

const handleDeleteDestinationClick = (index) => {
  initialCards.splice(index, 1);
  renderDestinationCards();
};

const createFormPopup = ({ title, submitButtonText, inputs, onFormSubmit }) => {
  const popupForm = popupFormTemplate.querySelector(".popup").cloneNode(true);

  popupForm.querySelector(".popup__title").textContent = title;

  inputs.forEach(({ name, placeholder }) => {
    const inputElement = document.createElement("input");
    inputElement.className = "popup__input";
    inputElement.name = name;
    inputElement.placeholder = placeholder;
    popupForm.querySelector(".popup__container").append(inputElement);
  });

  const submitButton = document.createElement("input");
  submitButton.className = "popup__button";
  submitButton.type = "submit";
  submitButton.value = submitButtonText;

  popupForm.querySelector(".popup__container").append(submitButton);

  popupForm
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(popupForm));

  popupEntry.append(popupForm);

  const handlePopupOpen = (...defaultValues) => {
    if (defaultValues.length) {
      popupForm.querySelectorAll(".popup__input").forEach((input, index) => {
        input.value = defaultValues[index];
      });
    }

    openPopup(popupForm);
  };

  popupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = [
      ...event.target.querySelectorAll(".popup__input"),
    ].map((input) => ({ [input.name]: input.value }));
    onFormSubmit(Object.assign({}, ...values));
    closePopup(popupForm);
  });

  return {
    open: handlePopupOpen,
  };
};

const createPicturePopup = () => {
  const popupPicture = popupPictureTemplate
    .querySelector(".popup")
    .cloneNode(true);

  popupPicture
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(popupPicture));

  popupEntry.append(popupPicture);

  const handlePopupOpen = (name, picture) => {
    popupPicture.querySelector(".popup__subtitle").textContent = name;
    popupPicture.querySelector(".popup__image").src = picture;

    openPopup(popupPicture);
  };

  return {
    open: handlePopupOpen,
  };
};

const editProfilePopup = createFormPopup({
  title: "Редактировать профиль",
  submitButtonText: "Сохранить",
  inputs: [
    {
      name: "profile-name",
      placeholder: "Жак-Ив Кусто",
    },
    {
      name: "profile-occupation",
      placeholder: "Исследователь океана",
    },
  ],
  onFormSubmit: (values) => {
    profileName.textContent = values["profile-name"];
    profileOccupation.textContent = values["profile-occupation"];
  },
});

const newPicturePopup = createFormPopup({
  title: "Новое место",
  submitButtonText: "Создать",
  inputs: [
    {
      name: "picture-name",
      placeholder: "Название",
    },
    {
      name: "picture-url",
      placeholder: "Ссылка на картинку",
    },
  ],
  onFormSubmit: (values) => {
    console.log(values);
    initialCards.unshift({
      name: values["picture-name"],
      link: values["picture-url"],
    });

    renderDestinationCards();
  },
});

const picturePreviewPopup = createPicturePopup();

profileEditButton.addEventListener("click", () =>
  editProfilePopup.open(profileName.innerText, profileOccupation.innerText)
);

newPictureButton.addEventListener("click", () => newPicturePopup.open());

renderDestinationCards();
