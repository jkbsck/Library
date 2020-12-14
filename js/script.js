// book constructor
function Book(title, author, pages, isRead) { 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = -1;
}


function setIdsToBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].id = i + 1;
  }
}

// function to add book into library
function addBookToLibrary(book) {
  var isInLibrary = false;
  myLibrary.forEach(element => {
    // if the book is in the library, set variable to true
    if (element.title == book.title) {
      isInLibrary = true;
    }
  });

  // if book isn't in library
  if (!isInLibrary) {
    myLibrary.push(book);
    setIdsToBooks();
    saveToLocalStorage(book);
  } else {
    alert("The book is already in the library");
  }
}

// removes given books from library
function removeBookFromLibrary(id) {
  for (i = 1; i <= myLibrary.length; i++) {
    localStorage.removeItem(i);
  }
  myLibrary.splice(id - 1, 1);
  setIdsToBooks();
  for (i = 1; i <= myLibrary.length; i++) {
    saveToLocalStorage(myLibrary[i - 1]);
  }
  displayBooks();
}

// toggles between read / not read
function readToggleTrigger(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(id);
    console.log(myLibrary[i].id);
    if (id == myLibrary[i].id) {
      const book = document.getElementById(`book${id}`);
      const readToggle = book.getElementsByClassName("read-toggle")[0]; // toggle element with event listener
      console.log(readToggle);
      if (myLibrary[i].isRead == true){
        myLibrary[i].isRead = false;

        // update isRead value in local storage
        localStorage.removeItem(`${i + 1}`);
        saveToLocalStorage(myLibrary[i]);

        readToggle.classList.add("read-toggle-false");
        readToggle.classList.remove("read-toggle-true");
        book.style.backgroundColor = "#c5c5c5";
      } else if (myLibrary[i].isRead == false) {
        myLibrary[i].isRead = true;

        // update isRead value in local storage
        localStorage.removeItem(`${i + 1}`);
        saveToLocalStorage(myLibrary[i]);

        readToggle.classList.add("read-toggle-true");
        readToggle.classList.remove("read-toggle-false");
        book.style.backgroundColor = "#dcdcdc";
      };
      break;
    };
  }
}

// function to display each book from library
function displayBooks() {
  booksList = document.getElementById('booksList');
  // remove books from page before displaying them again
  while (booksList.hasChildNodes()) {
    booksList.removeChild(booksList.lastElementChild);
  }
  // iterate over every book in library
  myLibrary.forEach(element => {
    // add book to list
    book = document.createElement("div");
    book.setAttribute("id", `book${element.id}`);
    book.classList.add("book");
    booksList.appendChild(book);

    // add read toggle to book element for marking as read / not read
    readToggle = addReadToggleToElement(book, element); // book is html element, element is book object from myLibrary
    readToggle.addEventListener("click", () => {readToggleTrigger(element.id)});

    // add X-button to book element for removing books
    xBtn = addXBtnToElement(book);
    xBtn.addEventListener("click", () => {removeBookFromLibrary(element.id)});
        
    // create content for name, author, pages and isRead
    for (let index = 0; index < 3; index++) {
      h5 = document.createElement("h5");
      h4 = document.createElement("h4");
      book.appendChild(h5);
      book.appendChild(h4);
      switch (index) {
        case 0:
          h5.textContent = "name:";
          h4.textContent = `${Object.values(element)[index]}`;
          break;
        case 1: 
          h5.textContent = "author:";
          h4.textContent = `${Object.values(element)[index]}`;
          break;
        case 2: 
          h5.textContent = "pages:";
          h4.textContent = `${Object.values(element)[index]}`;
          break;
      }
    }
  });
}

// new book form display
function displayNewBookForm() {
  newBookForm = document.getElementById("new-book-form"); // select new book form element
  body = document.querySelector("body"); // select body element in order to blur its background

  // add X button to close the form
  xBtn = addXBtnToElement(newBookForm);

  xBtn.addEventListener("click", displayNewBookForm);
  // display the form when clicked
  if (newBookForm.classList.contains("new-book-form-hidden")) {
    newBookForm.classList.remove("new-book-form-hidden");  
    newBookForm.classList.add("new-book-form");
    
    // add blur class to main and removes blur from form element
    body.classList.add("body-blur");
    newBookForm.classList.add("body-blur-none");

    // submit 'add new book' form
    submitNewBook = document.getElementById("newBookForm");
    submitNewBook.onsubmit = function(e) {
      e.preventDefault();
      addBookToLibrary(new Book(submitNewBook.name.value, submitNewBook.author.value, submitNewBook.pages.value, submitNewBook.isRead.checked));
      displayNewBookForm();
      displayBooks();
    };
  // hide the form when clicked
  } else if (newBookForm.classList.contains("new-book-form")) {
    // click new book button again to close the form
    newBookForm.classList.remove("new-book-form");  
    newBookForm.classList.add("new-book-form-hidden");

    // remove blur class from main
    body.classList.remove("body-blur");
    newBookForm.classList.remove("body-blur-none");
  }
}

// add X-button to book element
function addXBtnToElement(element) {
  xBtn = document.createElement("div");
  xBtnStick = document.createElement("div");

  element.appendChild(xBtn);
  xBtn.appendChild(xBtnStick);

  xBtn.classList.add("x-btn");
  xBtnStick.classList.add("x-btn-stick");
  return xBtn;
}

// add read toggle to book
function addReadToggleToElement(book, element) {
  readToggle = document.createElement("div");
  book.appendChild(readToggle);
  readToggle.classList.add("read-toggle");
  readToggle.textContent = "Have you read me?";
  if (element.isRead == true) {
    readToggle.classList.add("read-toggle-true");
    book.style.backgroundColor = "#dcdcdc";
  } else if (element.isRead == false) {
    readToggle.classList.add("read-toggle-false");
    book.style.backgroundColor = "#c5c5c5";
  }
  return readToggle;
}

// saves book to local storage
function saveToLocalStorage(book) {
  localStorage.setItem(`${book.id}`, [book.title, book.author, book.pages, book.isRead]);
}

// get book from library
function getFromLocalStorage() {
  var id = 1;
  while (1) {
    if(!localStorage.getItem(`${id}`)) {
      break;
    };
    var book = localStorage.getItem(`${id}`).split(',');
    addBookToLibrary(new Book(book[0], book[1], book[2], book[3] == "true" ? true : false));
    id++;
  }
}

// event listeners

// show 'add new book' form
var newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", displayNewBookForm);

// main
myLibrary = [];

getFromLocalStorage();

// addBookToLibrary(new Book("Hobbit", "J. R. R. Tolkien", 323, true));
// addBookToLibrary(new Book("Harry Potter", "J. K. Rowling", 563, false));
// addBookToLibrary(new Book("Homo Sapiens", "Yuval N. Harari", 401, true));
// addBookToLibrary(new Book("Communist Manifesto", "Karl Marx", 225, false));
// addBookToLibrary(new Book("Basics of Economics", "Thomas Sowell", 539, true));
// addBookToLibrary(new Book("Hobbit2", "J. R. R. Tolkien", 323, true));
// addBookToLibrary(new Book("Hobbit3", "J. R. R. Tolkien", 323, true));
// addBookToLibrary(new Book("Hobbit4", "J. R. R. Tolkien", 323, true));
// addBookToLibrary(new Book("Hobbit5", "J. R. R. Tolkien", 323, true));


displayBooks();
