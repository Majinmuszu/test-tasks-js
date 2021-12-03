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
  evenColumn.innerHTML = evenNumbers.map((num) => `<li>${num}</li>`).join("");
  oddColumn.innerHTML = oddNumbers.map((num) => `<li>${num}</li>`).join("");
};

const sortNumbers = () => {
  randomNumbers
    .sort((a, b) => a - b)
    .forEach((num) => {
      if (num % 2 === 0) {
        evenNumbers.push(num);
      } else {
        oddNumbers.push(num);
      }
    });
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
