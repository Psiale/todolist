import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem } from './localStorage';

const items = [];
const projectTitleHandler = () => {
  const newProject = todoList(document.getElementById('projectTitleInput').value);
  console.log(newProject);
  saveItem('project', newProject);
};

const itemHandler = () => {
  const project = retrieveItem("project");
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));

  project.items.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  // eslint-disable-next-line max-len
  //const todoItem = newTodoListItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value);
  saveItem('project', JSON.stringify(project));
  console.log(project);
  console.log(project.projectTitle);
};

export { itemHandler, projectTitleHandler };