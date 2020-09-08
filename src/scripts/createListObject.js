import * as generator from './domManipulation';
import { eventHandler, itemHandler } from './handlingUserInput';

const projectGenerator = () => {
  const mainContainer = generator.htmlGenerator('div', 'project-form-container');
  const formTitle = generator.textGenerator('h2', 'Create A New Project');
  const form = generator.htmlGenerator('form', 'project-form');
  const inputContainer = generator.htmlGenerator('div', 'project-input-container');
  const inputLabel = generator.htmlGenerator('label', 'project-label-input');
  const inputElement = generator.htmlGenerator('input', 'project-title-input', 'projectTitleInput');
  const listContainer = generator.htmlGenerator('div', 'project-item-container', 'projectItemContainer');
  const btnText = generator.textGenerator('p', 'Create Project');
  const btn = generator.htmlGenerator('button', 'project-submit-btn', 'projectSubmitBtn');
  btn.appendChild(btnText);
  btn.setAttribute('type', 'button');
  btn.addEventListener('click', eventHandler);

  inputContainer.append(inputLabel, inputElement);
  form.append(inputContainer, listContainer, btn);
  mainContainer.append(formTitle, form);
  return mainContainer;
};

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
  btn.addEventListener('click', itemHandler);

  form.append(inputContainer, btn);
  mainContainer.append(formTitle, form);
  return mainContainer;
};

export { projectGenerator, todoItemGenerator };