import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToDoList = async () => {
  try {
    const todo = await AsyncStorage.getItem("todo");
    const todoList = todo ? JSON.parse(todo) : [];
    return todoList;
  } catch (err) {
    console.log("Error executing getToDoList", err);
  }
};

export const getTodoByID = async (id) => {
  try {
    const storedList = await AsyncStorage.getItem("todo");
    let todos = storedList ? JSON.parse(storedList) : [];

    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return todos[index];
    }
  } catch (err) {
    console.log("Error executing getTodoByID", err);
  }
};

export const storeNewTodo = async (item) => {
  try {
    await AsyncStorage.setItem("todo", JSON.stringify(item));
  } catch (err) {
    console.log("Error executing storeNewTodo", err);
  }
};

export const updateItem = async (id, title, description, status) => {
  try {
    const storedList = await AsyncStorage.getItem("todo");
    let todos = storedList ? JSON.parse(storedList) : [];
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index] = {
        ...todos[index],
        title,
        description,
        status,
      };
    }

    await AsyncStorage.setItem("todo", JSON.stringify(todos));
  } catch (err) {
    console.log("Error while updateItem", err);
  }
};
