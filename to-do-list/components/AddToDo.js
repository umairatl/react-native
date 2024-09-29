import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { storeNewTodo } from "../helpers/asyncStorage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddToDo({ route, navigation }) {
  const { data } = route.params || {};
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (newItemTitle.trim() && newItemDesc.trim()) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [newItemTitle, newItemDesc]);

  const onClickSubmit = async () => {
    const newToDo = {
      title: newItemTitle,
      id: Math.random().toString(36).substring(2, 9),
      description: newItemDesc,
      status: 1,
    };

    const newList = [...data, newToDo];
    await storeNewTodo(newList);

    Alert.alert("Yeayy!", "Added Successfully", [
      {
        text: "Done",
        onPress: () => navigation.navigate("My To-Do App"),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Item Title</Text>
          <TextInput
            style={styles.detailInput}
            placeholder="Review title"
            onChangeText={(val) => {
              setNewItemTitle(val);
            }}
            value={newItemTitle}
          />
          <Text style={styles.title}>Item Description</Text>
          <TextInput
            style={styles.detailInput}
            placeholder="Review description"
            onChangeText={(val) => {
              setNewItemDesc(val);
            }}
            value={newItemDesc}
            A
            multiline
            minHeight={100}
          />
        </View>

        <TouchableOpacity disabled={isBtnDisabled} onPress={onClickSubmit}>
          <View style={styles.wrapBtn}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "start",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 25,
    marginBottom: 10,
  },
  detailInput: {
    fontSize: 15,
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 8,
    shadowColor: "#000",
  },
  wrapBtn: {
    marginTop: 35,
    backgroundColor: "#292989",
    borderRadius: 8,
  },
  btnText: {
    padding: 14,
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
});
