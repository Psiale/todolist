function newTodoListItem(projectTitle, title = null, description = null, dueDate = null, priority = null) {
  return [
    projectTitle,
    title,
    description,
    dueDate,
    priority,
  ];
}

export default newTodoListItem;
