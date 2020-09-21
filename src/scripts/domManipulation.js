import * as generator from './domTools';
import { retrieveItem } from './localStorage';
import { setDate, getDate, hideShowDropdown } from './viewProjectTasks';
import {
  renderProject, saveProject, saveTask, editTask,
  obliterateTask, settingPriority, setTaskProperty, getTaskProperty,
} from './handlingUserInput';

const mainContainer = generator.htmlGenerator('div', 'todo-list-tasks', 'todoListTasks');

const todoListMainContainer = () => {
  const todoListMainContainer = generator.htmlGenerator('div', 'todo-list-main-container', 'todoListMainContainer');

  const projectGenerator = () => {
    const project = renderProject(0);
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

    generator.enterShortcut(btn, inputElement);

    inputContainer.append(inputLabel, inputElement);
    form.append(inputContainer, listContainer, btn);
    mainContainer.appendChild(form);
    return mainContainer;
  };

  const dropDownBuilder = (id) => {
    const container = generator.htmlGenerator('div', 'drop-container', `dropContainer${id}`);
    container.classList.add('hidden');
    container.classList.add('slide-in-bottom');

    const descriptionSection = () => {
      const descriptionContainer = generator.htmlGenerator('div', 'description-container', `descriptionContainer${id}`);
      const descriptionInput = generator.htmlGenerator('input', 'description-input', `descriptionInput${id}`);

      if (getTaskProperty(id, 'description')) {
        descriptionInput.placeholder = `${getTaskProperty(id, 'description')}`;
      } else {
        descriptionInput.placeholder = 'Give your task a description...';
      }

      const descriptionSubmit = generator.htmlGenerator('button', 'description-submit-button', `descriptionSubmitButton${id}`);
      const descriptionSubmitIcon = generator.textGenerator('i', '<i class="fas fa-save"></i>');
      descriptionSubmit.addEventListener('click', () => {
        setTaskProperty('descriptionInput', id, 'description');
        location.reload();
      });
      descriptionSubmit.classList.add('hidden');
      generator.enterShortcut(descriptionSubmit, descriptionInput);

      descriptionSubmit.appendChild(descriptionSubmitIcon);
      descriptionContainer.append(descriptionInput, descriptionSubmit);
      return descriptionContainer;
    };

    const dateSection = () => {
      const dateContainer = generator.htmlGenerator('div', 'date-container', `dateContainer${id}`);
      const dateInput = generator.htmlGenerator('input', 'date-input', `dateInput${id}`);
      dateInput.type = 'datetime-local';
      dateInput.setAttribute('min', '1066-01-01T00:00');
      dateInput.setAttribute('max', '2100-01-01T00:00');
      dateInput.classList.add('hidden');

      const dateDisplay = generator.htmlGenerator('input', 'date-display', `dateDisplay${id}`);
      dateDisplay.placeholder = getDate(id);
      dateDisplay.addEventListener('click', (event) => {
        event.preventDefault();
        generator.hideAndShow(dateDisplay, dateInput, dateBackButton);
      });

      const dateBackButton = generator.htmlGenerator('button', 'date-back-button', `dateBackButton${id}`);
      dateBackButton.innerHTML = 'Cancel';
      dateBackButton.addEventListener('click', (event) => {
        event.preventDefault();
        generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
      });
      dateBackButton.classList.add('hidden');

      const dateSubmit = generator.htmlGenerator('button', 'date-submit-button', `dateSubmitButton${id}`);
      const dateSubmitIcon = generator.textGenerator('i', '<i class="fas fa-stopwatch"></i>');
      dateSubmit.appendChild(dateSubmitIcon);
      dateSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        setDate(id);
        generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
        location.reload();
      });
      dateSubmit.classList.add('hidden');
      generator.enterShortcut(dateSubmit, dateInput);

      dateContainer.append(dateSubmit, dateInput, dateDisplay, dateBackButton);
      return dateContainer;
    };

    container.append(descriptionSection(), dateSection());
    return container;
  };

  const createSingleTask = (id) => {
    const savedProject = retrieveItem('project');
    const savedItems = retrieveItem('project').items;
    const savedItemsLength = savedItems.length;
    const simpleListItemContainer = generator.htmlGenerator('div', 'simple-list-item-container', `simpleListItemContainer${id}`);
    const listItemContainer = generator.htmlGenerator('div', 'todo-list-item-container', `listItemContainer${id}`);
    const listItemInputContainer = generator.htmlGenerator('input', 'project-task-input', `projectTask${id}`);
    const listItemSubmitButton = generator.htmlGenerator('button', 'project-task-submit', `projectTaskSubmit${id}`);
    const listItemDeleteButtonText = generator.textGenerator('p', '<i class="fas fa-times"></i>');
    const listItemDeleteButton = generator.htmlGenerator('button', 'list-item-delete-button', `projectTaskDelete${id}`);
    const listItemPriorityButton = generator.htmlGenerator('button', 'todo-list-item-button', `listItemButton${id}`);
    const listItemDownArrow = generator.htmlGenerator('button', 'list-item-down-arrow', `listItemDownArrow${id}`);
    const listItemDownArrowIcon = generator.textGenerator('p', '<i class="fas fa-sort-down"></i>');
    
    listItemDownArrow.appendChild(listItemDownArrowIcon);
    listItemPriorityButton.classList.add('list-item-priority');
    listItemDownArrow.addEventListener('click', () => {
      hideShowDropdown(id);
    });
    if (id && savedProject.items[id]) {
      setTimeout(() => {
        if (savedProject.items[id].priority === 0) {
          listItemPriorityButton.innerHTML = '<i class="fas fa-star"></i>';
        } else {
          listItemPriorityButton.innerHTML = '<i class="far fa-star"></i>';
        }
      }, 1);
    }

    const setPriorityStatus = () => {
      if (settingPriority() === 0) {
        listItemPriorityButton.innerHTML = '<i class="fas fa-star"></i>';
      } else {
        listItemPriorityButton.innerHTML = '<i class="far fa-star"></i>';
      }
    };

    listItemPriorityButton.addEventListener('click', setPriorityStatus);


    listItemSubmitButton.classList.add('hidden');
    listItemDeleteButton.type = 'button';
    listItemDeleteButton.appendChild(listItemDeleteButtonText);

    const listItemID = generator.generateID(listItemInputContainer);
    if (listItemID >= savedItemsLength) {
      listItemSubmitButton.addEventListener('click', saveTask);
    } else {
      listItemSubmitButton.addEventListener('click', editTask);
    }

    generator.enterShortcut(listItemSubmitButton, listItemInputContainer);
    // listItemInputContainer.addEventListener('focusout', saveTask);
    // listItemInputContainer.addEventListener('focusout', editTask);
    // a function that doesn't require the focus element, but takes back the content of the input;

    listItemDeleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      obliterateTask();
    });
    // implement save task when element loses focus
    // Do not save if element value is empty
    listItemContainer.append(
      listItemInputContainer,
      listItemSubmitButton,
      listItemPriorityButton,
      listItemDeleteButton,
      listItemDownArrow,
    );
    simpleListItemContainer.append(listItemContainer, dropDownBuilder(id));
    return simpleListItemContainer;
  };

  const todoListTasks = () => {
    const savedProject = retrieveItem('project')[0];
    // const listLength = listContainer.getElementsByTagName('*').length;
    if (savedProject) {
      for (let i = 0; i < savedProject.items.length; i++) {
        mainContainer.appendChild(createSingleTask(`${i}`));
        setTimeout(() => {
          const inputField = document.getElementById(`projectTask${i}`);
          inputField.placeholder = `${savedProject.items[i].title}`;
        }, 1);
      }
    }

    return mainContainer;
  };

  const listBuilder = () => {
    // if there is a list, render the list,  add a single one
    // if not, add a single one
    const savedProject = retrieveItem('project');
    const listLength = savedProject.items.length;
    const listContainer = document.getElementById('todoListTasks');
    const domLength = listContainer.childNodes.length;
    if (listLength >= 0 && domLength <= listLength) {
      listContainer.appendChild(createSingleTask(listLength));
    } else if (listLength >= 0 && domLength <= listLength + 1) {
      listContainer.innerHTML = '';
      todoListTasks();
      listContainer.appendChild(createSingleTask(listLength));
    }
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
    // btn.addEventListener('click', itemHandler);
    btn.addEventListener('click', listBuilder);

    form.append(inputContainer, btn);
    mainContainer.append(formTitle, form);
    return mainContainer;
  };

  todoListMainContainer.append(projectGenerator(), todoListTasks(), todoItemGenerator());
  return todoListMainContainer;
};

export default todoListMainContainer;