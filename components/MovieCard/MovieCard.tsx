import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MovieProps {
    id: string;
    name: string;
    ownerName: string;
}

const MovieCard: React.FC<MovieProps> = (card: MovieProps) => {
    return (
        <LinearGradient
             colors={['#ff4d4d', '#ff9933']}
            style={styles.movieCard}
            start={{ x: 0, y: 0 }} 
            end={{ x: 4, y: 0 }} 
        >
            <View style={styles.imageContainer}>
        {/* Imagem ocupando a altura toda a esquerda */}
              <Image source={require('../../assets/imgs/terror.png')} style={styles.image} />
            </View>


            <View style={styles.info}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.ownerName}>{card.ownerName}</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    movieCard: {
        flexDirection: 'row',
        width: '90%',  
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    info:{
       flex:5,
       padding:5
    },
    cardName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ownerName: {
        color: '#fff',
        fontSize: 14,
    },
    imageContainer: {
        marginRight: 10,
        flex:1,
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
});

export default MovieCard;
