myLibrary = [];

// book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// function to add book into library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// function to display each book from library
function displayBooks() {
  booksList = document.getElementById('booksList');
  while (booksList.hasChildNodes()) {
    booksList.removeChild(booksList.lastElementChild);
  }
  // iterate over every book in library
  myLibrary.forEach(element => {
    book = document.createElement("div");
    book.classList.add("book");
    booksList.appendChild(book);
    // create content for name, author, pages and isRead
    for (let index = 0; index < 4; index++) {
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
        case 3: 
          h5.textContent = "read?";
          h4.textContent = `${Object.values(element)[index] == true ? "yes" : "no"}`;
          break;
      }
    }
  });
}

// new book form display
function displayNewBookForm() {
  newBookForm = document.getElementById("new-book-form");
  if (newBookForm.classList.contains("new-book-form-hidden")) {
    newBookForm.classList.remove("new-book-form-hidden");  
    newBookForm.classList.add("new-book-form");
  } else if (newBookForm.classList.contains("new-book-form")) {
    newBookForm.classList.remove("new-book-form");  
    newBookForm.classList.add("new-book-form-hidden");
  }
}

// event listeners

// show 'add new book' form
var newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", displayNewBookForm);

// submit 'add new book' form
const submitNewBook = document.getElementById("newBookForm");
submitNewBook.onsubmit = function(e) {
  e.preventDefault();
  addBookToLibrary(new Book(submitNewBook.name.value, submitNewBook.author.value, submitNewBook.pages.value, submitNewBook.isRead.value));
  console.log(submitNewBook.name.value);
  displayNewBookForm();
  displayBooks();
};

// main
addBookToLibrary(new Book("Hobbit", "J. R. R. Tolkien", 323, true));
addBookToLibrary(new Book("Harry Potter", "J. K. Rowling", 563, false));
addBookToLibrary(new Book("Homo Sapiens", "Yuval N. Harari", 401, true));
addBookToLibrary(new Book("Communist Manifesto", "Karl Marx", 225, false));
addBookToLibrary(new Book("Basics of Economics", "Thomas Sowell", 539, true));

displayBooks();
