import * as hui from './handlingUserInput';
import * as generator from './domTools';
import listBuilder from './listBuilder';

const todoItemGenerator = (currentProject) => {
  const mainContainer = generator.htmlGenerator('div', 'todo-form-container');
  const form = generator.htmlGenerator('form', 'todo-item-form');
  const inputContainer = generator.htmlGenerator('div', 'todo-input-container');
  for (let i = 0; i < 4; i++) {
    const inputLabel = generator.htmlGenerator('label', 'todo-label-input');
    inputContainer.append(inputLabel);
  }
  const btnText = generator.textGenerator('p', 'Create Task');
  const btnTextP = generator.textGenerator('p', 'Create Project');
  const btn = generator.htmlGenerator('button', 'todo-submit-btn', 'todoSubmitBtn');
  const btnP = generator.htmlGenerator('button', 'project-create-btn', 'projectCreateBtn');
  btn.setAttribute('type', 'button');
  btnP.setAttribute('type', 'button');
  btn.appendChild(btnText);
  btnP.appendChild(btnTextP);
  btn.addEventListener('click', () => {
    listBuilder(currentProject, mainContainer);
  });
  btnP.addEventListener('click', () => {
    hui.addNewProject();
    generator.reload();
  });

  form.append(inputContainer, btn, btnP);
  mainContainer.appendChild(form);
  return mainContainer;
};

export default todoItemGenerator;