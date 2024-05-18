import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import GlobalStyles from '../../styles';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import JuntinService from '../../services/JuntinService';
import Clipboard from '@react-native-clipboard/clipboard';
const MenuJuntin = ({ isVisible, onClose, juntin, openEditJuntin, onRefresh }: { isVisible: boolean, onClose: () => void, juntin: Juntin, openEditJuntin:()=>void, onRefresh:()=>void }) => {
  const handleEdit = () => {
    openEditJuntin();
    onClose();
  };

  const handleDelete = async () => {
    await JuntinService.deleteJuntin(juntin.id);
    onRefresh();
    onClose();
  };

const createInvite = async () => {
    var invite = await JuntinService.createInviteJuntin(juntin);
    if (invite) {
        Alert.alert(
            "Invite created",
            `The invite code is: ${invite}`,
            [
                { text: "OK", onPress: () => {} },
                { text: "Copy", onPress: () => invite && Clipboard.setString(invite) }
            ]
        );
    } else {
        Alert.alert(
            "Error",
            "Failed to create invite",
            [
                { text: "OK", onPress: () => {} }
            ]
        );
    }
}
  const confirmDelete = () => {
    Alert.alert(
      "Delete Juntin",
      "Are you sure you want to delete this Juntin?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: handleDelete }
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={createInvite}>
            <Text style={styles.modalOption}>Create Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.modalOption}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete}>
            <Text style={styles.modalOption}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalOption}>Cancel</Text>
          </TouchableOpacity>
    
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
   
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalOption: {
      fontSize: 18,
      marginVertical: 10,
    },
  });
  
export default MenuJuntin;
