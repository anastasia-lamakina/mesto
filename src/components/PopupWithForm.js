import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ onSubmit }, popupSelector) {
    super();
    this._popup = document.querySelector(popupSelector);

    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector("form");
  }

  open(values = {}) {
    Object.keys(values).forEach((key) => {
      this._form.querySelector(`[name=${key}]`).value = values[key];
    });

    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._form.reset();
  }

  setEventListeners() {
    this._popup.addEventListener("click", () => this.close());
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());
    this._form.addEventListener("click", (event) => event.stopPropagation());
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._onSubmit(this._getInputValues(event));
      this.close();
    });
  }

  _getInputValues(event) {
    const values = {};

    event.target.querySelectorAll(".popup__input").forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }
}
