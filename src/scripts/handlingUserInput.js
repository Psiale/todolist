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
  const project = retrieveItem('project');
  let input;
  if (document.querySelector(':focus').type === 'submit') {
    input = document.querySelector(':focus').previousSibling;
  } else {
    input = document.querySelector(':focus');
  }
  const task = input.value;
  const taskId = input.id.split('').reverse().slice(0, 1).join('');
  project.items[taskId].title = task;
  saveItem('project', project);
  console.log(document.querySelector(':focus').type);
  location.reload();
};
const obliterateTask = () => {
  const project = retrieveItem('project');
  const id = document.querySelector(':focus').id.split('').reverse().slice(0, 1).join('');
  project.items.slice(id, id + 1);
  saveItem('project', project);
  console.log(project);
  // location.reload();
} 

export { createNewProject, saveProject, itemHandler, saveTask, editTask, obliterateTask };