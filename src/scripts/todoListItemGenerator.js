import * as generator from './domTools';
import * as hui from './handlingUserInput';

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
      hui.getIdFromProject(i);
      generator.reload();
    });
    todoListItemDeleteButton.addEventListener('click', () => {
      hui.obliterateProject(i);
      generator.reload();
    });
    todoListItemContainer.append(textContent, todoListItemDeleteButton);
    todoListArrContainer.appendChild(todoListItemContainer);
  }
  return todoListArrContainer;
};

export default todoListItemGenerator;