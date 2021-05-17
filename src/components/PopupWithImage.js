import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  open({ name, link }) {
    super.open({ name, link });
    this._popup.querySelector(".popup__subtitle").textContent = name;
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
  }
}
