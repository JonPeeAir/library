const bookModalButton = document.getElementById("book-modal-button");
const bookModal = document.getElementById("book-modal");
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const newBookButton = document.getElementById("new-book");
const bookModalOverlay = document.getElementById("modal-overlay");

bookModalButton.addEventListener("click", openBookModal);
bookModalOverlay.addEventListener("click", closeBookModal);
form.onsubmit = addBookToLibrary;

let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    alert(`Title: ${titleInput.value}, Author: ${authorInput.value}, Pages: ${pagesInput.value}`);
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);



    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    closeBookModal();

    // This makes it so that the form doesn't actually submit the data
    return false;
}

function openBookModal() {
    bookModal.classList.add("active");
    bookModalOverlay.classList.add("active");
}

function closeBookModal() {
    bookModal.classList.remove("active");
    bookModalOverlay.classList.remove("active");
}


function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    alert("yes");
  }
  else {
    // Too bad, no localStorage for us
    alert("no");
  }

