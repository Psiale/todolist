import * as generator from './domTools';
import { retrieveItem, saveItem } from './localStorage';
import * as hui from './handlingUserInput';
import createSingleTask from './createSingleTask';
import todoListItemGenerator from './todoListItemGenerator';
import projectGenerator from './projectGenerator';
import todoListTasks from './todoListTasks';
import listBuilder from './listBuilder';
import todoItemGenerator from './todoItemGenerator';

const mainContainer = generator.htmlGenerator('div', 'todo-list-tasks', 'todoListTasks');
let currentProject;

(function () {
  if (!retrieveItem('dropdownState')) {
    const dropState = [true, 999];
    saveItem('dropdownState', dropState);
  }
}());

(function () {
  if (retrieveItem('project') && retrieveItem('project').length > 0) {
    currentProject = retrieveItem('requested-project');
  } else {
    currentProject = hui.addNewProject();
  }
}());

const todoListMainContainer = () => {
  const todoListMainContainer = generator.htmlGenerator('div', 'todo-list-main-container', 'todoListMainContainer');
  todoListMainContainer.append(projectGenerator(currentProject), todoListTasks(currentProject, mainContainer), todoItemGenerator(currentProject));
  return todoListMainContainer;
};

const projectSelectorList = () => {
  const mainContainer = generator.htmlGenerator('div', 'project-selector-container', 'projectSelectorContainer');
  const backgroundContainer = generator.htmlGenerator('div', 'todoList-background-container');
  mainContainer.append(todoListItemGenerator(hui.projectArr), backgroundContainer);
  return mainContainer;
};

export { todoListMainContainer, projectSelectorList };