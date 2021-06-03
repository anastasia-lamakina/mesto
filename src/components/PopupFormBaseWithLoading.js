import { Popup } from "./Popup";

export class PopupFormBaseWithLoading extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._popupButton = this._form.querySelector("[type='submit']");
  }

  setIsLoading() {
    this._originalPopupButtonValue = this._popupButton.value;
    this._loadingCount = 1;
    this._intervalHandle = setInterval(() => {
      this._popupButton.value = `Сохранение${".".repeat(this._loadingCount)}`;
      if (this._loadingCount > 3) {
        this._loadingCount = 1;
      } else {
        this._loadingCount += 1;
      }
    }, 250);
  }

  clearIsLoading() {
    clearInterval(this._intervalHandle);
    this._popupButton.value = this._originalPopupButtonValue;
  }
}
