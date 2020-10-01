function todoItem(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

function todoList(projectTitle, items = [], id) {
  return {
    id,
    projectTitle,
    items,
  };
}

export { todoItem, todoList };