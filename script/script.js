// Объявление переменных
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const profileUserName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__about');
const elementsContainer = document.querySelector('.elements');

const popupEdit = document.querySelector('.popup_edit');
const username = popupEdit.querySelector('.input-username');
const userabout = popupEdit.querySelector('.input-userabout');
const buttonClosePE = popupEdit.querySelector('.popup__cross');
const formElementPE = popupEdit.querySelector('.profile-info');

const popupAdd = document.querySelector('.popup_add');
const inputName = popupAdd.querySelector('.input-name');
const inputLink = popupAdd.querySelector('.input-link');
const buttonClosePA = popupAdd.querySelector('.popup__cross');
const formElementPA = popupAdd.querySelector('.profile-info');

const popupShowImg = document.querySelector('.popup_show-img');
const buttonCloseSHI = popupShowImg.querySelector('.popup__cross');

const initialCards = [{
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1593555201453-2d6d07c708d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=730&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1594397394907-096148b9d1c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1587053362230-eb9a377641ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Крым',
    link: 'https://images.unsplash.com/photo-1624571149875-59a402116d88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Краснодар',
    link: 'https://images.unsplash.com/photo-1606405139755-2c13bac7894d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
];

// открытие, закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  username.value = profileUserName.textContent;
  userabout.value = profileUserAbout.textContent;
});

buttonClosePE.addEventListener('click', function () {
  closePopup(popupEdit);
});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
});

buttonClosePA.addEventListener('click', function () {
  closePopup(popupAdd);
});

// лайк на карточку
function addLike(cardElement) {
  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
}

// удаление карточки
function deleteCard(cardElement) {
  cardElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
}

// показ карточки
function showCard(cardElement) {
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    document.querySelector('.popup__img').src = cardElement.querySelector('.element__image').src;
    document.querySelector('.popup__img').alt = cardElement.querySelector('.element__image').alt;
    document.querySelector('.popup__place').textContent = cardElement.querySelector('.element__name').textContent;
    openPopup(popupShowImg);
  });
  buttonCloseSHI.addEventListener('click', function () {
    closePopup(popupShowImg);
  });
}

// добавление карточки
function addCard(card) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__name').textContent = card.name;
  console.log(cardElement);
  addLike(cardElement);
  deleteCard(cardElement);
  showCard(cardElement);
  return cardElement;
}

// отрисовка первоначальных карточек
initialCards.forEach(function (card) {
  elementsContainer.append(addCard(card));
})

// сабмит редактирования профиля
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileUserName.textContent = username.value;
  profileUserAbout.textContent = userabout.value;
  popupEdit.classList.remove('popup_opened');
}

formElementPE.addEventListener('submit', formSubmitHandlerEdit);

// сабмит новой карточки
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputName.value,
    link: inputLink.value
  };
  elementsContainer.prepend(addCard(newCard));
  popupAdd.classList.remove('popup_opened');
  inputName.value = '';
  inputLink.value = '';
}

formElementPA.addEventListener('submit', formSubmitHandlerAdd);
