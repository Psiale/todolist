import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem, obliterateItem } from './localStorage';

const placeholderProject = todoList('New project');

const createNewProject = () => {
  if (!retrieveItem('project')) return placeholderProject;
  return retrieveItem('project');
};

const saveProject = () => {
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  placeholderProject.projectTitle = newProjectTitle;
  if (retrieveItem('project')) {
    placeholderProject.items = retrieveItem('project').items;
  }
  saveItem('project', placeholderProject);
  console.log(retrieveItem('project'));
  location.reload();
};

const saveTask = () => {
  const project = retrieveItem('project');
  const listLength = project.items.length;
  const focusElement = document.querySelector(':focus');
  const focusedID = focusElement.id.split('').reverse().slice(0, 1).join('');
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

const editTask = () => {
  const focusElement = document.querySelector(':focus');
  console.log('HERE I AM MOTHERFUCKER');
  const project = retrieveItem('project');
  let task; let taskId; const input = document.querySelector(':focus');
  if (input.type === 'input') {
    if (input.placeholder === '') return;
    task = input.value; taskId = input.id.split('').reverse().slice(0, 1).join('');
    project.items[taskId] = task;
    saveItem('project', project);
    console.log(input);
  }
};

export { createNewProject, saveProject, itemHandler, saveTask, editTask };