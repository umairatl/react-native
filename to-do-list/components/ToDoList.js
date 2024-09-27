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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ToDoList({ navigation }) {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [tabActive, setTabActive] = useState("pending");

  const getToDoList = async () => {
    try {
      const todo = await AsyncStorage.getItem("todo");
      const todoList = todo ? JSON.parse(todo) : [];
      setSearchData(todoList); //will be a fixed [data] to do filteration
      onLoadContentByTab(todoList, "pending");
    } catch (err) {
      console.log("Error executing getToDoList", err);
    }
  };

  const onLoadContentByTab = (todoList, tab) => {
    if (tab === "complete") {
      setData(todoList.filter((x) => x.status === 0)); //already complete
    } else {
      setData(todoList.filter((x) => x.status === 1)); //havent complete yet
    }
  };

  const onTabSwitch = (tab) => {
    setTabActive(tab);
    onLoadContentByTab(searchData, tab);
  };

  const onSearchList = (val) => {
    const newList = searchData.filter(
      (x) => x.title.toLowerCase().includes(val.toLowerCase()) && x.status === 1
    );
    setData(newList);
  };
  useFocusEffect(
    useCallback(() => {
      setTabActive("pending");
      getToDoList();
    }, [])
  );

  const onClickAdd = () => {
    navigation.navigate("To Do Details", { data });
  };

  const onClickViewDetail = (id) => {
    navigation.navigate("View Item", { id });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.wrapBtnOptions}>
          <TouchableOpacity onPress={() => onTabSwitch("pending")}>
            <View
              style={[
                styles.tab,
                tabActive === "pending" ? styles.activeTab : {},
              ]}
            >
              <Text>Pending Task</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabSwitch("complete")}>
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
          scrollEnabled={true}
          style={{ height: 480 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onClickViewDetail(item.id);
              }}
            >
              <View style={styles.item}>
                <View style={styles.wrapFlatList}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor:
                        tabActive === "pending" ? "#292989" : "green",
                      borderRadius: 50,
                    }}
                  ></View>
                  <Text style={styles.taskText}>{item.title}</Text>
                </View>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
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
  wrapFlatList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
  },
});
