import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem, obliterateItem } from './localStorage';
import { generateID } from './domTools';

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
  location.reload();
};

const saveTask = () => {
  const project = retrieveItem('project');
  const listLength = project.items.length;
  const focusElement = document.querySelector(':focus');
  const focusedID = generateID(focusElement)
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
  const project = retrieveItem('project');
  let input;
  if (document.querySelector(':focus').type === 'submit') {
    input = document.querySelector(':focus').previousSibling;
  } else {
    input = document.querySelector(':focus');
  }
  const task = input.value;
  const taskId = generateID(input);
  project.items[taskId].title = task;
  saveItem('project', project);
  console.log(document.querySelector(':focus').type);
  location.reload();
};

const settingPriority = () => {
  let number;
  const project = retrieveItem('project');
  const focusElement = document.querySelector(':focus');
  console.log(generateID(focusElement.parentNode));
  const focusContainerID = generateID(focusElement.parentNode);
  if (focusElement.firstChild.dataset.prefix === 'far') {
    project.items[focusContainerID].priority = 1;
    saveItem('project', project);
    number = 0;
  } else {
    project.items[focusContainerID].priority = 0;
    saveItem('project', project);
    number = 1;
  }
  return number;
};

const obliterateTask = () => {
  const project = retrieveItem('project');
  const focusElement = document.querySelector(':focus');
  const inputElement = focusElement.parentNode.firstChild;
  const inputValue = inputElement.placeholder;
  const result = project.items.filter((element) => element.title !== `${inputValue}`);

  project.items = result;
  saveItem('project', project);
  console.log(project);
  location.reload();
};

export { createNewProject, saveProject, itemHandler, saveTask, editTask, obliterateTask, settingPriority };