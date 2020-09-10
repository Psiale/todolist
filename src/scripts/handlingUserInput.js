import { todoItem, todoList } from './classes/todoListItem';
import { saveItem, retrieveItem } from './localStorage';

const projectTitleHandler = () => {
  const newProject = todoList(document.getElementById('projectTitleInput').value);
  saveItem('project', newProject);
};

const itemHandler = () => {
  const project = retrieveItem('project');
  const tasks = Array.from(document.querySelectorAll('.todo-input-value'));
  project.items.push(todoItem(tasks[0].value, tasks[1].value, tasks[2].value, tasks[3].value));
  saveItem('project', project);
  location.reload();
};

const editProjectTitleHandler = () => {
  const projectTitleField = document.getElementById('projectTitleInput')
  const newProjectTitle = document.getElementById('projectTitleInput').value;
  const btn = document.getElementById('project-submit-btn');
  btn.addEventListener('click', () => {
    const currentProject = retrieveItem('project');
    currentProject.projectTitle = newProjectTitle;
    saveItem('project', currentProject);
    projectTitleField.placeholder = newProjectTitle;
    console.log(retrieveItem('project'));
  })
};

export { itemHandler, projectTitleHandler };