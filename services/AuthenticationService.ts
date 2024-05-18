import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export class AuthenticationService {
  private apiCall: any;

  constructor(apiCall: any) {
      this.apiCall = apiCall;
  }

    public async authenticate(username: string, password: string): Promise<boolean> {
        try {
          const response = await this.apiCall.post('/authentication', { username, password });
          const token = response.headers['authorization'];
          const refreshToken = response.headers['refreshauthorization'];
          await AsyncStorage.setItem('@authorization', token);
          await AsyncStorage.setItem('@refreshAuthorization', refreshToken);
          return true;
        } catch (error) {
          const axiosError = error as AxiosError;
          let data:any = axiosError.response?.data;
          if (axiosError.response && axiosError.response.status === 401) {
            Alert.alert(
              "Authentication Failed",
              `${data.error.message}.`,
              [
                { text: "OK", onPress: () => {} }
              ]
            );
          }else{
            Alert.alert(
              "Error",
              `Sorry, an error occurred. Please try again later.`,
              [
                { text: "OK", onPress: () => {} }
              ]
            );
          }
        }
        return false;
    }

    public async refreshToken(): Promise<string> { 
      const token = await AsyncStorage.getItem('@refreshAuthorization');
    
        try{
          if (token) {
        const response = await this.apiCall.get('/refreshAuthentication', token);
    
        const newToken = response.headers['authorization'];

        const newRefreshToken = response.headers['refreshauthorization'];
   
        await AsyncStorage.setItem('@authorization', newToken);
        await AsyncStorage.setItem('@refreshAuthorization', newRefreshToken);
     
        return newToken;
        }
        return '';
        } catch (error) {
          throw error;
        }
    }
    
   
  }

