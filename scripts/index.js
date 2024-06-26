import initialcards from './initialcards.js'
import Card from './card.js'
import FormValidator from './FormValidator.js'

//переменные для профайл попапа
const profilePopup = document.querySelector('.popup-profile');
const profilePopupForm = document.querySelector('.popup-profile__form');
const profilePopupOpenBtn = document.querySelector('.profile__popup-profile');
const profilePopupCloseBtn = document.querySelector('.popup-profile__close-btn');
const profilePopupInputName = document.querySelector('#name');
const profilePopupInputJob = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


//переменные для фото попапа
const imagePopup = document.querySelector('.popup-image');
const elementImage = document.querySelector('.popup-image__container');
const elementCityName = document.querySelector('.popup-image__signature');
const imageCloseBtn = document.querySelector('.popup-image__close-btn');

//переменные для карточки попапа
const popupCard = document.querySelector('.popup-card');
const cardOpenBtn = document.querySelector('.profile__add-button');
const cardCloseBtn = document.querySelector('.popup-card__close-btn');
const cardInputName = document.querySelector('#place');
const cardInputImageLink = document.querySelector('#url');
const cardForm = document.querySelector('.popup-card__form');

const sectionElements = document.querySelector('.elements');

// конфиг валидации
const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorSelectorTemplate: '.popup__error_',
  disableButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  textErrorClass: 'popup__error_visible'
};


//экземпляр класса для профайл попапа
const profilePopupValidator = new FormValidator(validatorConfig, profilePopupForm)
profilePopupValidator.enableValidation();

//экземпляр класса для карточки попапа
const cardPopupValidator = new FormValidator(validatorConfig, cardForm)
cardPopupValidator.enableValidation();

//открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handleClosePopup);
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', handleClosePopup);
  document.removeEventListener('keydown', closePopupEsc);
}

const openProfileForm = () => {
  profilePopupValidator.resetValidationState();
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputJob.value = profileJob.textContent;
  openPopup(profilePopup);
}

const openCardForm = () => {
  cardPopupValidator.resetValidationState();
  cardForm.reset();
  openPopup(popupCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileJob.textContent = profilePopupInputJob.value;
  closePopup(profilePopup);
}

const handleClosePopup = (evt) => {
  const isOverlay = evt.target.classList.contains('popup');
  const closeBtn = evt.target.classList.contains('popup__close-btn');

  if (isOverlay || closeBtn) {
    const popupOpened = document.querySelector('.popup_opened');
    // закрыть найденный открытый popup, если такой есть
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
};

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
};

function handleCardSubmit(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  const newElement = {
    name: cardInputName.value,
    link: cardInputImageLink.value,
  };
  const cardMarkup = createNewCard(newElement);
  addCardToContainer(cardMarkup);
}

const selectorTemplate = '#card-template'

// функция для открытия попапа с картинкой
function openImagePopup(cardData) {
  elementCityName.textContent = cardData.name;
  elementImage.src = cardData.link;
  elementImage.alt = 'фотография недоступна';
  openPopup(imagePopup)
}


// добавление карточки в тот контейнер, который нам нужен
function addCard(container, card) {
  container.append(card);
}

// дефолтные карточки из массива
initialcards.forEach(element => {
  addCard(sectionElements, createNewCard(element))
});

function createNewCard(cardData) {
  const element = new Card(cardData, selectorTemplate, openImagePopup);
  const cardElement = element.createCard();
  return cardElement;
}

function addCardToContainer(cardMarkup) {
  sectionElements.prepend(cardMarkup);
}


// //слушатели для профайл попапа
profilePopupOpenBtn.addEventListener('click', () => openProfileForm(profilePopup));
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

// //слушатели для карточки попапа
cardOpenBtn.addEventListener('click', () => openCardForm(popupCard));
cardCloseBtn.addEventListener('click', () => closePopup(popupCard));
cardForm.addEventListener('submit', handleCardSubmit);

// //слушатели для фото попапа
imageCloseBtn.addEventListener('click', () => closePopup(imagePopup));

