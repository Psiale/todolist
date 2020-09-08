import newTodoListItem from './classes/todoListItem';

const eventHandler = () => {
  const element = document.getElementById('projectTitleInput');
  return element.value;
};

const projectTitleHandler = () => {
  const newProject = newTodoListItem(document.getElementById('projectTitleInput').value);
  console.log(newProject);
  return newProject;
};

const itemHandler = () => {
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));
  // eslint-disable-next-line max-len
  const todoItem = newTodoListItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value);
  return todoItem;
};

export { eventHandler, itemHandler, projectTitleHandler };