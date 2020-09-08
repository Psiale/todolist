import newTodoListItem from './classes/todoListItem';
import { saveItem, retrieveItem } from './saveListObject';

const eventHandler = () => {
  const element = document.getElementById('projectTitleInput');
  return element.value;
};


const projectTitleHandler = () => {
  const newProject = newTodoListItem(document.getElementById('projectTitleInput').value);
  console.log(newProject);
  saveItem('project', JSON.stringify(newProject));
};

const itemHandler = () => {
  const project = Array.from(retrieveItem("project"));
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));
  project.push(tasks);
  // eslint-disable-next-line max-len
  //const todoItem = newTodoListItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value);
  saveItem("project", JSON.stringify(project));
  console.log(project);
};

export { eventHandler, itemHandler, projectTitleHandler };