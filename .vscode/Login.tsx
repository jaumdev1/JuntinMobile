import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../styles'; 
import { SvgUri } from 'react-native-svg';

const Login = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Lógica para autenticação do usuário
    navigation.navigate('Home' as never);
  };

  const handleSignUp = () => {
    // Navegar para a tela de registro
    // navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
    <SvgUri
        width="200"
        height="200"
        uri={require('../../assets/imgs/logo.svg')} 
      />
      <Text style={styles.title}>JuntiN</Text>
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
    borderColor:'rgba(1,1, 1, 0.8)',
    backgroundColor: 'rgba(200,200, 200, 0.1)',
    borderRadius: 2,
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
    marginTop:30

  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 14,
    color: GlobalStyles.container.primaryColor,
    fontFamily: 'RobotoMono-Regular',
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
    width: 150,
    height: 150,
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
