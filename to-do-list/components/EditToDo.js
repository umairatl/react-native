import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { updateItem } from "../helper/loadList";

export default function EditToDo({ route, navigation }) {
  const { item } = route.params || {};
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDesc, setEditDesc] = useState(item.description);
  const [editStatus, setEditStatus] = useState(item.status);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const onClickEditDetail = async () => {
    const id = item.id;
    await updateItem(id, editTitle, editDesc, editStatus);

    Alert.alert("Yeayy!", "Todo Update Successfully", [
      {
        text: "View To Do",
        onPress: () => navigation.navigate("View Item", { id }),
      },
    ]);
  };

  useEffect(() => {
    if (editTitle.trim() && editDesc.trim()) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [editTitle, editDesc]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Item Title</Text>
        <TextInput
          style={styles.detailInput}
          placeholder="Review title"
          onChangeText={(val) => {
            setEditTitle(val);
          }}
          value={editTitle}
        />
        <Text style={styles.title}>Item Description</Text>
        <TextInput
          style={styles.detailInput}
          placeholder="Review description"
          value={editDesc}
          multiline
          minHeight={100}
          onChangeText={(val) => {
            setEditDesc(val);
          }}
        />
      </View>
      <TouchableOpacity disabled={isBtnDisabled} onPress={onClickEditDetail}>
        <View style={styles.wrapBtn}>
          <Text style={styles.btnText}>Update</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  search: {
    borderWidth: 1,
    margin: 10,
    borderColor: "black",
    padding: 7,
    width: "90%",
    height: 50,
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
