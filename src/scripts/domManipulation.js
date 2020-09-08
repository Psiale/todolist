const htmlGenerator = (htmlElement, htmlClass, idClass = null) => {
  const element = document.createElement(htmlElement);
  element.classList.add(htmlClass);
  element.id = idClass;
  return element;
};



export { htmlGenerator };