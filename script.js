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

const createBook = (title, author, pages) => {
    return {
        title, 
        author, 
        pages, 
        read: false, 
        key: generateBookKey() }
}

function generateBookKey() {
    return findLargestKeyIn(localStorage) + 1 || localStorage.length;
}

function findLargestKeyIn(storageObj) {
    let largest = Object.keys(storageObj)[0]; 
    for (let i = 1; i < storageObj.length; i++) {
        largest = Object.keys(storageObj)[i] > largest ? Object.keys(storageObj)[i] : largest;
    }
    return Number(largest);
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
    let newBook = createBook(titleInput.value, authorInput.value, pagesInput.value);

    localStorage.setItem(newBook.key, JSON.stringify(newBook));

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    refreshBooks();
    closeBookModal();

    // This makes it so that the form doesn't actually submit the data
    return false;
}


// This function is pretty inefficient. Imma change it soon...I think
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
    let booksToDisplay = localStorage.length;
    let index = 0;
    while (booksToDisplay) {
        if (!localStorage.getItem(index)) {
            index++;
            continue;
        }
        let bookJSON = localStorage.getItem(index);
        let book = JSON.parse(bookJSON);
        displayBookInLIbrary(book);
        index++;
        booksToDisplay--;
    }
}

function displayBookInLIbrary(book) {
    const bookCard = bookCardFactory(book);
    library.append(bookCard);
}

const bookCardFactory = (bookObj) => {
    // Main div that holds bookCardDesc and bookCardMenu
    // -- This is the main html node we will be returning --
    const bookCardContainer = document.createElement("div");
    bookCardContainer.classList.add("book-card-container");

    
    // Creating the book description...
    // Div that holds the book description
    let bookCardDesc = document.createElement("div");
    bookCardDesc.classList.add("book-card");

    // The front of the card holds the book title
    let cardFront = document.createElement("figure");
    cardFront.classList.add("front");
    cardFront.textContent = bookObj.title;

    // The back of the card holds the book author and no. of pages
    let cardBack = document.createElement("figure");
    cardBack.classList.add("back");
    let bookAuthorDiv = document.createElement("div");
    bookAuthorDiv.classList.add("book-author")
    let bookAuthorLabel = document.createElement("b");
    bookAuthorLabel.textContent = "Author";
    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = bookObj.author;
    bookAuthorDiv.append(bookAuthorLabel);
    bookAuthorDiv.append(bookAuthor);
    let pages = document.createElement("p");
    pages.textContent = bookObj.pages;
    cardBack.append(bookAuthorDiv);
    cardBack.append(pages);

    // Put the descriptions all together
    bookCardDesc.append(cardFront);
    bookCardDesc.append(cardBack);


    // Creating the book menu...
    // Div that holds the book menu
    let bookMenu = document.createElement("div");
    bookMenu.classList.add("book-menu");

    // This div holds the toggle label and the toggle itself
    let readToggleContainer = document.createElement("div");
    readToggleContainer.classList.add("read-toggle");
    // This is the toggle label
    readToggleContainer.textContent = "Read";

    // Creating the read toggle...
    // This is the div (label) that will hold the checkbox and toggle graphic that responds to the checkbox
    let readToggle = document.createElement("label");
    readToggle.classList.add("switch");

    // This is the toggle checkbox
    let readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = bookObj.read;
    readCheckbox.dataset.key = bookObj.key;
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

    // This is the toggle graphic
    let readUI = document.createElement("span");
    readUI.classList.add("slider", "round");

    // Put the checkbox and graphic all together
    readToggle.append(readCheckbox);
    readToggle.append(readUI);

    // Add the toggle below its label
    readToggleContainer.append(readToggle);

    // creating a remove button
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";
    removeButton.dataset.key = bookObj.key;
    removeButton.onclick = () => {
        localStorage.removeItem(removeButton.dataset.key);
        if (localStorage.length === 0) {
            newBookIndex = 0;
        }
        refreshBooks();
    }

    // Put the read toggle and remove button in the menu div
    bookMenu.append(readToggleContainer);
    bookMenu.append(removeButton);

    // Now add the description and menu to the book card container
    bookCardContainer.append(bookCardDesc);
    bookCardContainer.append(bookMenu);

    // Now whenever we click on the card, the menu shows up and disappear when we click it again
    bookCardContainer.addEventListener("click", () => {
        console.log(bookMenu.style.transform);
        if (bookMenu.style.visibility === "hidden") {
            bookMenu.style.visibility= "visible";
            bookMenu.style.opacity = "1";
        } else {
            bookMenu.style.visibility= "hidden";
            bookMenu.style.opacity = "0";
        }

    });

    // return a fully customized html node for a book object
    return bookCardContainer;
}

function clearLibraryStorage() {
    localStorage.clear();
    newBookIndex = 0;
    refreshBooks();
}

refreshBooks();
