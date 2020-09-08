import * as generator from './domManipulation';

const projectGenerator = () => {
    const mainContainer = generator.htmlGenerator('div', 'project-form-container');
    const form =  generator.htmlGenerator('form', 'project-form');
    const inputContainer = generator.htmlGenerator('div', 'project-input-container');
    const inputLabel = generator.htmlGenerator('label', 'project-label-input');
    const inputElement = generator.htmlGenerator('input', 'project-title-input');
    const listContainer =generator.htmlGenerator('div', 'project-item-container', 'projectItemContainer');
    const btn =  generator.htmlGenerator('button', 'project-submit-btn', 'projectSubmitBtn');
    
    inputContainer.append(inputLabel, inputElement);
    form.append(inputContainer, listContainer, btn);
    mainContainer.append(form);
    return mainContainer;
}

const todoItemGenerator = () => { }