/* eslint-disable */ 
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read) { 
        this.read="Read";
    }
    else {
        this.read = "Not-Read";
    }
    this.info = function() {
        let s = `${this.title} by ${this.author}, ${this.pages} pages, `;
        if (this.read == 'on') s += "read";
        else s+= "not read yet";
        return s;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

const cardContainer = document.querySelector('.card-container');

function displayBooks() {
    let count = myLibrary.length;
    let book = myLibrary[myLibrary.length-1];
    let card = document.createElement('div');
    let tmp = `<p id="book-title">${book.title}</p><p id="book-author">${book.author}</p><p id="book-pages">${book.pages}</p><button id="d${count}" class="${book.read} book-read">${book.read}</button><button class="remove" id="c${count}">Remove</button>`;
    card.innerHTML = tmp;
    card.classList.add('card');
    card.setAttribute('data',"c"+count);
    card.setAttribute('data-read',"d"+count);
    cardContainer.appendChild(card);

    activateRemoveButton(count);
    activateReadButton(count);
}

function activateRemoveButton(count) {
    let removeBtn = document.querySelector(`#c${count}`);
    removeBtn.addEventListener('click', (e) => {
        let card = document.querySelector(`[data="${e.target.id}"]`);
        cardContainer.removeChild(card);
        let index = e.target.id.slice(1);
        myLibary = myLibrary.splice(index, 1);
    });
}

function activateReadButton(count) {
    let readBtn = document.querySelector(`#d${count}`);
    readBtn.addEventListener('click', (e) => {
        readBtn.classList.toggle('Read');
        readBtn.classList.toggle('Not-Read');

        let index = e.target.id.slice(1);
        let book = myLibrary[index-1];
        let status = book.changeReadStatus();

        readBtn.textContent = status;
    });

}

Book.prototype.changeReadStatus = function() {
    if (this.read === "Read") {
        this.read = "Not-Read";
    }
    else {
        this.read = "Read";
    }
    return this.read;
}

const background = document.querySelector('.background');
const formContainer = document.querySelector('.form-container');
const addBookBtn = document.querySelector('#add-book');

addBookBtn.addEventListener('click', () => {
    background.classList.remove('inactive');
    formContainer.classList.remove('inactive');;
});

background.addEventListener('click', () => {
    background.classList.add('inactive');
    formContainer.classList.add('inactive');
});

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let submitTitle = document.querySelector('#title').value;
    let submitAuthor = document.querySelector('#author').value;
    let submitPages = document.querySelector('#pages').value;
    let submitRead = document.querySelector('#read').checked;
    addBookToLibrary(submitTitle, submitAuthor, submitPages, submitRead);
    background.classList.add('inactive');
    formContainer.classList.add('inactive');
    form.reset();
})