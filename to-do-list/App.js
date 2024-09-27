import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Homescreen";
import AddToDo from "./components/AddToDo";
import ViewItemSceen from "./components/ViewItemscreen";
import EditToDo from "./components/EditToDo";

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
        <Stack.Screen name="My To-Do App" component={HomeScreen} />
        <Stack.Screen name="To Do Details" component={AddToDo} />
        <Stack.Screen name="View Item" component={ViewItemSceen} />
        <Stack.Screen name="Edit ToDo" component={EditToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
