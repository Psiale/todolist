import * as generator from './domTools';
import { retrieveItem } from './localStorage';
import * as hui from './handlingUserInput';
import { getDate, setDate } from './viewProjectTasks';

const dropDownBuilder = (id) => {
  const container = generator.htmlGenerator('div', 'drop-container', `dropContainer${id}`);
  container.classList.add('hidden');
  container.classList.add('slide-in-bottom');
  const dropdownQuery = retrieveItem('dropdownState');
  if (dropdownQuery[1] === id) {
    if (dropdownQuery[0] === false) {
      container.classList.remove('hidden');
      container.classList.remove('slide-in-bottom');
    }
  }

  const descriptionSection = () => {
    const descriptionContainer = generator.htmlGenerator('div', 'description-container', `descriptionContainer${id}`);
    const descriptionInput = generator.htmlGenerator('input', 'description-input', `descriptionInput${id}`);

    if (hui.getTaskProperty(id, 'description')) {
      descriptionInput.placeholder = `${hui.getTaskProperty(id, 'description')}`;
    } else {
      descriptionInput.placeholder = 'Give your task a description...';
    }

    const descriptionSubmit = generator.htmlGenerator('button', 'description-submit-button', `descriptionSubmitButton${id}`);
    const descriptionSubmitIcon = generator.textGenerator('i', '<i class="fas fa-save"></i>');
    descriptionSubmit.addEventListener('click', () => {
      hui.setTaskProperty('descriptionInput', id, 'description');
      generator.reload();
    });
    descriptionSubmit.classList.add('hidden');
    generator.enterShortcut(descriptionSubmit, descriptionInput);

    descriptionSubmit.appendChild(descriptionSubmitIcon);
    descriptionContainer.append(descriptionInput, descriptionSubmit);
    return descriptionContainer;
  };

  const dateSection = () => {
    const dateContainer = generator.htmlGenerator('div', 'date-container', `dateContainer${id}`);
    const dateInput = generator.htmlGenerator('input', 'date-input', `dateInput${id}`);
    dateInput.type = 'datetime-local';
    dateInput.setAttribute('min', '1066-01-01T00:00');
    dateInput.setAttribute('max', '2100-01-01T00:00');
    dateInput.classList.add('hidden');

    const dateSubmit = generator.htmlGenerator('button', 'date-submit-button', `dateSubmitButton${id}`);

    const dateSubmitIcon = generator.textGenerator('i', '<i class="fas fa-check-circle"></i>');
    dateSubmit.appendChild(dateSubmitIcon);
    dateSubmit.classList.add('hidden');
    const dateBackButton = generator.htmlGenerator('button', 'date-back-button', `dateBackButton${id}`);
    dateBackButton.innerHTML = 'Cancel';

    const dateDisplay = generator.htmlGenerator('input', 'date-display', `dateDisplay${id}`);
    dateDisplay.placeholder = getDate(id);

    dateDisplay.addEventListener('click', (event) => {
      event.preventDefault();
      generator.hideAndShow(dateDisplay, dateInput, dateBackButton, dateSubmit);
    });

    dateBackButton.addEventListener('click', (event) => {
      event.preventDefault();
      generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
    });
    dateBackButton.classList.add('hidden');
    dateSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      setDate(id);
      generator.hideAndShow(dateInput, dateDisplay, dateBackButton);
      generator.reload();
    });
    generator.enterShortcut(dateSubmit, dateInput);

    dateContainer.append(dateInput, dateDisplay, dateSubmit, dateBackButton);
    return dateContainer;
  };

  container.append(descriptionSection(), dateSection());
  return container;
};

export default dropDownBuilder;