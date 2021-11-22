const library = document.getElementById("library");
const bookModal = document.getElementById("book-modal");
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const newBookButton = document.getElementById("new-book");
const bookModalOverlay = document.getElementById("modal-overlay");
const bookModalButton = document.getElementById("book-modal-btn");
const clearStorageButton = document.getElementById("clear-storage-btn");

clearStorageButton.addEventListener("click", clearLibraryStorage);
bookModalButton.addEventListener("click", openBookModal);
bookModalOverlay.addEventListener("click", closeBookModal);
form.onsubmit = addBookToLibrary;

let newBookIndex = localStorage.length;

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
    this.key = newBookIndex;
    newBookIndex++;
}

function openBookModal() {
    bookModal.classList.add("active");
    bookModalOverlay.classList.add("active");
}

function closeBookModal() {
    bookModal.classList.remove("active");
    bookModalOverlay.classList.remove("active");
}


function addBookToLibrary() {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);

    localStorage.setItem(newBook.key, JSON.stringify(newBook));

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    refreshBooks();
    closeBookModal();

    // This makes it so that the form doesn't actually submit the data
    return false;
}


// This function is pretty inefficient. Imma change it soon
function refreshBooks() {  
    removeBooksFrom(library);
    populateLibraryWithBooksFromLocalStorage();
}

function removeBooksFrom(library) {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

function populateLibraryWithBooksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let bookJSON = localStorage.getItem(i);
        let book = JSON.parse(bookJSON);
        displayBookInLIbrary(book);
    }
}

function displayBookInLIbrary(book) {
    // TODO: write a function that creates a book card with full functionality

    let bookDiv = document.createElement("div");

    let bookTitle = document.createElement("p");
    bookTitle.textContent = book.title; 
    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;
    let bookPages = document.createElement("p");
    bookPages.textContent = book.pages;

    // creating a read toggle switch
    let readToggle = document.createElement("label");
    readToggle.classList.add("switch");

    let readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.read;
    readCheckbox.dataset.key = book.key;
    readCheckbox.addEventListener("change", () => {
        if (readCheckbox.checked) {
            console.log("this is checked");
            let bookJSON = localStorage.getItem(readCheckbox.dataset.key);
            let book = JSON.parse(bookJSON);
            book.read = true;
            localStorage.setItem(readCheckbox.dataset.key, JSON.stringify(book));
        } else {
            console.log("this is not checked");
            let bookJSON = localStorage.getItem(readCheckbox.dataset.key);
            let book = JSON.parse(bookJSON);
            book.read = false;
            localStorage.setItem(readCheckbox.dataset.key, JSON.stringify(book));
        }

    });
    let readUI = document.createElement("span");
    readUI.classList.add("slider", "round");

    readToggle.append(readCheckbox);
    readToggle.append(readUI);

    bookDiv.append(bookTitle);
    bookDiv.append(bookAuthor);
    bookDiv.append(bookPages);
    bookDiv.append(readToggle);

    library.append(bookDiv);
}

function clearLibraryStorage() {
    localStorage.clear();
    newBookIndex = 0;
    refreshBooks();
}

refreshBooks();
