import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddToDo from "./components/AddToDo";
import DetailToDo from "./components/DetailToDo";
import EditToDo from "./components/EditToDo";
import Homepage from "./components/Homepage/Homepage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#292989" },
        }}
      >
        <Stack.Screen name="My To-Do App" component={Homepage} />
        <Stack.Screen name="To Do Details" component={AddToDo} />
        <Stack.Screen name="View Item" component={DetailToDo} />
        <Stack.Screen name="Edit ToDo" component={EditToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
