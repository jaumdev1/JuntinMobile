import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native';
import JuntinMovieService from '../../services/JuntinMovieService';
interface MovieProps {
    id: string;
    name: string;
    ownerName: string;
    textColor: string;
    color: string;
    urlImage:string;
    description:string;
    checked: boolean;
}

const MovieCard: React.FC<MovieProps> = (card: MovieProps) => {
    const styles = StyleSheet.create({
        movieCard: {
            flexDirection: 'row',
            width: '100%',  
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
            alignItems:'center',
            overflow: 'hidden',
            gap:5
        },
        info:{
           padding:5,
           alignItems:'flex-start',
           justifyContent:'flex-start',
           flex: 1,
           gap:20,
           height:'100%',
        },
        cardName: {
            color: card.textColor,
            fontSize: 18,
            fontWeight: 'bold',
        },
        ownerName: {
            color: card.textColor,
            fontSize: 14,
        },
        imageContainer: {
           justifyContent: 'flex-start', 
        },
        image: {
            width: 120,
            height: 180,
            objectFit:'contain'
        },
        description:{
            color: card.textColor,
            flexShrink: 1,
            
        }
    });

    const description = card.description.length > 100 
        ? `${card.description.substring(0, 100)}...` 
        : card.description;

    return (
        <LinearGradient
             colors={[`${card.color}`, `${card.color}`]}
            style={styles.movieCard}
            start={{ x: 0, y: 0 }} 
            end={{ x: 4, y: 0 }} 
        >
            <View style={styles.imageContainer}>
              <Image source={{uri:card.urlImage}} style={styles.image} />
            </View>
            <View style={styles.info}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.ownerName}>{card.ownerName}</Text>
            <Text style={styles.description}>{description}</Text>
            </View>
        </LinearGradient>
    );
};

export default MovieCard;