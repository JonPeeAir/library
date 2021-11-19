const form = document.querySelector("form");
form.onsubmit = addBookToLibrary;

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

const newBookButton = document.getElementById("new-book");

const bookModal = document.getElementById("book-modal");
const bookModalOverlay = document.getElementById("modal-overlay");

const bookModalButton = document.getElementById("book-modal-button");
bookModalButton.onclick = openBookModal;

bookModalOverlay.addEventListener("click", closeBookModal);

let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    alert(`Title: ${titleInput.value}, Author: ${authorInput.value}, Pages: ${pagesInput.value}`);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
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
