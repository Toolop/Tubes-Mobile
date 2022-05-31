import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './UI/page/Home';
import Detail from './UI/page/Detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Stack.Screen name="Detail" component={Detail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

