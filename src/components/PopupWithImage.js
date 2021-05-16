import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popup.querySelector(".popup__subtitle").textContent = name;
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener("click", () => this.close());
    this._popup
      .querySelector(".popup__image")
      .addEventListener("click", (event) => event.stopPropagation());
  }
}
