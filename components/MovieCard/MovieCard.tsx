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
    position: number;
    removeMovies: (position:number) => void;
}

const MovieCard: React.FC<MovieProps> = (card: MovieProps) => {
    const [isChecked, setIsChecked] = useState(card.checked);
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
           gap:5,
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
            width: 130,
            height: 195,
            objectFit:'contain'
        },
        description:{
            color: card.textColor,
            flexShrink: 1,
            
        },
        headerInfo:{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 10,
        }
    });


    async function changeIsChecked(newValue:boolean){
       setIsChecked(newValue);
      const result =  await JuntinMovieService.changeView(card.id, newValue);
        
      if(result.isWatchedEveryone){
            card.removeMovies(card.position);
        }

    }

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
                <View style={styles.headerInfo}>
                    <Text>Viewed</Text>
                <Switch 
    value={isChecked} 
    onValueChange={(newValue) => {
        changeIsChecked(newValue);
    }} 
/>

                </View>
   
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.ownerName}>{card.ownerName}</Text>
            <Text style={styles.description}>{description}</Text>
  
            </View>
        </LinearGradient>
    );
};

export default MovieCard;