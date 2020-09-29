import * as generator from './domTools';
import { retrieveItem, saveItem } from './localStorage';
import { setDate, getDate, hideShowDropdown } from './viewProjectTasks';
import { todoList } from './classes/todoListItem';
import {
  retrieveProject, saveProject, saveTask, editTask,
  obliterateTask, settingPriority, setTaskProperty, getTaskProperty,
  renderProject, renderTodoListToDom, projectArr, getIdFromProject, addNewProject,
  obliterateProject,
} from './handlingUserInput';

const mainContainer = generator.htmlGenerator('div', 'todo-list-tasks', 'todoListTasks');

(function () {
  if (!retrieveItem('dropdownState')) {
    let dropState = [true, 999];
    saveItem('dropdownState', dropState);
  }
}());

let currentProject;
if (retrieveItem('project') && retrieveItem('project').length > 0) {
  currentProject = retrieveItem('requested-project');
} else {
  currentProject = addNewProject();
};

const todoListMainContainer = () => {
  const todoListMainContainer = generator.htmlGenerator('div', 'todo-list-main-container', 'todoListMainContainer');

  const projectGenerator = () => {
    const mainContainer = generator.htmlGenerator('div', 'project-form-container');
    const form = generator.htmlGenerator('form', 'edit-project-title-container', 'editProjectTitleContainer');
    const inputContainer = generator.htmlGenerator('div', 'project-input-container');
    const inputLabel = generator.htmlGenerator('label', 'project-label-input');
    const inputElement = generator.htmlGenerator('input', 'project-title-input', 'projectTitleInput');

    // create a loop to render items to append on todoListArrContainer
    inputElement.placeholder = `${currentProject.projectTitle}`;

    const listContainer = generator.htmlGenerator('div', 'project-item-container', 'projectItemContainer');
    const btnText = generator.textGenerator('p', 'Save<br>Project');
    const btn = generator.htmlGenerator('button', 'project-submit-btn', 'projectSubmitBtn');

    btn.appendChild(btnText);
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', saveProject);

    generator.enterShortcut(btn, inputElement);

    inputContainer.append(inputLabel, inputElement);
    form.append(inputContainer, listContainer, btn);
    setTimeout(() => {
      mainContainer.appendChild(form);
    }, 1);
    return mainContainer;
  };

  const dropDownBuilder = (id) => {
    const container = generator.htmlGenerator('div', 'drop-container', `dropContainer${id}`);
    container.classList.add('hidden');
    container.classList.add('slide-in-bottom');
    const dropdownQuery = retrieveItem('dropdownState');
    if (dropdownQuery[1] === id) {
      if (dropdownQuery[0] === false) {
        container.classList.remove('hidden');
        container.classList.remove('slide-in-bottom');
      }
    }

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
        //location.reload();
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

      const dateSubmit = generator.htmlGenerator('button', 'date-submit-button', `dateSubmitButton${id}`);
      // dateSubmit.classList.add('hidden');
      const dateSubmitIcon = generator.textGenerator('i', '<i class="fas fa-check-circle"></i>');
      dateSubmit.appendChild(dateSubmitIcon);
      dateSubmit.classList.add('hidden')
      const dateBackButton = generator.htmlGenerator('button', 'date-back-button', `dateBackButton${id}`);
      dateBackButton.innerHTML = 'Cancel';

      const dateDisplay = generator.htmlGenerator('input', 'date-display', `dateDisplay${id}`);
      dateDisplay.placeholder = getDate(id);

      dateDisplay.addEventListener('click', (event) => {
        event.preventDefault();
        generator.hideAndShow(dateDisplay, dateInput, dateBackButton, dateSubmit);
      });

      dateBackButton.addEventListener('click', (event) => {
        event.preventDefault();
        generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
      });
      dateBackButton.classList.add('hidden');
      dateSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        setDate(id);
        generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
        location.reload();
      });
      generator.enterShortcut(dateSubmit, dateInput);

      dateContainer.append(dateInput, dateDisplay, dateSubmit, dateBackButton);
      return dateContainer;
    };

    container.append(descriptionSection(), dateSection());
    return container;
  };

  const createSingleTask = (id) => {
    const savedItems = currentProject.items;
    const savedItemsLength = savedItems.length;
    const simpleListItemContainer = generator.htmlGenerator('div', 'simple-list-item-container', `simpleListItemContainer${id}`);
    const listItemContainer = generator.htmlGenerator('div', 'todo-list-item-container', `listItemContainer${id}`);
    const listItemInputContainer = generator.htmlGenerator('input', 'project-task-input', `projectTask${id}`);
    const listItemSubmitButton = generator.htmlGenerator('button', 'project-task-submit', `projectTaskSubmit${id}`);
    const listItemSubmitIcon = generator.textGenerator('i', '<i class="fas fa-check-circle"></i>');
    const listItemDeleteButtonText = generator.textGenerator('p', '<i class="fas fa-times"></i>');
    const listItemDeleteButton = generator.htmlGenerator('button', 'list-item-delete-button', `projectTaskDelete${id}`);
    const listItemPriorityButton = generator.htmlGenerator('button', 'todo-list-item-button', `listItemButton${id}`);
    const listItemDownArrow = generator.htmlGenerator('button', 'list-item-down-arrow', `listItemDownArrow${id}`);
    const listItemDownArrowIcon = generator.textGenerator('p', '<i class="fas fa-sort-down"></i>');
    listItemInputContainer.placeholder = 'New task...';
    listItemDownArrow.appendChild(listItemDownArrowIcon);
    listItemSubmitButton.appendChild(listItemSubmitIcon);
    listItemPriorityButton.classList.add('list-item-priority');
    listItemDownArrow.addEventListener('click', () => {
      hideShowDropdown(id);
    });

    if (id && currentProject.items[id]) {
      setTimeout(() => {
        if (currentProject.items[id].priority === 0) {
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
    //const confirmButton = () => {
    //  const displayedTitle = (document.querySelector(':focus'));
    //  if (displayedTitle.placeholder === currentProject) {
    //    listItemSubmitButton.classList.remove('hidden');
    //  }
    //};
    //
    //const listItemInputs = document.querySelectorAll('.project-task-input');
    //listItemInputs.forEach(item => item.addEventListener('click', () => {
    //  preventDefault();
    //  confirmButton();
    //}));

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
    if (currentProject) {
      for (let i = 0; i < currentProject.items.length; i++) {
        mainContainer.appendChild(createSingleTask(`${i}`));
        setTimeout(() => {
          const inputField = document.getElementById(`projectTask${i}`);
          if (currentProject.items[i].title) {
            inputField.placeholder = `${currentProject.items[i].title}`;
          };
        }, 1);
      }
    }
    return mainContainer;
  };

  const listBuilder = () => {
    // if there is a list, render the list,  add a single one
    // if not, add a single one
    const listLength = currentProject.items.length;
    const listContainer = document.getElementById('todoListTasks');
    const domLength = listContainer.childNodes.length;
    if (currentProject) {
      if (listLength >= 0 && domLength <= listLength) {
        listContainer.appendChild(createSingleTask(listLength));
      } else if (listLength >= 0 && domLength <= listLength + 1) {
        listContainer.innerHTML = '';
        todoListTasks();
        listContainer.appendChild(createSingleTask(listLength));
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
    // btn.addEventListener('click', itemHandler);
    btn.addEventListener('click', listBuilder);
    btnP.addEventListener('click', () => {
      // 9. Passed renderProject as the id fetcher to return the proper project

      addNewProject();
      location.reload()
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

  const todoListItemGenerator = (arr = []) => {
    const todoListArrContainer = generator.htmlGenerator('div', 'project-todoList-arr-container');
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      const todoListItemContainer = generator.htmlGenerator('div', 'todolist-item-container', `todoListItemContainer${i}`);
      const todoListItemDeleteButton = generator.htmlGenerator('button', 'todolist-item-delete-btn', `todoListItemDeleteBtn${i}`);
      const todoListItemDeleteButtonText = generator.textGenerator('p', '<i class="fas fa-times"></i>');
      todoListItemDeleteButton.append(todoListItemDeleteButtonText);
      const textContent = generator.textGenerator('p', `${element.projectTitle}`);
      textContent.addEventListener('click', () => {
        getIdFromProject(i);
        location.reload();
      });
      todoListItemDeleteButton.addEventListener('click', () => {
        obliterateProject(i);
        location.reload();
      });
      todoListItemContainer.append(textContent, todoListItemDeleteButton);
      todoListArrContainer.appendChild(todoListItemContainer);
    }
    return todoListArrContainer;
  };
  const backgroundContainer = generator.htmlGenerator('div', 'todoList-background-container');
  mainContainer.append(todoListItemGenerator(projectArr), backgroundContainer);
  return mainContainer;
};

export { todoListMainContainer, projectSelectorList };