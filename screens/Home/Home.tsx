import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../../components/Card/Card';
import AddJuntinModal from '../../components/JuntinModal/JuntinModal';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const playlists = [
    {
      id:"DASD2323HJFGS#3231",
      nameJuntin: "Filmesmeuamigos",
      color: "#222",
      owner: "joao",
      category: "terror"
    },
    {
      id:"DASD2323HJFGS#3231",
      nameJuntin: "OutraPlaylist",
      color: "#222",
      owner: "outroDono",
      category: "comédia"
    },
    {
      id:"DASD2323HJFGS#3231",
      nameJuntin: "MaisUmaPlaylist",
      color: "#222",
      owner: "outroDono",
      category: "ação"
    },
    
   
  ];
  const handleAddJuntin = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddJuntin}>
          <Text style={styles.buttonText}>Adicionar Juntin</Text>
        </TouchableOpacity>
      </View>
      </View>
       <View style={styles.content}>
      <Text style={styles.subtitle}>Your Juntin's</Text>
      {playlists.map((playlist, index) => (
        <Card
          key={index}
          id={playlist.id}
          name={playlist.nameJuntin}
          color={playlist.color}
          ownerName={playlist.owner}
          category={playlist.category}
          peopleCount = {5}
          moviesCount = {30}
        />
      ))}
      </View>
      <AddJuntinModal isVisible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    alignItems:'flex-end',
    justifyContent:'flex-end',

  },
  content:{
    alignItems:'center',
    justifyContent:'center',
    
  },
  addButton: {
    backgroundColor: '#222', 
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-end', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    padding:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default Home;
