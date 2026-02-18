const myLibrary = [];

// Book Functions

function Book(title, author, pgCount) {
  // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pgCount = pgCount;
}

function addBookToLibrary(title, author, pgCount) {
  // take params, create a book then store it in the array
    let newBook = new Book(title, author, pgCount);
    myLibrary.push(newBook);
}

function remBookFromLibrary(book) {
  const idx = myLibrary.findIndex(b => b.id === book.id);
  if (idx === -1) return;
  myLibrary.splice(idx, 1);
  displayBooks(myLibrary);
}

function displayBooks(myLibrary) {
    const bookTable = document.querySelector("#book-table");
    bookTable.innerHTML = "";

    for (const book of myLibrary) {
        let card = document.createElement("li");
        card.classList.add("card");

        let cardInner = document.createElement("div");
        card.appendChild(cardInner);

        let titleTxt = document.createElement("h2");
        titleTxt.textContent = book.title;
        let authorTxt = document.createElement("p");
        authorTxt.textContent = book.author;
        let pgCountTxt = document.createElement("p");
        pgCountTxt.textContent = book.pgCount;
        let remButton = document.createElement("button");
        remButton.textContent = "Remove";
        remButton.classList.add("rem-button");
        
        remButton.addEventListener("click", () => {
          remBookFromLibrary(book);
        })


        cardInner.appendChild(titleTxt);
        cardInner.appendChild(authorTxt);
        cardInner.appendChild(pgCountTxt);
        cardInner.appendChild(remButton);

        bookTable.appendChild(card);
    }
}

// Form functionality

const bookDialog = document.querySelector("#add-book-dialog");
const bookForm = document.querySelector("#add-book-form");

bookDialog.addEventListener("close", (e) => {
  if (bookDialog.returnValue == "add") {
    let fData = new FormData(bookForm);
    const formProps = Object.fromEntries(fData);

    addBookToLibrary(formProps.title, formProps.author, formProps.pgCount);
    displayBooks(myLibrary); 
  }
  bookForm.reset();
});

window.addEventListener("load", () => {
  bookForm.reset();
})

addBookToLibrary("Thing", "Dude", 100);
addBookToLibrary("Thing", "Dude", 100);
addBookToLibrary("Thing", "Dude", 100);
addBookToLibrary("Thing", "Dude", 100);

displayBooks(myLibrary);
