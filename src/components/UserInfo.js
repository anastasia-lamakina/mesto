export class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._occupationField = document.querySelector(occupationSelector);
  }

  getUserData() {
    return {
      name: this._nameField.innerText,
      occupation: this._occupationField.innerText,
    };
  }

  setUserData({ name, occupation }) {
    this._nameField.innerText = name;
    this._occupationField.innerText = occupation;
  }
}
