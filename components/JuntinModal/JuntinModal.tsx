import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

const AddJuntinModal = ({ isVisible, onClose }) => {
  const [juntinData, setJuntinData] = useState({
    nome: '',
    cor: '',
    categoria: ''
  });

  const handleAddJuntin = () => {
    // Aqui você pode fazer algo com os dados do juntin, por exemplo, enviá-los para algum lugar ou fazer alguma ação com eles.
    console.log('Dados do Juntin:', juntinData);
    // Você pode adicionar mais lógica aqui, como redefinir os campos, etc.
    onClose(); // Fechando o modal após adicionar o juntin
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
          <Text style={styles.modalTitle}>Adicionar Juntin</Text>
      
          <TextInput
            style={styles.input}
            placeholder="Nome do Juntin"
            value={juntinData.nome}
            onChangeText={text => setJuntinData({ ...juntinData, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Cor"
            value={juntinData.cor}
            onChangeText={text => setJuntinData({ ...juntinData, cor: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={juntinData.categoria}
            onChangeText={text => setJuntinData({ ...juntinData, categoria: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddJuntin}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '90%', // Ajuste para ocupar 90% da largura total
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

export default AddJuntinModal;
