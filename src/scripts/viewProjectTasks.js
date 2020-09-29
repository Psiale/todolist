import { format } from 'date-fns';

import * as handleInput from './handlingUserInput';
import * as localStorage from './localStorage';

const setDate = (id) => { handleInput.setTaskProperty('dateInput', id, 'dueDate'); };

const dateParser = (task) => {
  if (task) {
    const initialDate = new Date(task);
    const timeFormatted = format(initialDate, 'Pp');
    return `${timeFormatted}`;
  }
  return;
};

const getDate = (id) => {
  // 6. Changed the definition of project to return a todoList item
  const project = localStorage.retrieveItem('requested-project');

  if (id && project.items[id]) {
    const task = project.items[id].dueDate;
    if (!task) {
      return 'Set a date';
    }
    return dateParser(task);
  }
};

const hideShowDropdown = (id) => {
  const descriptionInput = document.getElementById(`descriptionInput${id}`);
  const arrow = document.getElementById(`listItemDownArrow${id}`);
  const dropdown = document.getElementById(`dropContainer${id}`);
  dropdown.classList.toggle('flex');
  dropdown.classList.toggle('slide-in-top');
  dropdown.classList.toggle('slide-in-bottom');
  dropdown.classList.toggle('hidden');
  arrow.classList.toggle('rotate');
  let dropState;
  if (localStorage.retrieveItem('dropdownState')) {
    dropState = localStorage.retrieveItem('dropdownState');
    if (dropState[0] === true && dropState[1] === 999) {
      dropState = [false, id];
      localStorage.saveItem('dropdownState', dropState);
    } else {
      dropState = [true, 999];
      localStorage.saveItem('dropdownState', dropState);
    }
  }
  descriptionInput.focus();
}




export { setDate, getDate, hideShowDropdown };