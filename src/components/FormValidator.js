export class FormValidator {
  constructor(configuration, formElement) {
    this._formElement = formElement;
    this._fieldsetSelector = configuration.fieldsetSelector;
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inputErrorClass = configuration.inputErrorClass;
    this._spanErrorClass = configuration.spanErrorClass;
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    formElement.addEventListener("reset", () => {
      buttonElement.disabled = true;
    });
  };

  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClass);
    errorElement.textContent = "";
  };
}
