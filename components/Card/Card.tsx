import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import GlobalStyles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import MenuJuntin from '../MenuJuntin/MenuJuntin';
import JuntinModal from '../JuntinModal/JuntinModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../interfaces/RoutesRootParam/RootParamList';

const Card: React.FC<{ card: Juntin, onRefresh: () => void }> = ({ card, onRefresh }) => {
  type NavigationProp = StackNavigationProp<RootParamList>;
  const navigation = useNavigation<NavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleJuntin = () => {
    navigation.navigate('MoviesScreen', { card: card });
  };

  const handleMenuJuntin = () => {
    setIsMenuVisible(true);
  }
  const openEditJuntin = () => {
    setIsModalVisible(true);
  }
  const closeMenu = () => {
    setIsMenuVisible(false);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };
  

  return (
    <TouchableOpacity onPress={handleJuntin}>
      <View style={[styles.card, { backgroundColor: card.color }]}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleMenuJuntin()}>
            <Text style={[styles.moreButton, { color: card.textColor }]}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.middleContent}>
          <View style={styles.headerContent}>
          <Text style={[styles.textJuntinName, { color: card.textColor  }]} numberOfLines={2}>{card.name}</Text>
          <Text style={[styles.text, { color: card.textColor  }]} numberOfLines={1}>{card.category}</Text>
          </View>
     
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={[styles.infoTextValue, { color: card.textColor  }]}>{card.peopleCount || 0}</Text>
              <Text style={[styles.infoText, { color: card.textColor  }]}>People(s)</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.infoTextValue, { color: card.textColor  }]}>{card.moviesCount || 0}</Text>
              <Text style={[styles.infoText, { color: card.textColor  }]}>Movie(s)</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <Text style={[styles.textOwner, { color: card.textColor  }]}>{card.ownerName}</Text>
        </View>

        <View style={[styles.blackBalloon, {backgroundColor:card.textColor}]} />
        <View style={[styles.grayBalloon, {backgroundColor:card.textColor}]} />
      </View>

      <MenuJuntin isVisible={isMenuVisible} onRefresh={onRefresh} onClose={closeMenu} openEditJuntin={openEditJuntin} juntin={card} />
      <JuntinModal isVisible={isModalVisible} onClose={closeModal} editing={true} juntin={card} onRefresh={onRefresh} />
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    width: '100%',
    padding: 5,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'column',
    overflow: 'hidden',
    color: '#ffffff',
    shadowColor: "#000",
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},

  headerContent:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
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
    justifyContent: 'flex-end',
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
    
  },
  cardBottom: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 12,
    fontFamily: 'RobotoMono-Regular',
    opacity: 0.8,
    maxWidth: '100%',
  },
  textJuntinName: {
    fontSize: 18,
  },
  textOwner: {
    fontFamily: 'RobotoMono-Italic',
    fontSize: 16,
  },
  infoTextValue: {
  },
  grayBalloon: {
    zIndex: -2,
    position: 'absolute',
    bottom: -50,
    right: -70,
    width: 150,
    height: 150,
    borderRadius: 100,
    opacity: 0.05,
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
    width: 150,
    height: 150,
    borderRadius: 150,
    opacity: 0.05,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  moreButton: {
    fontSize: 24,
  
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
