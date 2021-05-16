export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener("click", () => this.close());
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
