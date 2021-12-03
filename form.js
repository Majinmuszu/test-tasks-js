const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => document.querySelectorAll(sel);
const log = (any) => console.log(any);
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const booksForm = document.forms.namedItem("books-form");
const booksList = qs(".books-list");

const BOOKS_KEY = "BOOKS_LIST";

let books = load(BOOKS_KEY) === undefined ? [] : load(BOOKS_KEY);
let currentBookId = books.length > 0 ? books.length : null;

const renderBooks = () => {
  booksList.innerHTML = "";
  books.forEach(({ id, title, author, priority, category }) => {
    booksList.innerHTML += `
    <li class="list-item ${id}">
        <ul>
            <li>Tytuł: ${title}</li>
            <li>Autor: ${author}</li>
            <li>Priorytet czytania: ${priority}</li>
            <li>Kategoria: ${category}</li>
            <button id="${id}" class="delete-button">USUŃ WPIS</button>
        </ul>
    </li>
    `;
  });
};

const pushBooksToArray = () => {
  currentBookId += 1;
  books.push({
    id: currentBookId,
    title: `${booksForm.elements[0].value}`,
    author: `${booksForm.elements[1].value}`,
    priority: `${booksForm.elements[2].value}`,
    category: `${booksForm.elements[3].value}`,
  });
  save(BOOKS_KEY, books);
  
};

booksForm.onsubmit = (e) => {
  e.preventDefault();
  pushBooksToArray();
  log(books);
  renderBooks();
  booksForm.reset();
};

const removeBookFromList = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else {
    e.target.parentNode.parentNode.remove();
    let newBooks = books.filter((book) => book.id !== e.target.id);
    books = newBooks;
    save(BOOKS_KEY, books);
    log(books);
  }
};
booksList.addEventListener("click", removeBookFromList);
renderBooks();
