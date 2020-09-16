import * as generator from './domTools';
import { retrieveItem } from './localStorage';
import { createNewProject, saveProject, saveTask, editTask, obliterateTask, settingPriority } from './handlingUserInput';

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

    inputElement.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        btn.click();
      }
    });

    inputContainer.append(inputLabel, inputElement);
    form.append(inputContainer, listContainer, btn);
    mainContainer.appendChild(form);
    return mainContainer;
  };

  const createSingleTask = (id) => {
    const savedProject = retrieveItem('project');
    const savedItems = retrieveItem('project').items;
    const savedItemsLength = savedItems.length;
    const listItemContainer = generator.htmlGenerator('div', 'todo-list-item-container', `listItemContainer${id}`);
    const listItemInputContainer = generator.htmlGenerator('input', 'project-task-input', `projectTask${id}`);
    const listItemSubmitButton = generator.htmlGenerator('button', 'project-task-submit', `projectTaskSubmit${id}`);
    const listItemDeleteButtonText = generator.textGenerator('p', '<i class="fas fa-times"></i>');
    const listItemDeleteButton = generator.htmlGenerator('button', 'list-item-delete-button', `projectTaskDelete${id}`);

    //const focusedContainer = document.querySelector(':focus').parentNode.firstChild;
    //const focusedContainerID = generator.generateID(focusedContainer);
    const listItemPriorityButton = generator.htmlGenerator('button', 'todo-list-item-button', `listItemButton${id}`);
    listItemPriorityButton.classList.add('list-item-priority');

    setTimeout(() => {
      if (savedProject.items[id].priority === 0) {
        listItemPriorityButton.innerHTML = '<i class="far fa-star"></i>';
      } else {
        listItemPriorityButton.innerHTML = '<i class="fas fa-star"></i>';
      }
    }, 1);

    //listItemPriorityButton.addEventListener('click', () => {
    //  if (listItemPriorityButton.innerHTML === '<i class="far fa-star"></i>') {
    //    listItemPriorityButton.innerHTML = '<i class="fas fa-star"></i>';
    //  } else {
    //    listItemPriorityButton.innerHTML = '<i class="far fa-star"></i>';
    //  }
    //  settingPriority();
    //});

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
    listItemInputContainer.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        listItemSubmitButton.click();
      }
    });
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
    );
    return listItemContainer;
  };

  const todoListTasks = () => {
    const savedProject = retrieveItem('project');
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
    const domLength = listContainer.getElementsByTagName('div').length;
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
    //btn.addEventListener('click', itemHandler);
    btn.addEventListener('click', listBuilder);

    form.append(inputContainer, btn);
    mainContainer.append(formTitle, form);
    return mainContainer;
  };

  todoListMainContainer.append(projectGenerator(), todoListTasks(), todoItemGenerator());
  return todoListMainContainer;
};

export default todoListMainContainer;