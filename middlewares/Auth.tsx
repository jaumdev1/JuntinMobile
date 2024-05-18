import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../interfaces/RoutesRootParam/RootParamList';


  type NavigationProp = StackNavigationProp<RootParamList>;
  
const AuthMiddleware = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem('@authorization');
      if (user) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthMiddleware;