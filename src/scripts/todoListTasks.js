import createSingleTask from './createSingleTask';

const todoListTasks = (currentProject, mainContainer) => {
  if (currentProject) {
    for (let i = 0; i < currentProject.items.length; i++) {
      mainContainer.appendChild(createSingleTask(`${i}`, currentProject));
      setTimeout(() => {
        const inputField = document.getElementById(`projectTask${i}`);
        if (currentProject.items[i].title) {
          inputField.placeholder = `${currentProject.items[i].title}`;
        }
      }, 1);
    }
  }
  return mainContainer;
};

export default todoListTasks;