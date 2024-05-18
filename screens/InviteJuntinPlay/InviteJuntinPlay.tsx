import { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import JuntinService from '../../services/JuntinService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../interfaces/RoutesRootParam/RootParamList';

const InviteJuntinPlay = () => {
    type NavigationProp = StackNavigationProp<RootParamList>;
    const navigation = useNavigation<NavigationProp>();
    const route:any = useRoute();

    const acceptInvite = async (code:string) => {
        await JuntinService.acceptInviteJuntin(code);
        navigation.navigate('Home');
    }; 
    const refuseInvite = (code:string) => {
        navigation.navigate('Home');
    }
    useEffect(() => {
     
        const handleDeepLink = (codeInvite: string) => {
           
            Alert.alert(
                'Invite received',
                'You have been invited to a Juntin. Do you accept the invitation?',
                [
                    {
                        text: 'Não',
                        onPress: () => refuseInvite(codeInvite),
                        style: 'cancel',
                    },
                    {
                        text: 'Sim',
                        onPress: () => acceptInvite(codeInvite),
                    },
                ],
                { cancelable: false },
            );
        };
        const initialDeepLink = route.params?.codeInvite;
        if (initialDeepLink) {
            handleDeepLink(initialDeepLink);
        }
    }, [route.params]);

    return (
        <View>
         
            
        </View>
    );
};

export default InviteJuntinPlay;