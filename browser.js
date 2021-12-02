const qs = (sel) => document.querySelector(sel);
const log = (any) => console.log(any);

const button = qs(".browser-button");
const evenColumn = qs(".even");
const oddColumn = qs(".odd");
let evenNumbers = [];
let oddNumbers = [];
let randomNumbers = [];

const renderNumbers = () => {
  evenColumn.innerHTML = "";
  oddColumn.innerHTML = "";
  evenNumbers.forEach((num) => {
    evenColumn.innerHTML = evenColumn.innerHTML + `<li>${num}</li>`;
  });
  oddNumbers.forEach((num) => {
    oddColumn.innerHTML = oddColumn.innerHTML + `<li>${num}</li>`;
  });
};

const sortNumbers = () => {
  randomNumbers.forEach((num) => {
    if (num % 2 === 0) {
      evenNumbers.push(num);
    } else {
      oddNumbers.push(num);
    }
  });
  evenNumbers.sort((a, b) => a - b);
  oddNumbers.sort((a, b) => a - b);
  renderNumbers();
};

const getRandomNumbers = () => {
  randomNumbers = [];
  evenNumbers = [];
  oddNumbers = [];
  for (let i = 0; i < 20; i++) {
    randomNumbers.push(Math.round(Math.random() * (100 - 1) + 1));
  }
  sortNumbers();
};

button.addEventListener("click", getRandomNumbers);
