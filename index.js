const btn = document.querySelector('.button');
const list = document.querySelector('.list');
const data = JSON.parse(localStorage.getItem('todoData')) || [];

btn.addEventListener('click', addList, false);
list.addEventListener('click', deleteList, false);

updateList();

function addList() {
  const text = document.querySelector('#text').value;
  const todo = {
    content: text
  }
  if (text === '' || text.trim().length === 0) {
    alert('請輸入內容...');
  }else {
    data.push(todo);
    updateList();
    localStorage.setItem('todoData', JSON.stringify(data));
  }
  // clear text
  const textElement = document.querySelector('#text');
  textElement.value = '';
}

function updateList() {
  let str = '';
  for (let i = 0; i < data.length; i++) {
    str +=
      '<li><a href="#" class="delete" data-num=' + i + '> Ｘ </a><span>' + data[i].content + '</span></li>'
  }
  list.innerHTML = str;
}

function deleteList(event) {
  const obtainEvent = window.event || event;
  const self = obtainEvent.target || obtainEvent.srcElement;
  const num = self.dataset.num;
  if (self.nodeName !== 'A') {
    return;
  }
  data.splice(num, 1);
  localStorage.setItem('todoData', JSON.stringify(data));
  updateList();
}

// enter event
document.body.addEventListener('keydown', function (event) {
  const obtainEvent = window.event || event;
  if (obtainEvent.keyCode == 13) {
    addList();
  }
}, false);
