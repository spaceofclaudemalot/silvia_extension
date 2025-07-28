export function saveData({ tasks, notes }) {
  localStorage.setItem(
    "silvia_extention_data",
    JSON.stringify({ tasks, notes })
  );
}

export function loadData() {
  const data = localStorage.getItem("silvia_extention_data");
  if (data) {
    return JSON.parse(data);
  }
  return { tasks: [], notes: "" };
}
