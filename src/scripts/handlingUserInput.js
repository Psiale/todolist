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
  const focusedID = document.querySelector(':focus').id.split('').reverse().slice(0, 1).join('');
  console.log(document.getElementById(`projectTask${listLength}`));
  const inputValue = document.getElementById(`projectTask${listLength}`).value;
  project.items.push(todoItem(inputValue));
  saveItem('project', project);
  const button = document.getElementById(`projectTaskSubmit${focusedID}`);
  button.removeEventListener('click', saveTask);
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
  console.log('HERE I AM MOTHERFUCKER');
  const project = retrieveItem('project');
  let task; let taskId; const input = document.querySelector(':focus');
  if (input.type === 'input') {
    if (input.placeHolder === '') return;
    task = input.value; taskId = input.id.split('').reverse().slice(0, 1).join('');
    project.items[taskId] = task;
    saveItem('project', project);
    console.log(input);
  }
};


export { createNewProject, saveProject, itemHandler, saveTask };