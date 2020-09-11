import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem, obliterateItem } from './localStorage';

const placeHolderProject = todoList('New project');

const createNewProject = () => {
  if (!retrieveItem('project')) return placeHolderProject;
  return retrieveItem('project');
};

const saveProject = () => {
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  placeHolderProject.projectTitle = newProjectTitle;
  if (retrieveItem('project')) {
    placeHolderProject.items = retrieveItem('project').items;
  }
  saveItem('project', placeHolderProject);
  console.log(retrieveItem('project'));
  location.reload();
};

const saveTask = () => {
  const project = retrieveItem('project');
  const listLength = project.items.length;
  console.log(document.getElementById(`projectTask${listLength}`));
  const inputValue = document.getElementById(`projectTask${listLength}`).value;
  project.items.push(todoItem(inputValue));
  saveItem('project', project);
  location.reload();
};

const itemHandler = () => {
  const itemArray = [];
  const project = retrieveItem('project');
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));
  project.items.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  itemArray.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  saveItem('itemArray', itemArray);
  saveItem('project', project);
  location.reload();
};



export { createNewProject, saveProject, itemHandler, saveTask };