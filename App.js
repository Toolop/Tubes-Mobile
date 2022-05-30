import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity} from 'react-native';

import Home from './UI/page/Home';

const Stack = createStackNavigator();


const Detail = () =>{
  return(
    <Text>Resep Terbaru</Text>
  )
}

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

