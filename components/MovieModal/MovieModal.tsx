import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { MovieResultProps, } from './MovieResult/MovieResult';
import MovieResult from './MovieResult/MovieResult';
import MovieService from '../../services/MovieService';
import { MovieResponse } from '../../interfaces/Movie/MovieResponse';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import { CardDataContext } from '../../context/CardDataContext';
import AddMovieModal from './AddMovieModal/AddMovieModal';

interface AddMovieModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSearch: (movieName: string) => void;
  onRefresh: () => void;
  juntin: Juntin;
}

const MovieModal: React.FC<AddMovieModalProps> = ({ isVisible, onClose, onSearch, onRefresh }) => {
  const [movieName, setMovieName] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieResultProps[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieResultProps | null>(null);
  const [isVisibleAddMovie, setIsVisibleAddMovie] = useState<boolean>(false);

  const handleSearch = () => {
    fetchMoviesFromAPI();
  };


  const fetchMoviesFromAPI = async () => {
      const movies = await MovieService.getMovies(movieName);
      const search = movies.map((movie: MovieResponse) => {
     
      return {
          title: movie.title,
          urlImage: movie.urlImage,
          description: movie.description,
          tmdbId: movie.tmdbId,
      } as MovieResultProps;
      });
      
      setSearchResults(search);

    
  };

  const addToJuntin = (movie:MovieResultProps) => {
    setSelectedMovie(movie);
    setIsVisibleAddMovie(true);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Movie</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the name of the movie"
            value={movieName}
            onChangeText={setMovieName}
          />
          <Button color='#ff4d4d' title="Search" onPress={handleSearch} />
          <ScrollView style={styles.scrollView}>
            {searchResults.map((result, index) => (
              <MovieResult
                key={index}
                title={result.title}
                urlImage={result.urlImage}
                description={result.description}
                tmdbId={result.tmdbId}
                onAddToPlaylist={() => addToJuntin(result)}
              />
              
            ))}
          </ScrollView>

          <Button color='#222' title="Close" onPress={onClose} />
        </View>
      </View>
      {selectedMovie && 
      <AddMovieModal isVisible={isVisibleAddMovie} 
      movieResult={selectedMovie} 
      onRefresh={onRefresh}
      onClose={()=>{setIsVisibleAddMovie(false); 
      setSelectedMovie(null);}
      } />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  search:{

  },
  close:{

  },
  modalContainer: {
    width: '100%',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    gap: 5,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
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
  },
  scrollView: {
    maxHeight: 400,
  },
});

export default MovieModal;
