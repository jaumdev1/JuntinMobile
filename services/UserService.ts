import { AxiosError } from "axios";
import { User } from "../interfaces/User/User";
import apiCall from "./api";
import { Alert } from "react-native";

class UserService{
    public static async createUser(user: User): Promise<boolean> {

        try {
          const response = await apiCall.post('/user', user);
          return true;
        } catch (error) {
          const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
                Alert.alert(
                "Error",
                `User with email ${user.email} or ${user.username} already exists.`,
                [
                    { text: "OK", onPress: () => {} }
                ]
                )
            } else { 

          Alert.alert(
            "Error",
            `Sorry, an error occurred. Please try again later.`,
            [
              { text: "OK", onPress: () => {} }
            ]
          )
        }
        return false;

    }
}
}

export default UserService;

