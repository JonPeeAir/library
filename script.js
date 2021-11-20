const library = document.getElementById("library");
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

let newBookIndex = localStorage.length;

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

refreshBooks();

function addBookToLibrary() {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);

    localStorage.setItem(newBookIndex, JSON.stringify(newBook));
    newBookIndex++;

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    refreshBooks();
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

// This function is pretty inefficient
// gonna change it soon
function refreshBooks() {  

    // removes all books from library display
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }

    // re-adds all books into library display including new ones
    for (let i = 0; i < localStorage.length; i++) {
        let book = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let bookDiv = document.createElement("div");

        let bookTitle = document.createElement("p");
        bookTitle.textContent = book.title; 
        let bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;
        let bookPages = document.createElement("p");
        bookPages.textContent = book.pages;

        bookDiv.append(bookTitle);
        bookDiv.append(bookAuthor);
        bookDiv.append(bookPages);

        library.append(bookDiv);
    }
}
