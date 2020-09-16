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

const generateID = (domElement) => domElement.id.split('').reverse().slice(0, 1).join('');

export { htmlGenerator, textGenerator, generateID };