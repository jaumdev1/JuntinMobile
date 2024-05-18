import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../styles'; 
import { SvgUri, SvgXml } from 'react-native-svg';
import {AuthenticationService} from '../../services/AuthenticationService';
import apiCall from '../../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../interfaces/RoutesRootParam/RootParamList';
import * as yup from 'yup';

const schema = yup.object().shape({
  login: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});



const Login = () => {
  type NavigationProp = StackNavigationProp<RootParamList>;
  const navigation = useNavigation<NavigationProp>();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSignIn = async () => {
    try {
      await schema.validate({ login, password });

      let authenticate = new AuthenticationService(apiCall);
      const isAuthenticated = await authenticate.authenticate(login, password);
      
      if (isAuthenticated) {
        navigation.navigate('Home' as never);
      }
    } catch (error:any) {
      Alert.alert('Error', error.message);
    }
   
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
         <Text style={styles.title}>JuntiN</Text>
<Image
      source={require('../../assets/imgs/logojuntin.png')} 
      style={{ width: 130, height: 130 }} 
      resizeMode="contain" 
    />

   
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={login}
          onChangeText={setLogin}
        />
   
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      
      </View>
      <TouchableOpacity 
        style={styles.signInButton}
        onPress={handleSignIn}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.containerSignUp}>
      <Text>Dont have an account?</Text>
      <TouchableOpacity 
        style={styles.signUpButton}
        onPress={handleSignUp}
      >
       

        <Text style={styles.signUpButtonText}>Sign Up</Text>
       
        
      </TouchableOpacity>
      </View>
      <View>
      <View style={styles.blackBalloon} />
      <View style={styles.grayBalloon} />
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 5,
  },
  input: {
    width: 300,
    height: 40,
    padding:10,
    borderWidth: 0.1, 
    borderColor:'rgba(1,1, 1, 0.5)',
    backgroundColor: 'rgba(200,200, 200, 0.1)',
    borderRadius: 20,
    paddingHorizontal:20,
  },
 
  buttonText: {
    fontSize: 18,
    color: '#FAF6F0', 
    fontFamily: 'RobotoMono-SemiBold',
    
  },
  title: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 24,
    marginBottom: 16,
    color: GlobalStyles.container.primaryColor
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.container.primaryColor, 
    borderRadius: 50, 
    paddingVertical: 12,
    paddingHorizontal:  100,
    marginTop:30,

  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 14,
    color: GlobalStyles.container.primaryColor,
    fontFamily: 'RobotoMono-Regular',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
  },
  containerSignUp:{
    paddingTop:40,
    alignItems:'center',
    justifyContent:'center'
  },
  blackBalloon: {
    position: 'absolute',
    bottom: -300, 
    left: 20,
    width: 300,
    height: 300,
    backgroundColor: 'black',
    borderRadius: 150,
    opacity: 0.9,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  grayBalloon: {
    position: 'absolute',
    bottom: -280, 
    right:90,
    width: 200,
    height: 200,
    backgroundColor: 'black',
    borderRadius: 100,
    opacity: 0.8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Login;
