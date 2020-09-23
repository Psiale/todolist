const htmlGenerator = (htmlElement, htmlClass, idClass = null) => {
  const element = document.createElement(htmlElement);
  element.classList.add(htmlClass);
  element.id = idClass;
  return element;
};

const textGenerator = (tag, text) => {
  const element = document.createElement(tag);
  element.innerHTML = `${text}`;
  return element;
};

const enterShortcut = (btn, element) => {
  element.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      btn.click();
    }
  });
};

const hideAndShow = (a, b, c = null) => {
  a.classList.toggle('hidden');
  b.classList.toggle('hidden');
  if (c) c.classList.toggle('hidden');
};

const generateID = (domElement) => domElement.id.split('').reverse().slice(0, 1).join('');

export {
  htmlGenerator, textGenerator, generateID, enterShortcut, hideAndShow,
};