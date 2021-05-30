export class Api {
  constructor({ basePath, apiKey }) {
    this._basePath = basePath;
    this._headers = {
      authorization: apiKey,
      "Content-Type": "application/json",
    };
  }

  getInitialCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
    });
  }

  putLikeClick(cardId) {
    return fetch(`${this._basePath}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  deleteLikeClick(cardId) {
    return fetch(`${this._basePath}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  postNewCard({ name, link }) {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  getUserProfile() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
    });
  }

  patchUserInformation({ name, about }) {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}
