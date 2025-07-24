function Books(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status
    this.info = () => {
        return this.title + " by " + this.author + ", " + this.pages + ", " + this.status;
    }
}

theHobbit = new Books("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet")
console.log(theHobbit.info())