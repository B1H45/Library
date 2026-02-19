let myLibrary = [];

// Book Functions

function Book(title, author, pgCount) {
  // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pgCount = pgCount;
    this.read = false;
}

Book.prototype.toggleRead = function(readToggle) {
  if (this.read==true) {
    this.read = false;
    readToggle.classList.remove("status-read");
    readToggle.textContent = "Unread"
  } else {
    this.read = true;
    readToggle.classList.add("status-read");
    setTimeout(() => {
      readToggle.textContent = "Read";
    }, 100)
  }
  readToggle.classList.add("cooldown");
  setTimeout(() => {
    window.addEventListener("mousemove", () => {
        readToggle.classList.remove("cooldown");
    }, { once: true });
    window.addEventListener("focusout", () => {
        readToggle.classList.remove("cooldown");
    }, { once: true });
  }, 500);
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
        authorTxt.textContent = "Author: " + book.author;
        let pgCountTxt = document.createElement("p");
        pgCountTxt.textContent = "Pages: " + book.pgCount;

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button-div");

        let remButton = document.createElement("button");
        remButton.textContent = "Remove";
        remButton.classList.add("invert");
        remButton.classList.add("button");
        remButton.addEventListener("click", () => {
          remBookFromLibrary(book);
        })

        let readToggle = document.createElement("button");
        readToggle.classList.add("button");
        readToggle.textContent = "Unread";
        readToggle.classList.add("read-toggle");
        if (book.read) {
          readToggle.classList.add("status-read");
          readToggle.textContent = "Unread";
        }
        readToggle.addEventListener("click", ()=>{
          book.toggleRead(readToggle);
        })

        buttonDiv.appendChild(remButton);
        buttonDiv.appendChild(readToggle);
        
        cardInner.appendChild(titleTxt);
        cardInner.appendChild(authorTxt);
        cardInner.appendChild(pgCountTxt);
        cardInner.appendChild(buttonDiv);

        bookTable.appendChild(card);

        // Read toggle implementation
        // let node;
        // const walker = document.createTreeWalker(
        //     readToggle,
        //     NodeFilter.SHOW_TEXT,
        //     null
        // );
        // node = walker.nextNode();
        // let range = document.createRange();
        // range.selectNodeContents(node);
        // let rect = range.getBoundingClientRect();
        // console.log(rect.width + "!!!");
        readToggle.style.width = readToggle.getBoundingClientRect().width + "px";

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
  document.activeElement.blur(); // blur before closing
});

window.addEventListener("load", () => {
  bookForm.reset();
})

addBookToLibrary("The Restaurant at the End of the Universe", "Douglas Adams", 1231);
addBookToLibrary("The Fellowship of the Ring", "J. R. R. Tolkien", 4123);
addBookToLibrary("The Lion, the Witch, and the Wardrobe", "C. S. Lewis", 2322);
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1532);

displayBooks(myLibrary);
