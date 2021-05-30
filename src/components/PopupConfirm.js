import { Popup } from "./Popup";

export class PopupConfirm extends Popup {
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

  close(reject = true) {
    super.close();
    if (reject) {
      this._reject();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._resolve();
      this.close(false);
    });
  }
}
