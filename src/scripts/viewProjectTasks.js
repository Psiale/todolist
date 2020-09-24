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
  const project = handleInput.retrieveProject(id);

  if (id && project.items) {
    const task = project.items[id].dueDate;
    if (!task) {
      return 'Set a date';
    }
    return dateParser(task);
  }
};

const hideShowDropdown = (id) => {
  const arrow = document.getElementById(`listItemDownArrow${id}`);
  const dropdown = document.getElementById(`dropContainer${id}`);
  let dropState;
  if (localStorage.retrieveItem('dropdownState')) {
   dropState = localStorage.retrieveItem('dropdownState');
   dropState = false;
   localStorage.saveItem('dropdownState', dropState);
  } else {
   dropState = false;
   localStorage.saveItem('dropdownState', dropState);
  }
  dropdown.classList.toggle('flex');
  dropdown.classList.toggle('slide-in-top');
  dropdown.classList.toggle('slide-in-bottom');
  dropdown.classList.toggle('hidden');
  arrow.classList.toggle('rotate');
}




export { setDate, getDate, hideShowDropdown };