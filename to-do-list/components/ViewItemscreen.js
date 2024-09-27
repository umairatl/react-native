import { useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getItemById, updateItem } from "../helper/loadList";

export default function ViewItemSceen({ route, navigation }) {
  const { id } = route.params || {};
  const [item, setItem] = useState({});

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        data = await getItemById(id);
        setItem(data);
      };

      loadData();
    }, [])
  );

  const onClickToDoComplete = async () => {
    const id = item.id;
    const title = item.title;
    const description = item.description;
    const status = 0;
    await updateItem(id, title, description, status);

    Alert.alert("Yeayy!", "Congratulations for completing the task", [
      {
        text: "Back",
        onPress: () => navigation.navigate("My To-Do App"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title:</Text>
      <Text style={styles.desc}> {item.title}</Text>

      <Text style={styles.title}>Description:</Text>
      <Text style={styles.desc}> {item.description}</Text>

      <Text style={styles.title}>Status of To-Do</Text>
      {item.status === 1 ? (
        <>
          <Text style={styles.desc}>Item is not yet complete</Text>
          <View style={styles.wrapBtns}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Edit ToDo", { item });
              }}
            >
              <View style={styles.wrapBtn}>
                <Text style={styles.btnText}>Edit ToDo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClickToDoComplete}>
              <View style={styles.wrapBtn}>
                <Text style={styles.btnText}>Mark as done</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.desc}>Item is Completed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "start",
    margin: 20,
  },
  doneBtn: {
    bottom: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 25,
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    margin: 10,
    borderColor: "black",
    padding: 7,
    width: "90%",
    height: 50,
  },
  detailInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  desc: {
    fontSize: 20,
    marginBottom: 20,
  },
  wrapBtn: {
    marginTop: 35,
    backgroundColor: "#292989",
    borderRadius: 8,
    width: 160,
  },
  btnText: {
    padding: 14,
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  wrapBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
