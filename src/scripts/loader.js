import { todoListMainContainer, projectSelectorList } from './domManipulation';

import * as generator from './domTools';

const load = () => {
  const mainContainer = generator.htmlGenerator('div', 'main-container', 'content');
  mainContainer.append(todoListMainContainer(), projectSelectorList());
  return mainContainer;
};

export default load;