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
};

const editProjectTitle = (string) => {
  obliterateItem(string);
  const newProject = todoList(document.getElementById('projectTitleInput').value);
  saveItem(string, newProject);
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
//
//const editProjectTitleHandler = () => {
//  const projectTitleField = document.getElementById('projectTitleInput')
//  const newProjectTitle = document.getElementById('projectTitleInput').value;
//  const btn = document.getElementById('project-submit-btn');
//  btn.addEventListener('click', () => {
//    const currentProject = retrieveItem('project');
//    currentProject.projectTitle = newProjectTitle;
//    saveItem('project', currentProject);
//    projectTitleField.placeholder = newProjectTitle;
//    console.log(retrieveItem('project'));
//  })
//};

export { createNewProject, editProjectTitle, saveProject, itemHandler };