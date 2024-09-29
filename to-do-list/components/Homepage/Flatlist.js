import { StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeFlatList({ data, tabActive, navigation }) {
  const onClickViewDetail = (id) => {
    navigation.navigate("View Item", { id });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      style={{ height: 480 }}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onClickViewDetail(item.id);
            }}
          >
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
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#d6d6f2",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapFlatList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
