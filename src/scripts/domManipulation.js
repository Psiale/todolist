import * as generator from './domTools';
import { retrieveItem, saveItem } from './localStorage';
import * as hui from './handlingUserInput';
import createSingleTask from './createSingleTask';
import todoListItemGenerator from './todoListItemGenerator';

const mainContainer = generator.htmlGenerator('div', 'todo-list-tasks', 'todoListTasks');

(function () {
  if (!retrieveItem('dropdownState')) {
    const dropState = [true, 999];
    saveItem('dropdownState', dropState);
  }
}());

let currentProject;
if (retrieveItem('project') && retrieveItem('project').length > 0) {
  currentProject = retrieveItem('requested-project');
} else {
  currentProject = hui.addNewProject();
}

const todoListMainContainer = () => {
  const todoListMainContainer = generator.htmlGenerator('div', 'todo-list-main-container', 'todoListMainContainer');

  const projectGenerator = () => {
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


  const todoListTasks = () => {
    if (currentProject) {
      for (let i = 0; i < currentProject.items.length; i++) {
        mainContainer.appendChild(createSingleTask(`${i}`, currentProject));
        setTimeout(() => {
          const inputField = document.getElementById(`projectTask${i}`);
          if (currentProject.items[i].title) {
            inputField.placeholder = `${currentProject.items[i].title}`;
          }
        }, 1);
      }
    }
    return mainContainer;
  };

  const listBuilder = () => {
    const listLength = currentProject.items.length;
    const listContainer = document.getElementById('todoListTasks');
    const domLength = listContainer.childNodes.length;
    if (currentProject) {
      if (listLength >= 0 && domLength <= listLength) {
        listContainer.appendChild(createSingleTask(listLength, currentProject));
      } else if (listLength >= 0 && domLength <= listLength + 1) {
        listContainer.innerHTML = '';
        todoListTasks();
        listContainer.appendChild(createSingleTask(listLength, currentProject));
      }
    }
  };

  const todoItemGenerator = () => {
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
    btn.addEventListener('click', listBuilder);
    btnP.addEventListener('click', () => {
      hui.addNewProject();
      generator.reload();
    });

    form.append(inputContainer, btn, btnP);
    mainContainer.appendChild(form);
    return mainContainer;
  };

  todoListMainContainer.append(projectGenerator(), todoListTasks(), todoItemGenerator());
  return todoListMainContainer;
};

const projectSelectorList = () => {
  const mainContainer = generator.htmlGenerator('div', 'project-selector-container', 'projectSelectorContainer');
  const backgroundContainer = generator.htmlGenerator('div', 'todoList-background-container');
  mainContainer.append(todoListItemGenerator(hui.projectArr), backgroundContainer);
  return mainContainer;
};

export { todoListMainContainer, projectSelectorList };