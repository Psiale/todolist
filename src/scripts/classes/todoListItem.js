function todoItem(title, description, dueDate, priority) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
  };
}

function todoList(projectTitle, items = []) {
  return {
    projectTitle,
    items,
  };
}

export { todoItem, todoList };