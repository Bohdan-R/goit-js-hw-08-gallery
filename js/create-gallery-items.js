import images from '../gallery-items.js';

const createImageItem = (image, index) => {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.href = image.original;

  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.src = image.preview;
  imageRef.setAttribute('data-source', image.original);
  imageRef.setAttribute('data-index', index);
  imageRef.alt = image.description;

  linkRef.appendChild(imageRef);

  itemRef.appendChild(linkRef);

  return itemRef;
};

const galleryItems = images.map((image, index) => createImageItem(image, index));

const galleryListRef = document.querySelector('.js-gallery');

galleryListRef.append(...galleryItems);

const largeImageRef = document.querySelector('.lightbox__image');
const openModalRef = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

galleryListRef.addEventListener('click', onGalleryItemClick);
closeModalBtn.addEventListener('click', onCloseModal);
overlayRef.addEventListener('click', onOverlayClick)

function onGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return
  };

  const largeImageURL = event.target.dataset.source;
  const currentLargeImageIndex = event.target.dataset.index;
  const largeImageAlt = event.target.alt;
  largeImageRef.src = largeImageURL;
  largeImageRef.alt = largeImageAlt;
  largeImageRef.setAttribute('data-index', currentLargeImageIndex);

  openModalRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressRight);
  window.addEventListener('keydown', onPressLeft);
  let currentIndex = Number(largeImageRef.getAttribute('data-index'));
    
  function onPressRight(event) {
    if (event.code === 'ArrowRight' && currentIndex > images.length - 2) {
      return
    };
    if (event.code === 'ArrowRight') {
      currentIndex += 1;
      largeImageRef.src = images[currentIndex].original;
    };    
  };

  function onPressLeft(event) {
    if (event.code === 'ArrowLeft' && currentIndex < 1) {
      return;
    };
    
    if (event.code === 'ArrowLeft') {
      currentIndex -= 1;
      largeImageRef.src = images[currentIndex].original;
    };
  };
};

function onCloseModal() {
  openModalRef.classList.remove('is-open');
  largeImageRef.src = '';
  window.removeEventListener('keydown', onPressEscape);
};

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  };
};

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  };
};