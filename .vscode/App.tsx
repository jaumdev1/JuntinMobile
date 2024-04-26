// App.js

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyles from './styles'; 
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';

const Stack = createStackNavigator();

const App = () => {
  
  return (
   
      <NavigationContainer > 
        <Stack.Navigator screenOptions={{
            headerStyle: { elevation: 0 },
            cardStyle: { backgroundColor: GlobalStyles.container.backgroundColor},
      
        }}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home}  />
        </Stack.Navigator>
      </NavigationContainer>
     
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotoMonoRegular: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 20,
  },
 
});
export default App;
