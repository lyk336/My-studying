const emptyList = document.getElementById('empty-list');
const nameInputElement = document.getElementById('product__name');
const countInputElement = document.getElementById('product__count');
const addButton = document.getElementById('product__add');
const lineWithInput = document.querySelector('.input-line');
const paper = document.querySelector('main');
const productList = document.querySelector('.list');
const list = [];
const listCount = [];

let linesOnPage = 7;
let windowHeight = innerHeight;
let previousWindowSize;

productList.innerHTML = JSON.parse(localStorage.getItem('product list'));
fillWithEmptyLines();
addEventListener('resize', (event) => {
  previousWindowSize = windowHeight;
  windowHeight = innerHeight;
  emptyLinesAdjusting();
  linesOnPage =
    document.querySelectorAll('.empty-list__item').length +
    document.querySelectorAll('.list__item').length;
});

function emptyLinesAdjusting() {
  const emptyItem = document.querySelector('.empty-list__item');
  if (
    windowHeight < previousWindowSize &&
    document.querySelectorAll('.empty-list__item').length +
      document.querySelectorAll('.list__item').length >
      7
  ) {
    while (
      windowHeight < previousWindowSize &&
      paper.offsetHeight > innerHeight - (innerHeight * 20) / 100
    ) {
      document.querySelector('.empty-list__item').remove();
    }
  } else if (windowHeight > previousWindowSize) {
    fillWithEmptyLines();
  }
}

function fillWithEmptyLines() {
  while (paper.offsetHeight <= innerHeight - (innerHeight * 20) / 100) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-list__item';
    emptyList.appendChild(emptyItem);
    linesOnPage =
      document.querySelectorAll('.empty-list__item').length +
      document.querySelectorAll('.list__item').length;
  }
}

function addToList() {
  if (!nameInputElement.value) {
    return;
  }
  list.push(nameInputElement.value);
  listCount.push(countInputElement.value || 1);

  // adding name of poduct
  renderList();

  // deleting empty line
  if (document.querySelectorAll('.empty-list__item').length === 1) {
    emptyList.remove();
  } else if (document.querySelector('.empty-list__item')) {
    document.querySelector('.empty-list__item').remove();
  }

  nameInputElement.value = '';
  countInputElement.value = '';
}

function renderList() {
  let listHTML = '';

  for (let i = 0; i < list.length; i++) {
    const newElement = `
    <li class="list__item item-number${i}">
    <h2>${list[i]}</h2>
    <div class="product__count">
      <button class="product__plus"
      onclick="
        const currentCount = document.querySelector('.item-number${i}').querySelector('.current-count');
        Number(currentCount.innerText) >= ${listCount[i]} ? currentCount.innerText = ${listCount[i]} : currentCount.innerText = Number(currentCount.innerText) + 1;
        if(Number(currentCount.innerText) === ${listCount[i]}) {
          document.querySelector('.item-number${i}').querySelector('h2').classList.add('crossed-out')
        }
        ">+</button>
      <p>
        <span class="current-count">0</span>/${listCount[i]}
      </p>
      <button class="product__minus" onclick="
        const currentCount = document.querySelector('.item-number${i}').querySelector('.current-count');
        Number(currentCount.innerText) <= 0 ? currentCount.innerText = 0 : currentCount.innerText = Number(currentCount.innerText) - 1;
        if (Number(currentCount.innerText) < ${listCount[i]} && document.querySelector('.item-number${i}').querySelector('h2').classList.contains('crossed-out')){
          document.querySelector('.item-number${i}').querySelector('h2').classList.remove('crossed-out')
        }
        ">-</button>
    </div>
    <button class="product__delete" onclick="
      list.splice(${i}, 1);
      listCount.splice(${i}, 1);
      renderList();
      fillWithEmptyLines();
    ">delete</button>
    </li>
    `;
    listHTML += newElement;
  }
  productList.innerHTML = listHTML;
  localStorage.setItem('product list', JSON.stringify(productList.innerHTML));
}

addButton.addEventListener('click', () => {
  addToList();
});
nameInputElement.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addToList();
  }
});
