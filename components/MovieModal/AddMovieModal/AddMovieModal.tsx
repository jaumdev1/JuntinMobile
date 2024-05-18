import React, { useContext, useState } from 'react';
import { Modal, Text, TextInput, Button, View, StyleSheet, ScrollView, TextInputBase } from 'react-native';
import JuntinMovieService from '../../../services/JuntinMovieService';
import { Movie } from '../../../interfaces/Movie/Movie';
import { CardDataContext } from '../../../context/CardDataContext';
import { MovieResultProps } from '../MovieResult/MovieResult';
import { Image } from 'react-native';

interface AddMovieModalProps {
    onClose: () => void;
    isVisible: boolean;
    movieResult:MovieResultProps | null;
    onRefresh:()=>void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ onClose, isVisible, movieResult, onRefresh }) => {
    const context = useContext(CardDataContext);

    if (!context) {
      throw new Error('useCardData must be used within a CardDataProvider');
    }
    
    const { juntinData, setJuntinData } = context;

    const [movie, setMovie] = useState<Movie>({
        title: movieResult?.title || '' ,
        urlImage: movieResult?.urlImage || '',
        description:    movieResult?.description || '',
        tmdbId: movieResult?.tmdbId || 0,
        juntinPlayId: juntinData.id,
        userName: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };

    const handleAddMovie = async() => {
        await JuntinMovieService.createMovie(movie);
        await onRefresh();
        onClose();
       
    };

    return (
        <Modal visible={isVisible} animationType="slide"  onRequestClose={onClose}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Add Movie</Text>
                <Image source={{ uri: movie.urlImage }} style={styles.image} />
                 <Text style={styles.subtitle}>{movie.title}</Text>
                 <View style={styles.containerSubtitle}>
                 <Text style={styles.subtitle}>Description</Text>
                <TextInput
                   
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('description', value)}
                    value={movie.description}
                    placeholder="Description"
                    multiline
                />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color='#222' title="Close" onPress={onClose} />
                    <Button  color='#ff4d4d' title="Add Movie" onPress={handleAddMovie} />
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle:{
        fontSize: 16,
        marginBottom: 20,
    },
    containerSubtitle:{
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default AddMovieModal;