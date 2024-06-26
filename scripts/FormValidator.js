class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputSelector = config.inputSelector;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._disableButtonClass = config.disableButtonClass;
    this._textErrorClass = config.textErrorClass;
    this._form = form;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  _showInputError(errorTextElement, input) {
    input.classList.add(this._textErrorClass);
    errorTextElement.textContent = input.validationMessage;
  }

  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._textErrorClass);
    errorTextElement.textContent = '';
  }

  _areAllInputsValid() {
    return Array.from(this._inputList).every(input => input.validity.valid)
  };

  _enableButton() {
    this._button.classList.remove(this._disableButtonClass);
    this._button.disabled = false;
  }

  _disableButton() {
    this._button.classList.add(this._disableButtonClass);
    this._button.disabled = true;
  }

  _toggleButtonState() {
    if (this._areAllInputsValid()) {
      this._enableButton();
    } else {
      this._disableButton(this._button);
    }
  }

  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`)
    if (input.validity.valid) {
      this._hideInputError(errorTextElement, input);
    }
    else {
      this._showInputError(errorTextElement, input);
    }
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListener();
  }

  resetValidationState() {
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`)
      if (!input.validity.valid) {
        this._hideInputError(errorTextElement, input);
      }
    })
    this._disableButton()
  }
}

export default FormValidator;