import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem } from './localStorage';
import { generateID, reload } from './domTools';

const placeholderProject = todoList('New Project');
let projectArr = [];
if (retrieveItem('project')) {
  if (retrieveItem('project').length > 0) projectArr = retrieveItem('project');
}

const addNewProject = () => {
  if (retrieveItem('project') && retrieveItem('project').length > 0) {
    const currentProject = todoList('New Project');
    currentProject.id = retrieveItem('project').length;
    saveItem('requested-project', currentProject);
    saveItem('lastEdited', currentProject);
    return currentProject;
  }
  const firstProject = placeholderProject;
  firstProject.id = 0;
  return firstProject;
};

const retrieveProject = (indx) => {
  if (!retrieveItem('project') || !retrieveItem('project')[indx]) {
    return placeholderProject;
  }
  return retrieveItem('project')[indx];
};

const getIdFromProject = (i) => {
  saveItem('requested-project', retrieveItem('project')[i]);
};

const renderProject = () => {
  let count;
  if (retrieveItem('project') && retrieveItem('project').length > 0) {
    count = retrieveItem('project').length;
    return count;
  }
  count = 0;
  return count;
};

const renderTodoListToDom = () => {
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  placeholderProject.projectTitle = newProjectTitle;
  projectArr.push(placeholderProject);
  saveItem('project', projectArr);
  const todoListArr = retrieveItem('project');
  return todoListArr;
};

const saveProject = () => {
  let newProjectTitle;
  if (document.getElementById('projectTitleInput').value !== '') {
    newProjectTitle = document.getElementById('projectTitleInput').value;
  } else {
    return;
  }
  if (retrieveItem('project') && retrieveItem('project').length > 0) {
    projectArr = retrieveItem('project');
    const project = retrieveItem('requested-project');
    const projectID = project.id;
    project.projectTitle = newProjectTitle;
    if (projectID > project.length - 1) {
      projectArr.push(project);
    } else {
      projectArr[projectID] = project;
    }
    saveItem('project', projectArr);
    saveItem('requested-project', project);
    saveItem('lastEdited', project);
  } else {
    placeholderProject.projectTitle = newProjectTitle;
    placeholderProject.id = 0;
    projectArr.push(placeholderProject);
    saveItem('project', projectArr);
    saveItem('requested-project', placeholderProject);
    saveItem('lastEdited', placeholderProject);
  }
  reload();
};

const saveTask = () => {
  const allProjects = retrieveItem('project');
  if (!retrieveItem('requested-project')) {
    const initialRequestedProject = allProjects[0];
    saveItem('requested-project', initialRequestedProject);
  }
  const project = retrieveItem('requested-project');
  const projectID = project.id;
  const listLength = project.items.length;
  if (document.getElementById(`projectTask${listLength}`).value === '') return;
  const inputValue = document.getElementById(`projectTask${listLength}`).value;
  project.items.push(todoItem(inputValue));
  allProjects[projectID] = project;
  saveItem('project', allProjects);
  saveItem('lastEdited', project);
  saveItem('requested-project', project);
  reload();
};

const itemHandler = () => {
  const itemArray = [];
  const project = retrieveItem('project');
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));
  project.items.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  itemArray.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  saveItem('itemArray', itemArray);
  saveItem('project', project);
  reload();
};


const editTask = () => {
  const allProjects = retrieveItem('project');
  const project = retrieveItem('requested-project');
  const projectID = project.id;
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
  allProjects[projectID] = project;
  saveItem('project', allProjects);
  saveItem('lastEdited', project);
  saveItem('requested-project', project);
  reload();
};

const settingPriority = () => {
  let number;
  const allProjects = retrieveItem('project');
  const project = retrieveItem('requested-project');
  const projectID = project.id;
  const focusElement = document.querySelector(':focus');
  const focusContainerID = generateID(focusElement.parentNode);
  if (focusElement.firstChild.dataset.prefix === 'far') {
    project.items[focusContainerID].priority = 0;
    allProjects[projectID] = project;
    saveItem('project', allProjects);
    saveItem('requested-project', project);
    saveItem('lastEdited', project);
    number = 0;
  } else {
    project.items[focusContainerID].priority = 1;
    allProjects[projectID] = project;
    saveItem('project', allProjects);
    saveItem('requested-project', project);
    saveItem('lastEdited', project);
    number = 1;
  }
  return number;
};

const obliterateTask = () => {
  const allProjects = retrieveItem('project');
  const project = retrieveItem('requested-project');
  const projectID = project.id;
  const focusElement = document.querySelector(':focus');
  const inputElement = focusElement.parentNode.firstChild;
  const inputValue = inputElement.placeholder;
  const result = project.items.filter((element) => element.title !== `${inputValue}`);

  if (project.items) { project.items = result; }
  allProjects[projectID] = project;
  saveItem('project', allProjects);
  saveItem('requested-project', project);
  saveItem('lastEdited', project);
  reload();
};

const obliterateProject = (id) => {
  const projects = retrieveItem('project');
  projects.splice(id, 1);
  saveItem('project', projects);
};

const setTaskProperty = (string, id, property) => {
  const allProjects = retrieveItem('project');
  const savedProject = retrieveItem('requested-project');
  let dropState = retrieveItem('dropdownState');
  const projectID = savedProject.id;
  const dateInputElement = document.getElementById(`${string + id}`);
  let dateTask;
  if (dateInputElement.value !== '') {
    dateTask = dateInputElement.value;
  } else {
    return;
  }
  savedProject.items[id][property] = dateTask;
  allProjects[projectID] = savedProject;
  dropState = [false, id];
  saveItem('dropdownState', dropState);
  saveItem('project', allProjects);
  saveItem('requested-project', savedProject);
  saveItem('lastEdited', savedProject);
  reload();
};

const getTaskProperty = (id, property) => {
  const savedProject = retrieveItem('requested-project');
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
  obliterateProject,
  settingPriority, setTaskProperty, getTaskProperty,
  renderTodoListToDom, projectArr, getIdFromProject, addNewProject,
};