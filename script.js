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

    

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

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
