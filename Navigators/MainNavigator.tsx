import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from '../screens/WelcomeScreen';
import UsuarioScreen from '../screens/UsuarioScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={ScoreScreen} />
      <Tab.Screen name="Juego" component={GameScreen} />
      <Tab.Screen name="Usuario" component={UsuarioScreen} />

    </Tab.Navigator>
  );
}

function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='WELCOME' component={ WelcomeScreen} />
        <Stack.Screen name="Tabs" component={MyTabs} />
      </Stack.Navigator>
    );
  }


export default function TopTabNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
