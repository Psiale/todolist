import * as generator from './domTools';
import { saveItem, retrieveItem } from './localStorage';
import { createNewProject, editProjectTitle, saveProject } from './handlingUserInput';
import { todoList } from './classes/todoListItem';

const mainContainer = generator.htmlGenerator('div', 'todo-list-tasks', 'todoListTasks');

const todoListMainContainer = () => {
  const todoListMainContainer = generator.htmlGenerator('div', 'todo-list-main-container', 'todoListMainContainer');

  const projectGenerator = () => {
    const project = createNewProject();
    const mainContainer = generator.htmlGenerator('div', 'project-form-container');

    const form = generator.htmlGenerator('form', 'edit-project-title-container', 'editProjectTitleContainer');
    const inputContainer = generator.htmlGenerator('div', 'project-input-container');
    const inputLabel = generator.htmlGenerator('label', 'project-label-input');
    const inputElement = generator.htmlGenerator('input', 'project-title-input', 'projectTitleInput');
    inputElement.placeholder = `${project.projectTitle}`;

    const listContainer = generator.htmlGenerator('div', 'project-item-container', 'projectItemContainer');
    const btnText = generator.textGenerator('p', 'Save');
    const btn = generator.htmlGenerator('button', 'project-submit-btn', 'projectSubmitBtn');

    btn.appendChild(btnText);
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', saveProject);

    inputContainer.append(inputLabel, inputElement);
    form.append(inputContainer, listContainer, btn);
    mainContainer.appendChild(form);
    return mainContainer;
  };

  // const todoListTasks = () => {
  //   const savedProject = retrieveItem('project');
  //   console.log(retrieveItem('project'));

  //   if (savedProject) {
  //     for (let i = 0; i < savedProject.items.length; i++) {
  //       const listItemContainer = generator.htmlGenerator('div', 'todo-list-item-container');
  //       const listItemTitle = generator.textGenerator('p', `${savedProject.items[i].title}`);
  //       const listItemEditButtonText = generator.textGenerator('p', '<i class="fas fa-edit"></i>');
  //       const listItemEditButton = generator.htmlGenerator('button', 'list-item-edit-button');
  //       const listItemDeleteButtonText = generator.textGenerator('p', '<i class="fas fa-times"></i>');
  //       const listItemDeleteButton = generator.htmlGenerator('button', 'list-item-delete-button');
  //       listItemEditButton.appendChild(listItemEditButtonText);
  //       listItemDeleteButton.appendChild(listItemDeleteButtonText);
  //       listItemContainer.append(listItemTitle, listItemEditButton, listItemDeleteButton);
  //       mainContainer.appendChild(listItemContainer);
  //     }
  //   }
  //   return mainContainer;
  // };

  const todoItemGenerator = () => {
    const mainContainer = generator.htmlGenerator('div', 'todo-form-container');
    const formTitle = generator.textGenerator('h2', 'Add A New Task');
    const form = generator.htmlGenerator('form', 'todo-item-form');
    const inputContainer = generator.htmlGenerator('div', 'todo-input-container');
    for (let i = 0; i < 4; i++) {
      const inputLabel = generator.htmlGenerator('label', 'todo-label-input');
      const inputElement = generator.htmlGenerator('input', 'todo-input-value');
      inputContainer.append(inputLabel, inputElement);
    }
    const btnText = generator.textGenerator('p', 'Create Task');
    const btn = generator.htmlGenerator('button', 'todo-submit-btn', 'todoSubmitBtn');
    btn.setAttribute('type', 'button');
    btn.appendChild(btnText);
    // btn.addEventListener('click', itemHandler);

    form.append(inputContainer, btn);
    mainContainer.append(formTitle, form);
    return mainContainer;
  };

  todoListMainContainer.append(projectGenerator(), todoItemGenerator());
  return todoListMainContainer;
};

export default todoListMainContainer;