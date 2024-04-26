import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import GlobalStyles from '../../styles'; 
interface CardProps {
  name: string;
  color: string;
  ownerName: string;
  category: string;
}

const Card: React.FC<CardProps> = (card: CardProps) => {
  return (
    <View style={[styles.card, { backgroundColor: card.color }]}>
      <View style={styles.row}>
        <Text style={styles.text}>{card.name}</Text>
        <Text style={styles.text}>{card.category}</Text>
      </View>
      <View style={styles.cardbotton}>
      <Text style={styles.textOwner}>{card.ownerName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardbotton: {
    marginTop:10,
    alignItems:'flex-end'
  },
  text: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Regular',
    color: GlobalStyles.container.secondaryColor,
  },
  textOwner:{
    fontFamily: 'RobotoMono-Italic',
    fontSize: 16,
    color: GlobalStyles.container.secondaryColor,
  }
});

export default Card;
