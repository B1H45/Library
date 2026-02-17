const myLibrary = [];

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

function displayBooks(myLibrary) {
    const bookTable = document.querySelector("#book-table");

    for (const book of myLibrary) {
        let card = document.createElement("li");
        card.classList.add("card");

        let titleTxt = document.createElement("h2");
        titleTxt.textContent = book.title;
        let authorTxt = document.createElement("p");
        authorTxt.textContent = book.author;
        let pgCountTxt = document.createElement("p");
        pgCountTxt.textContent = book.pgCount;

        card.appendChild(titleTxt);
        card.appendChild(authorTxt);
        card.appendChild(pgCountTxt);

        bookTable.appendChild(card);
    }
}

addBookToLibrary("Thing", "Dude", 100);
addBookToLibrary("Thing", "Dude", 100);
addBookToLibrary("Thing", "Dude", 100);

displayBooks(myLibrary);
