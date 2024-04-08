/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import BinaryScreen from './Screens/BinaryScreen';
import { Dimensions, StatusBar,View } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Binary: undefined; // Add other screens as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  return (
    <>
    <StatusBar hidden></StatusBar>
    <View style={{height:windowHeight, width:windowWidth}} className='flex-1'>

    <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Binary" component={BinaryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
    </View>
    </>
  );
}



export default App;
