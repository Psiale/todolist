import todoListTasks from './todoListTasks';
import createSingleTask from './createSingleTask';

const listBuilder = (currentProject, mainContainer) => {
  const listLength = currentProject.items.length;
  const listContainer = document.getElementById('todoListTasks');
  const domLength = listContainer.childNodes.length;
  if (currentProject) {
    if (listLength >= 0 && domLength <= listLength) {
      listContainer.appendChild(createSingleTask(listLength, currentProject));
    } else if (listLength >= 0 && domLength <= listLength + 1) {
      listContainer.innerHTML = '';
      todoListTasks(currentProject, mainContainer);
      listContainer.appendChild(createSingleTask(listLength, currentProject));
    }
  }
};

export default listBuilder;