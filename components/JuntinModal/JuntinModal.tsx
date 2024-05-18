import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import JuntinService from '../../services/JuntinService';
import { Picker } from '@react-native-picker/picker';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { TextColorPicker } from '../TextColorPicker/TextColorPicker';
const JuntinModal = ({ isVisible, onClose, editing = false, juntin, onRefresh }: { isVisible: boolean, onClose: () => void, editing?: boolean, juntin?: Juntin, onRefresh: () => void },) => {
  const [juntinData, setJuntinData] = useState(juntin || {} as Juntin);

  const [title, setTitle] = useState(editing ? 'Update' : 'Add');

  const handleAddJuntin = async () => {
    if (juntinData.id) {
      await JuntinService.updateJuntin(juntinData);
    } else {
      await JuntinService.createJuntin(juntinData);

    }
    onRefresh();
    onClose();
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
          <Text style={styles.modalTitle}>{title} Juntin</Text>
          <View style={styles.containerInput}>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="your favorite name"
              value={juntinData.name}
              onChangeText={text => setJuntinData({ ...juntinData, name: text })}
            />
          </View>
          <View style={styles.containerInput}>
            <Text>Color</Text>
            <View style={styles.input}>
              <ColorPicker
                selectedColor={juntinData.color}
                onColorSelect={(color: string) => setJuntinData({ ...juntinData, color })}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text>Text Color</Text>
            <View style={styles.input}>
              <TextColorPicker
                selectedColor={juntinData.textColor}
                onColorSelect={(textColor: string) => setJuntinData({ ...juntinData, textColor })}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="terror, action, etc."
              value={juntinData.category}
              onChangeText={text => setJuntinData({ ...juntinData, category: text })}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddJuntin}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    gap: 10,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JuntinModal;
