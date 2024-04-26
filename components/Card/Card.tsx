import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import GlobalStyles from '../../styles';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  id: string;
  name: string;
  color: string;
  ownerName: string;
  category: string;
  peopleCount: number;
  moviesCount: number;
}

const Card: React.FC<CardProps> = (card: CardProps) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleJuntin = () => {
    navigation.navigate('MainJuntin', { cardData: card });
  };

  const handleEdit = () => {

    setModalVisible(false); 
  };

  const handleDelete = () => {
    
    setModalVisible(false); 
  };

  return (
    <TouchableOpacity onPress={handleJuntin}>
    
      
      <View style={[styles.card, { backgroundColor: card.color }]}>
     
        <View style={styles.imageContainer}>
          {/* Imagem ocupando a altura toda a esquerda */}
          <Image source={require('../../assets/imgs/terror.png')} style={styles.image} />
        </View>
        
        <View style={styles.middleContent}>
          {/* Nome e categoria no meio ocupando toda a altura do card */}
          <Text style={styles.textJuntinName} numberOfLines={2}>{card.name}</Text>
          <Text style={styles.text} numberOfLines={1}>{card.category}</Text>
          <View style={styles.infoContainer}>
            {/* Informações de pessoas e filmes */}
            <View style={styles.info}>
              <Text style={styles.infoTextValue}>{card.peopleCount || 0}</Text>
              <Text style={styles.infoText}>People(s)</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoTextValue}>{card.moviesCount || 0}</Text>
              <Text style={styles.infoText}>Movie(s)</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBottom}>
        <View style={styles.header}>
        
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {/* Botão de três pontos */}
          <Text style={styles.moreButton}>...</Text>
        </TouchableOpacity>
        
         </View>
          {/* Owner na direita ocupando a altura do card inteira */}
          <Text style={styles.textOwner}>{card.ownerName}</Text>
        </View>
    


        <View style={styles.blackBalloon} />
        <View style={styles.grayBalloon} />
        {/* Modal para editar/excluir */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.modalOption}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.modalOption}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalOption}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header:{
 
  },
  card: {
    width: '100%',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  imageContainer: {
    marginRight: 10,
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  middleContent: {
    padding: 5,
    flex: 3,
    gap: 5
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'RobotoMono-Regular',
    color: GlobalStyles.container.secondaryColor,
  },
  cardBottom: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 12,
    fontFamily: 'RobotoMono-Regular',
    color: 'red',
    opacity: 0.8,
    maxWidth: '100%',
  },
  textJuntinName: {
    fontSize: 18,
    color: GlobalStyles.container.secondaryColor,
  },
  textOwner: {
    fontFamily: 'RobotoMono-Italic',
    fontSize: 16,
    color: GlobalStyles.container.secondaryColor,
  },
  infoTextValue: {
    color: 'red',
  },
  grayBalloon: {
    zIndex: -2,
    position: 'absolute',
    bottom: -50,
    right: -70,
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 100,
    opacity: 0.3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  blackBalloon: {
    zIndex: -5,
    position: 'absolute',
    bottom: -40,
    left: -100,
    width: 200,
    height: 200,
    backgroundColor: 'black',
    borderRadius: 150,
    opacity: 0.1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  moreButton: {
    fontSize: 24,
    color: '#fff',
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
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Card;
