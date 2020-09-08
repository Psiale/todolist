import TodoListItem from './classes/todoListItem';

const eventHandler = () => {
  const element = document.getElementById('projectTitleInput');
  return element.value;
};

const itemHandler = () => {
  const list = Array.from(document.querySelectorAll('.todo-input-value'));
  const todoItem = TodoListItem(list[0].value, list[1].value, list[2].value, list[3].value);
  return todoItem;
};

export { eventHandler, itemHandler };