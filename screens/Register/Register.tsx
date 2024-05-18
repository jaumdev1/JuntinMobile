import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { User } from '../../interfaces/User/User';
import GlobalStyles from '../../styles';
import UserService from '../../services/UserService';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { RootParamList } from '../../interfaces/RoutesRootParam/RootParamList';
import { StackNavigationProp } from '@react-navigation/stack';
const Register: React.FC = () => {
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    type NavigationProp = StackNavigationProp<RootParamList>;
    const navigation = useNavigation<NavigationProp>();
    const schema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Confirm Password is required'),
      });

    const handleInputChange = (key: keyof User, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: value,
        }));
    };

     const handleSignUp = async () => {
    try {
      await schema.validate(user);
      var createdUser = await UserService.createUser(user);
      if (createdUser) {
        Alert.alert(
          "Success",
          `User created successfully.`,
          [
            { text: "OK", onPress: () => navigation.navigate('Login') }
          ]
        )
      }
    } catch (error:any) {
      Alert.alert(
        "Validation Error",
        error.message,
        [
          { text: "OK", onPress: () => {} }
        ]
      )
    }
  };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>JuntiN</Text>
            <Image
                source={require('../../assets/imgs/logojuntin.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={user.username}
                onChangeText={(value) => handleInputChange('username', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={user.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={user.password}
                onChangeText={(value) => handleInputChange('password', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={user.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
            />
            <TouchableOpacity style={styles.buttonContainer}         onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text> 
            </TouchableOpacity>

            <View style={styles.blackBalloon} />
      <View style={styles.grayBalloon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        padding:10,
        borderWidth: 0.1, 
        borderColor:'rgba(1,1, 1, 0.5)',
        backgroundColor: 'rgba(200,200, 200, 0.1)',
        borderRadius: 20,
        paddingHorizontal:20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalStyles.container.primaryColor,
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 100,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#FAF6F0', 
        fontFamily: 'RobotoMono-SemiBold',
      },
      blackBalloon: {
        zIndex: -1,
        position: 'absolute',
        bottom: -200, 
        left: 290,
        width: 150,
        height: 150,
        backgroundColor: 'black',
        borderRadius: 150,
        opacity: 0.8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
      grayBalloon: {
       
        zIndex: -1,
        position: 'absolute',
        bottom: -200, 
        left: -100,
        width: 200,
        height: 200,
        backgroundColor: 'black',
        borderRadius: 150,
        opacity: 0.8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
});

export default Register;