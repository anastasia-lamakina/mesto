export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._aboutField = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserData() {
    return {
      name: this._nameField.innerText,
      about: this._aboutField.innerText,
      avatar: this._avatar.src,
      _id: this._id,
    };
  }

  setUserData({ name, about, avatar, _id }) {
    this._nameField.innerText = name;
    this._aboutField.innerText = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this._id = _id;
  }
}
