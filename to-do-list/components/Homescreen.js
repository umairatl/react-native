import { SafeAreaView } from "react-native-safe-area-context";
import ToDoList from "./ToDoList";

export default function HomeScreen({ navigation }) {
  return <ToDoList navigation={navigation} />;
}
