import * as handleInput from './handlingUserInput';
import * as localStorage from './localStorage';


const setDate = (id) => { handleInput.setTaskProperty('dateInput', id, 'dueDate'); };


const getDate = (id) => {
  const project = localStorage.retrieveItem('project');
  const task = project.items[id].dueDate;
  if (!task) {
    return 'Set a date';
  }
  return `${task}`;
};


export { setDate, getDate };