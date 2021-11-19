const form = document.querySelector("form");
form.onsubmit = addBookToLibrary;

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

const newBookButton = document.getElementById("new-book");

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
