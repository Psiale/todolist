import { format } from 'date-fns';

import * as handleInput from './handlingUserInput';
import * as localStorage from './localStorage';


const setDate = (id) => { handleInput.setTaskProperty('dateInput', id, 'dueDate'); };

const dateParser = (task) => {
  const initialDate = new Date(task);
  const hours = initialDate.getHours();
  const mins = ((initialDate.getMinutes() < 10) ? 0 : null) + initialDate.getMinutes();
  const time = Number(`${hours}${mins}`);
  const day = initialDate.getDate();
  const month = initialDate.getMonth();
  const year = initialDate.getFullYear();
  const timeFormatted = format(time, 'p');
  const dayFormatted = format(day, "do");
  const monthFormatted = format(month, "LLL");
  return `${timeFormatted}, ${dayFormatted} ${monthFormatted}, ${year}`;
};

const getDate = (id) => {
  const project = localStorage.retrieveItem('project');
  if (id && project.items[id]) {
    const task = project.items[id].dueDate;
    if (!task) {
      return 'Set a date';
    }
    console.log(dateParser(task)); // <---- always returns 1:00 AM, 1st Jan and then the inputted year!
    return dateParser(task);
  }
};




export { setDate, getDate };