const eventHandler = (event) => {
  const element = document.getElementById('projectTitleInput');
  console.log(element.value);
  return element.value; }

export { eventHandler }