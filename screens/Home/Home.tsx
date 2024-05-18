import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Card from '../../components/Card/Card';
import JuntinModal from '../../components/JuntinModal/JuntinModal';
import JuntinService from '../../services/JuntinService';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import MenuJuntin from '../../components/MenuJuntin/MenuJuntin';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [juntins, setJuntins] = useState([]as Juntin[]);
  const [refreshing, setRefreshing] = useState(false);

  const handleAddJuntin = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const onRefresh = () => {
    fetchJuntins();
  };
  const fetchJuntins = async () => {
    setRefreshing(true);
    const juntins = await JuntinService.getJuntins(1);
    setJuntins(juntins);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchJuntins();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchJuntins}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddJuntin}>
            <Text style={styles.buttonText}>Add Juntin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Your Juntin's</Text>
          {juntins.map((playlist, index) => (
            <Card
              key={index}
              card={playlist}
              onRefresh={onRefresh}
            />
          ))}
        </View>
        <JuntinModal isVisible={isModalVisible} onRefresh={onRefresh} onClose={closeModal} />
      </ScrollView>
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
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
  scrollView:{
    padding:10,
  }
});

export default Home;
