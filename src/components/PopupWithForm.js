import { PopupFormBaseWithLoading } from "./PopupFormBaseWithLoading";

export class PopupWithForm extends PopupFormBaseWithLoading {
  constructor({ onSubmit }, popupSelector) {
    super(popupSelector);
    this._onSubmit = onSubmit;
  }

  open(values) {
    super.open();
    if (values) {
      Object.keys(values).forEach((key) => {
        this._form.querySelector(`[name=${key}]`).value = values[key];
      });
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._onSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const values = {};

    this._form.querySelectorAll(".popup__input").forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }
}
