import { format } from 'date-fns';

import * as handleInput from './handlingUserInput';
import * as localStorage from './localStorage';


const setDate = (id) => { handleInput.setTaskProperty('dateInput', id, 'dueDate'); };

const dateParser = (task) => {
const initialDate = new Date(task);
const day =   initialDate.getDate();
const month = initialDate.getMonth();
const year =  initialDate.getFullYear();
const dayFormatted = format(day, "do");
const monthFormatted = format(month, "LLL");
  return `${dayFormatted} ${monthFormatted}, ${year}`;  
}

const getDate = (id) => {
  const project = localStorage.retrieveItem('project');
  if (id && project.items[id]) { 
    const task = project.items[id].dueDate;
    if (!task) {
      return 'Set a date';
    }
    console.log(dateParser(task))
    return `${task}`;
  }
};




export { setDate, getDate };