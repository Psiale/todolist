import * as generator from './domTools';
import { hideShowDropdown } from './viewProjectTasks';
import * as hui from './handlingUserInput';
import dropDownBuilder from './dropDownBuilder';

const createSingleTask = (id, currentProject) => {
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
  listItemInputContainer.placeholder = 'Give it a title...';
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
    if (hui.settingPriority() === 0) {
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
    listItemSubmitButton.addEventListener('click', hui.saveTask);
  } else {
    listItemSubmitButton.addEventListener('click', hui.editTask);
  }

  generator.enterShortcut(listItemSubmitButton, listItemInputContainer);

  listItemDeleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    hui.obliterateTask();
  });
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

export default createSingleTask;