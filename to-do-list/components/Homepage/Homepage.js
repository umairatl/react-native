import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getToDoList } from "../../helpers/asyncStorage";
import HomeFlatList from "./Flatlist";

export default function Homepage({ navigation }) {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]); //data to execute filter
  const [tabActive, setTabActive] = useState("pending");

  const renderList = async () => {
    try {
      const todoList = await getToDoList();
      setSearchData(todoList);
      onLoadContentByTab(todoList, "pending");
    } catch (err) {
      console.log("Error executing renderList", err);
    }
  };

  const onLoadContentByTab = (todoList, tab) => {
    if (tab === "complete") {
      setData(todoList.filter((x) => x.status === 0));
    } else {
      setData(todoList.filter((x) => x.status === 1));
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
      renderList();
    }, [])
  );

  const onClickAdd = () => {
    navigation.navigate("To Do Details", { data });
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
              <View
                style={[
                  styles.searchInput,
                  { backgroundColor: "#d6d6f2", padding: 20 },
                ]}
              >
                <Text> + Add New Item </Text>
              </View>
            </TouchableOpacity>
          </>
        )}

        <HomeFlatList
          data={data}
          tabActive={tabActive}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
