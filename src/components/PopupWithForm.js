import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ onSubmit }, popupSelector) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector("form");
  }

  open(values) {
    super.open();

    Object.keys(values).forEach((key) => {
      this._form.querySelector(`[name=${key}]`).value = values[key];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
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
