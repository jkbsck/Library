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
  myLibrary.forEach(element => {
    console.log(booksList);
    book = document.createElement("div");
    book.classList.add("book");
    booksList.appendChild(book);
    console.log(element.values);
    book.textContent = Object.values(element);
  });
}

addBookToLibrary(new Book("Hobbit", "J. R. R. Tolkien", 323, true));
addBookToLibrary(new Book("Harry Potter", "J. K. Rowling", 563, false));
addBookToLibrary(new Book("Homo Sapiens", "Yuval N. Harari", 401, true));
addBookToLibrary(new Book("Communist Manifesto", "Karl Marx", 225, true));

displayBooks();
