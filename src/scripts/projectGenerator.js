import * as generator from './domTools';
import * as hui from './handlingUserInput';

const projectGenerator = (currentProject) => {
  const mainContainer = generator.htmlGenerator('div', 'project-form-container');
  const form = generator.htmlGenerator('form', 'edit-project-title-container', 'editProjectTitleContainer');
  const inputContainer = generator.htmlGenerator('div', 'project-input-container');
  const inputLabel = generator.htmlGenerator('label', 'project-label-input');
  const inputElement = generator.htmlGenerator('input', 'project-title-input', 'projectTitleInput');

  inputElement.placeholder = `${currentProject.projectTitle}`;

  const listContainer = generator.htmlGenerator('div', 'project-item-container', 'projectItemContainer');
  const btnText = generator.textGenerator('p', 'Save<br>Project');
  const btn = generator.htmlGenerator('button', 'project-submit-btn', 'projectSubmitBtn');

  btn.appendChild(btnText);
  btn.setAttribute('type', 'button');
  btn.addEventListener('click', hui.saveProject);

  generator.enterShortcut(btn, inputElement);

  inputContainer.append(inputLabel, inputElement);
  form.append(inputContainer, listContainer, btn);
  setTimeout(() => {
    mainContainer.appendChild(form);
  }, 1);
  return mainContainer;
};

export default projectGenerator;