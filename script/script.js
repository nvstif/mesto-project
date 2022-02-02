// Объявление переменных
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const profileUserName = document.querySelector('.profile__name');
const profileUserAbout = document.querySelector('.profile__about');
const cardTemplate = document.querySelector('#card').content;
const elementsContainer = document.querySelector('.elements');

const popupEdit = document.querySelector('.popup_edit');
const username = popupEdit.querySelector('.input-username');
const userabout = popupEdit.querySelector('.input-userabout');
const profileForm = popupEdit.querySelector('.profile-info');
const closeProfileForm = popupEdit.querySelector('.popup__cross');

const popupAdd = document.querySelector('.popup_add');
const inputName = popupAdd.querySelector('.input-name');
const inputLink = popupAdd.querySelector('.input-link');
const addForm = popupAdd.querySelector('.profile-info');
const closeAddForm = popupAdd.querySelector('.popup__cross');

const popupShowImg = document.querySelector('.popup_show-img');
const popupBigImg = document.querySelector('.popup__img');
const popupTextToBigImg = document.querySelector('.popup__place');
const closeBigImg = popupShowImg.querySelector('.popup__cross');

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

closeProfileForm.addEventListener('click', function () {
  closePopup(popupEdit);
});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeAddForm.addEventListener('click', function () {
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
function showCard(cardElementImg, cardElementText) {
  cardElementImg.addEventListener('click', function () {
    popupBigImg.src = cardElementImg.src;
    popupBigImg.alt = cardElementText.textContent;
    popupTextToBigImg.textContent = cardElementText.textContent;
    openPopup(popupShowImg);
  });
}

closeBigImg.addEventListener('click', function () {
  closePopup(popupShowImg);
});

// добавление карточки
function addCard(card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.element__image');
  const cardElementText = cardElement.querySelector('.element__name');
  cardElementImg.src = card.link;
  cardElementImg.alt = card.name;
  cardElementText.textContent = card.name;
  addLike(cardElement);
  deleteCard(cardElement);
  showCard(cardElementImg, cardElementText);
  return cardElement;
}

// отрисовка первоначальных карточек
initialCards.forEach(function (card) {
  elementsContainer.append(addCard(card));
})

// сабмит редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = username.value;
  profileUserAbout.textContent = userabout.value;
  closePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// сабмит новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputName.value,
    link: inputLink.value
  };
  elementsContainer.prepend(addCard(newCard));
  closePopup(popupAdd);
  inputName.value = '';
  inputLink.value = '';
}

addForm.addEventListener('submit', handleAddFormSubmit);
