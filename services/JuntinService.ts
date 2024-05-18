import { AxiosError } from "axios";
import { InviteJuntin } from "../interfaces/Juntin/InviteJuntin";
import { Juntin } from "../interfaces/Juntin/Juntin";
import apiCall from "./api";
import { Alert } from "react-native";

class JuntinService {
    async getJuntins(page:number=1) {
        try {
            let url = `/JuntinPlay?page=${page}`;
            const response = await apiCall.get(url); 
            return response.data.data as Juntin[];
          } catch (error) {
            throw error;
       }
    }
    async getJuntin(id: string) {
        try {
            const response = await apiCall.get(`/JuntinPlay/${id}`);
            return response.data.data as Juntin;
        } catch (error) {
            throw error;
        }
    }

    async createInviteJuntin(juntin: Juntin) {
        var newInvite = {
            juntinPlayId: juntin.id,
        }
   
        try {
            const response = await apiCall.post('/JuntinPlay/invite', newInvite);
            return response.data.data as string;

        } catch (error) {
           console.log(error);
        }
    }

    async acceptInviteJuntin(code: string) {
        var invite = {
            code: code,
            IsAccepted: true
        }

        try {
            const response = await apiCall.post(`/JuntinPlay/invite/accept`, invite);
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            let data:any = axiosError.response?.data;
            console.log(axiosError?.response?.status);
            if (axiosError.response && axiosError.response.status === 400) {
                Alert.alert(
                  "Expired or User already accepted",
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
    }
    async createJuntin(juntin: Juntin) {
        try {
            const response = await apiCall.post('/JuntinPlay', juntin);
            return response.data as Juntin;
        } catch (error) {
            throw error;
        }
    }
    async updateJuntin(juntin: Juntin) {
        try {
            const response = await apiCall.put(`/JuntinPlay`, juntin);
            return response.data as Juntin;
        } catch (error) {
            throw error;
        }
    }
    async deleteJuntin(id: string) {
        try {
            const response = await apiCall.delete(`/JuntinPlay/${id}`);
            return response.data as Juntin;
        } catch (error) {
            throw error;
        }
    }

}
export default new JuntinService();