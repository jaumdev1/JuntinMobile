import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyles from './styles'; 
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import MoviesScreen from './screens/MoviesScreen/MoviesScreen';
import { CardDataProvider } from './context/CardDataContext';
import AuthMiddleware from './middlewares/Auth';
import Register from './screens/Register/Register';
import { RootParamList } from './interfaces/RoutesRootParam/RootParamList';
import HistoricJuntinPlay from './screens/HistoricJuntinPlay/HistoricJuntinPlay';
import InviteJuntinPlay from './screens/InviteJuntinPlay/InviteJuntinPlay';

const Stack = createStackNavigator<RootParamList>();
const linking = {
  prefixes: ['juntinplay://', 'https://juntinplay.com'],
  config: {
    screens: {
      InviteJuntinPlay: 'invite/:codeInvite',
    },
  },
};
const App = () => {
  return (
    <CardDataProvider>
      <NavigationContainer linking={linking} > 
        <Stack.Navigator initialRouteName="AuthMiddleware" screenOptions={{
            headerStyle: { elevation: 0 },
            cardStyle: { backgroundColor: GlobalStyles.container.backgroundColor},
        }}>
          <Stack.Screen name="AuthMiddleware" component={AuthMiddleware} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home"  component={Home}  />
          <Stack.Screen name="MoviesScreen" component={MoviesScreen}
           options={{ title: `Juntin` }}
            />
          <Stack.Screen name="Register" component={Register}  />
          <Stack.Screen name="HistoricJuntinPlay" component={HistoricJuntinPlay} 
          options={{ title: `History` }}
          />
          <Stack.Screen name="InviteJuntinPlay" component={InviteJuntinPlay} 
           options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CardDataProvider>
  );
};

// ... rest of your code
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
