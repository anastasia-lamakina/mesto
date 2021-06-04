import { PopupFormBaseWithLoading } from "./PopupFormBaseWithLoading";

export class PopupConfirm extends PopupFormBaseWithLoading {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
  }

  open() {
    super.open();
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._resolve();
    });
  }
}
