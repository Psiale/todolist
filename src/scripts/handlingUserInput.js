import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem } from './localStorage';
import { generateID } from './domTools';

const placeholderProject = todoList('New Project');
// 1. Changed projectArr to be defined as an empty array or the projects array
let projectArr = [];
if (retrieveItem('project')) {
  if (retrieveItem('project').length > 0) projectArr = retrieveItem('project');
}

const renderProject = () => {
  let count = 0;
  if (retrieveItem('project')) { 
    if (retrieveItem('project').length > 0) {
      console.log(`I'm the bug, this is project ${retrieveItem('project')}`);
      count = retrieveItem('project').length - 1;
    }
  }
  // 2. added a console log to the count
  console.log(` ${count} `);
  return count;
};

const retrieveProject = (indx) => {
  if ( !retrieveItem('project') || !retrieveItem('project')[indx]) {
    return placeholderProject;
  }
  console.log(retrieveItem('project'));
  return retrieveItem('project')[indx];
};

const renderTodoListToDom = () => {
  const count = renderProject();
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  placeholderProject.projectTitle = newProjectTitle;
  projectArr.push(placeholderProject);
  // 3. after pushing the placeholder to the arr I saved the element into local storage
  saveItem('project', projectArr);
  const todoListArr = retrieveItem('project');
  return todoListArr;
}

const saveProject = () => {
  const count = renderProject();
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  placeholderProject.projectTitle = newProjectTitle;
  projectArr.push(placeholderProject);
  // 3. after pushing the placeholder to the arr I saved the element into local storage
  saveItem('project', projectArr);
  if (retrieveItem('project')[count]) {
    placeholderProject.items = retrieveItem('project')[count].items;
  }
  saveItem('project', projectArr);
  location.reload();
};

const saveTask = () => {
  // 4. Changed project declaration to acess a todoList item
  const project = retrieveItem('project')[renderProject()];
  const listLength = project.items.length;
  const focusElement = document.querySelector(':focus');
  const focusedID = generateID(focusElement);
  let inputValue;
  if (document.getElementById(`projectTask${listLength}`).value !== '') {
    inputValue = document.getElementById(`projectTask${listLength}`).value;
  } else {
    return;
  }
  project.items.push(todoItem(inputValue));
  console.log(project)
  saveItem('project', project);
  console.log(renderProject())
  //  location.reload();
  console.log(retrieveItem('project'));
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
  let task;
  if (input.value !== '') { 
    task = input.value;
  } else {
    return;
  }
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
    project.items[focusContainerID].priority = 0;
    saveItem('project', project);
    number = 0;
  } else {
    project.items[focusContainerID].priority = 1;
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

  if (project.items) { project.items = result; }
  saveItem('project', project);
  console.log(project);
  location.reload();
};

const setTaskProperty = (string, id, property) => {
  const savedProject = retrieveItem('project');
  console.log(`${property + id}`);
  const dateInputElement = document.getElementById(`${string + id}`);
  const project = savedProject.items[id];
  const dateTask = dateInputElement.value;
  project[property] = dateTask;
  saveItem('project', savedProject);
  console.log(savedProject);
  // location.reload();
};

const getTaskProperty = (id, property) => {
  // 5. Changed savedProject definition to retrieve a TodoList item
  const savedProject = retrieveProject(1);
  console.log(savedProject)
  if (id && savedProject.items[id]) {
    if (savedProject.items === []) {
      return 'Give your task a description';
    }
    return savedProject.items[id][property];
  }
};

export {
  retrieveProject, saveProject, renderProject,
  itemHandler, saveTask, editTask, obliterateTask,
  settingPriority, setTaskProperty, getTaskProperty, renderTodoListToDom, projectArr,
};