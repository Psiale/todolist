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

export { htmlGenerator, textGenerator };