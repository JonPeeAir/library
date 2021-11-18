const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", addBookToLibrary);

let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    alert(`Title: ${titleInput.value}, Author: ${authorInput.value}, Pages: ${pagesInput.value}`);
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value);
    let bookElement = document.createElement("p");
    bookElement.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}`
    document.body.appendChild(bookElement);
}
