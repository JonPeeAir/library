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

function openBookModal() {
    bookModal.classList.add("active");
    bookModalOverlay.classList.add("active");
}

function closeBookModal() {
    bookModal.classList.remove("active");
    bookModalOverlay.classList.remove("active");
}

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

function addBookToLibrary() {
    const newBook = createBook(titleInput.value, authorInput.value, pagesInput.value);
    localStorage.setItem(newBook.key, JSON.stringify(newBook));

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    refreshBooks();
    closeBookModal();

    // This makes it so that the form doesn't actually submit the data
    return false;
}

function refreshBooks() {  
    clearBooksFrom(library);
    populateLibraryWithBooksFromLocalStorage();
}

function clearBooksFrom(library) {
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
    const bookCard = createBookCardFrom(book);
    library.append(bookCard);
}

const createBookCardFrom = (bookObj) => {

    function createBookCardDescription() {

        function createFrontCardDescription() {
            const frontCard = document.createElement("figure");
            frontCard.classList.add("front");
            frontCard.textContent = bookObj.title;

            return frontCard;
        }

        function createBackCardDescription() {

            const bookAuthorLabel = document.createElement("b");
            bookAuthorLabel.textContent = "Author";
            const bookAuthor = document.createElement("p");
            bookAuthor.textContent = bookObj.author;

            const bookPagesLabel= document.createElement("b");
            bookPagesLabel.textContent = "Pages";
            const bookPages= document.createElement("p");
            bookPages.textContent = bookObj.pages;

            const bookDescriptionDiv = document.createElement("div");
            bookDescriptionDiv.classList.add("book-description")
            bookDescriptionDiv.append(bookAuthorLabel);
            bookDescriptionDiv.append(bookAuthor);
            bookDescriptionDiv.append(bookPagesLabel);
            bookDescriptionDiv.append(bookPages);

            const readStatus = document.createElement("p");
            readStatus.textContent = bookObj.read ? "Already read it" : "Haven't read it";

            const backCard = document.createElement("figure");
            backCard.classList.add("back");
            backCard.append(bookDescriptionDiv);
            backCard.append(readStatus);

            return backCard;
        }
        
        const frontCard = createFrontCardDescription();
        const backCard = createBackCardDescription();

        const bookCardDesc = document.createElement("div");
        bookCardDesc.classList.add("book-card");
        bookCardDesc.append(frontCard);
        bookCardDesc.append(backCard);

        return bookCardDesc;
    }

    function createBookCardMenu () {

        function createReadToggleWithLabel() {

            function createReadToggle() {

                function createCheckbox() {

                    function toggleBookReadStatus() {
                        const bookJSON = localStorage.getItem(this.dataset.key);
                        const book = JSON.parse(bookJSON);
                        book.read = this.checked ? true : false;
                        localStorage.setItem(this.dataset.key, JSON.stringify(book));

                        const bookCardContainer = this.parentElement.parentElement.parentElement.parentElement;
                        const bookCard = bookCardContainer.firstChild;
                        const backCard = bookCard.childNodes[1];
                        const readStatus = backCard.childNodes[1];
                        readStatus.textContent = book.read ? "Already read it" : "Haven't read it";
                    }
                    
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = bookObj.read;
                    checkbox.dataset.key = bookObj.key;
                    checkbox.addEventListener("change", toggleBookReadStatus);

                    return checkbox;
                }

                function createUserInterface() {
                    const userInterface = document.createElement("span");
                    userInterface.classList.add("slider", "round");

                    return userInterface;
                }

                const readCheckbox = createCheckbox();
                const readUI = createUserInterface();

                const readToggle = document.createElement("label");
                readToggle.classList.add("switch");
                readToggle.append(readCheckbox);
                readToggle.append(readUI);

                return readToggle;
            }

            const readToggle = createReadToggle();

            const readToggleWithLabel= document.createElement("div");
            readToggleWithLabel.classList.add("read-toggle");
            readToggleWithLabel.textContent = "Read";
            readToggleWithLabel.append(readToggle);

            return readToggleWithLabel;
        }

        function createRemoveButton() {

            function removeBook() {
                localStorage.removeItem(this.dataset.key);
                refreshBooks();
            }

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-btn");
            removeButton.textContent = "Remove";
            removeButton.dataset.key = bookObj.key;
            removeButton.onclick = removeBook;

            return removeButton;
        }

        const readToggle = createReadToggleWithLabel();
        const removeButton = createRemoveButton();

        const bookMenu = document.createElement("div");
        bookMenu.classList.add("book-menu");
        bookMenu.append(readToggle);
        bookMenu.append(removeButton);

        return bookMenu;
    }

    const bookDescription= createBookCardDescription();
    const bookMenu = createBookCardMenu();

    const bookCardContainer = document.createElement("div");
    bookCardContainer.classList.add("book-card-container");
    bookCardContainer.append(bookDescription);
    bookCardContainer.append(bookMenu);

    function toggleBookMenu() {
        if (bookMenu.style.visibility === "hidden" || bookMenu.style.visibility === "") {
            bookMenu.style.visibility= "visible";
            bookMenu.style.opacity = "1";
        } else {
            bookMenu.style.visibility= "hidden";
            bookMenu.style.opacity = "0";
        }
    }

    bookCardContainer.addEventListener("click", toggleBookMenu);

    return bookCardContainer;
}

function clearLibraryStorage() {
    localStorage.clear();
    refreshBooks();
}

refreshBooks();
