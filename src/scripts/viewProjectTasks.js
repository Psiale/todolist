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

  if (id && project.items[id]) {
    const task = project.items[id].dueDate;
    console.log(`${dateParser(task)}`);
    if (!task) {
      return 'Set a date';
    }
    console.log(dateParser(task)); // <---- always returns 1:00 AM, 1st Jan and then the inputted year!
    return dateParser(task);
  }
};

const hideShowDropdown = (id) => {
  const arrow = document.getElementById(`listItemDownArrow${id}`);
  const dropdown = document.getElementById(`dropContainer${id}`);
  dropdown.classList.toggle('flex');
  dropdown.classList.toggle('slide-in-top');
  dropdown.classList.toggle('slide-in-bottom');
  // setTimeout(() => {
  dropdown.classList.toggle('hidden');
  // }, 1200);
  arrow.classList.toggle('rotate');
}




export { setDate, getDate, hideShowDropdown };