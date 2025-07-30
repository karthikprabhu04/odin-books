// Create Library class
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBookById(id) {
    this.books = this.books.filter(book => book.id !== id)
  }

}

// Create Book class
class Book {
  constructor(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }

  toggleRead() {
    this.read = this.read === "READ" ? "NOT READ" : "READ";
  }
}

// Create library interface
class LibraryUI {
  constructor(library) {
    this.library = library;
  }

  render() {
    const list = document.querySelector(".list");
    list.innerHTML="";

    this.library.books.forEach(book => {
      const item = document.createElement("tr");
      item.dataset.id = book.id;

      item.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td>${book.id}</td>
        <td class="actions"></td>
      `;

      const actionsCell = item.querySelector("td.actions");

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        this.library.removeBookById(book.id);
        this.render();
      })
      actionsCell.appendChild(removeBtn);

      // Toggle button
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "Toggle Read Status";
      toggleBtn.addEventListener("click", () => {
        book.toggleRead();
        this.render();
      })
      actionsCell.appendChild(toggleBtn)

      list.appendChild(item);
    })
  }
}

// Add New Book button
class BookFormUI {
  constructor(library, ui) {
    this.library = library;
    this.ui = ui;

    this.initListeners();
  }

  initListeners() {
    const addBook = document.querySelector("#add-book");
    const dialog = document.querySelector("#dialog");
    const bookForm = document.querySelector("#book-form");
    const cancel = document.querySelector("#cancel");
    
    addBook.addEventListener("click", () => {
      dialog.showModal();
    });
    
    cancel.addEventListener("click", () => {
      dialog.close()
    });
    
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    })
  }
  
  handleSubmit() {
    const dialog = document.querySelector("#dialog");
    const bookForm = document.querySelector("#book-form");

    const formdata = new FormData(bookForm);
    const title = formdata.get("title");
    const author = formdata.get("author");
    const pages = formdata.get("pages");
    const read = formdata.get("read") ? "READ" : "NOT READ";

    const newBook = new Book(title, author, pages, read);
    this.library.addBook(newBook);
    this.ui.render();

    bookForm.reset();
    dialog.close();
  }
}


// Add books to library
const myLibrary = new Library();
const ui = new LibraryUI(myLibrary);
const formUI = new BookFormUI(myLibrary, ui);

myLibrary.addBook(new Book("The Alchemist", "Paulo Coelho", "208", "READ"));
myLibrary.addBook(new Book("The Lean Startup", "Eric Ries", "336", "READ"));
myLibrary.addBook(new Book("Zero to One", "Peter Thiel", "224", "NOT READ"));

ui.render();