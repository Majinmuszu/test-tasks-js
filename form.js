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
const booksTable = qs(".table-body");
const priorityValue = qs(".priority-value");
const priorityInput = qs("#priority");

const BOOKS_KEY = "BOOKS_LIST";

let books = load(BOOKS_KEY) === undefined ? [] : load(BOOKS_KEY);
let currentBookId = books.length > 0 ? books[books.length - 1].id : null;
const renderBooks = () => {
  booksTable.innerHTML = "";
  books.forEach(({ id, title, author, priority, category }) => {
    booksTable.innerHTML += `
    <tr class="table-row ${id}">
            <td class="table-draw">${title}</td>
            <td class="table-draw">${author}</td>
            <td class="table-draw">${priority}</td>
            <td class="table-draw">${category}</td>
            <td class="table-draw"><button id="${id}" class="delete-button">USUŃ WPIS</button></td>
    </tr>
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
  renderBooks();
  booksForm.reset();
  priorityValue.innerHTML = "1";
};
renderBooks();

const removeBookFromList = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "BUTTON") {
    return;
  } else {
    let newBooks = books.filter((book) => book.id != e.target.id);
    e.target.parentNode.parentNode.remove();
    save(BOOKS_KEY, newBooks);
    books = newBooks;
  }
};
const updatePriorityValue = (e) => {
  log("dupa");
  priorityValue.innerHTML = `${priorityInput.value}`;
};
booksTable.addEventListener("click", removeBookFromList);
priorityInput.addEventListener("input", updatePriorityValue);
