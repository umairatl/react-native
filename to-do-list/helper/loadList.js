import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToDoList = async () => {
  try {
    const storedList = await AsyncStorage.getItem("todo");
    if (storedList) {
      return JSON.parse(storedList);
    }
  } catch (err) {
    console.log("Error executing getToDoList", err);
  }
};

export const storeNewItem = async (item) => {
  try {
    await AsyncStorage.setItem("todo", JSON.stringify(item));
  } catch (err) {
    console.log("Error executing storeItme", err);
  }
};

export const getItemById = async (id) => {
  try {
    const storedList = await AsyncStorage.getItem("todo");
    let todos = storedList ? JSON.parse(storedList) : [];

    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return todos[index];
    }
  } catch (err) {
    console.log("Error executing getItemById", err);
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
