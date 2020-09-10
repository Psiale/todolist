import todoListMainContainer from './domManipulation';
// import destroyListObject from './destroyListObject';
import * as generator from './domTools';
// import parseUserInput from './parseUserInput';
// import readListObject from './readListObject';
// import receiveUserInput from './receiveUserInput';
// import retreiveListObject from './retreiveListObject';
// import saveListObject from './saveListObject';
// import validateListObject from './validateListObject';
// import viewAllProjects from './viewAllProjects';
// import viewProjectTasks from './viewProjectTasks';
// import viewSingleProject from './viewSingleProject';
const load = () => {
  const mainContainer = generator.htmlGenerator('div', 'main-container', 'content');
  mainContainer.appendChild(todoListMainContainer());
  return mainContainer;
};

export default load;