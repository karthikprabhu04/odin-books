const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    addBookToLibrary(this);
}


function addBookToLibrary(book) {
  myLibrary.push(book)
}

// Display items on html page
new Book("title-1", "author-1", "10", "READ");
new Book("title-2", "author-2", "20", "NOT READ");
new Book("title-3", "author-3", "30", "NOT READ");

const list = document.querySelector(".list");

function renderLibrary() {
  list.innerHTML = "";
  myLibrary.forEach(book => {
    const item = document.createElement("li");
    item.textContent = `${book.title} ${book.author} ${book.pages} ${book.read} (${book.id})`;
    item.dataset.id = book.id;
    list.appendChild(item);

    // Remove button
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.addEventListener("click", (e) => {
      item.remove();
      e.target.remove();
      const index = myLibrary.findIndex(book => item.dataset.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    })
    list.appendChild(remove);

    // Toggle read button
    const read = document.createElement("button");
    read.textContent = "Toggle Read Status";
    read.addEventListener("click", () => {
      const index = myLibrary.findIndex(book => item.dataset.id === book.id);
      if (index !== -1) {
        myLibrary[index].read = myLibrary[index].read === "READ" ? "NOT READ" : "READ";
        renderLibrary();
      }
    })
    list.appendChild(read)
  });
}

renderLibrary();

// Add New Book button
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

  const formdata = new FormData(bookForm);
  const title = formdata.get("title");
  const author = formdata.get("author");
  const pages = formdata.get("pages");
  const read = formdata.get("read") ? "READ" : "NOT READ";

  new Book(title, author, pages, read)
  renderLibrary();

  bookForm.reset();
  dialog.close()
});