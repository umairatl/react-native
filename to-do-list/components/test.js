import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ToDoList({ navigation }) {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [tabActive, setTabActive] = useState("pending");

  const getToDoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("todo");
      const update = storedList ? JSON.parse(storedList) : [];
      console.log(update, "GETTODOOO");
      setData(update);
      setSearchData(update);
      getActiveTab();
    } catch (err) {
      console.log("Error executing getToDoList", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getToDoList();
    }, [])
  );

  const getActiveTab = () => {
    if (tabActive === "complete") {
      getPendingTab();
    } else {
      getPendingTab();
    }
  };

  const onSearchList = (val) => {
    const newList = searchData.filter((x) =>
      x.title.toLowerCase().includes(val.toLowerCase())
    );
    setData(newList);
  };

  const onClickAdd = () => {
    navigation.navigate("To Do Details", { data });
  };

  const onClickViewDetail = (id) => {
    navigation.navigate("View Item", { id });
  };

  const getPendingTab = () => {
    setTabActive("pending");
    const newList = searchData.filter((x) => x.status === 1);
    setData(newList);
  };

  const getCompletedTab = () => {
    setTabActive("complete");
    console.log(searchData, "DATA1");
    const newList = searchData.filter((x) => x.status === 0);
    console.log(newList, "DATAAA2");
    setData(newList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapBtnOptions}>
        <TouchableOpacity onPress={getPendingTab}>
          <View
            style={[
              styles.tab,
              tabActive === "pending" ? styles.activeTab : {},
            ]}
          >
            <Text>Pending Task</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={getCompletedTab}>
          <View
            style={[
              styles.tab,
              tabActive === "complete" ? styles.activeTab : {},
            ]}
          >
            <Text>Completed Task</Text>
          </View>
        </TouchableOpacity>
      </View>

      {tabActive === "pending" && (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search item"
            placeholderTextColor="grey"
            onChangeText={onSearchList}
          />

          <TouchableOpacity onPress={onClickAdd}>
            <View style={styles.item}>
              <Text style={styles.taskText}> + Add New Item </Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onClickViewDetail(item.id);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.taskText}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
  },
  item: {
    backgroundColor: "#d6d6f2",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 13,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  wrapBtnOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "292989",
  },
});
