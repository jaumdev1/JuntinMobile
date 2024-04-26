import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { MovieResultProps, } from './MovieResult/MovieResult';
import MovieResult from './MovieResult/MovieResult';

interface AddMovieModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSearch: (movieName: string) => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isVisible, onClose, onSearch }) => {
  const [movieName, setMovieName] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieResultProps[]>([]);

  const handleSearch = () => {

    console.log('Buscar filme:', movieName);
    fetchMoviesFromAPI();

  };


  const fetchMoviesFromAPI = async () => {
    try {
      const apiKey = '8320a0a15131fba8571c70671d04e1f3';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzIwYTBhMTUxMzFmYmE4NTcxYzcwNjcxZDA0ZTFmMyIsInN1YiI6IjY2MTgwODlhN2UxMmYwMDEzMGYxMzhjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0rouW1pbsvkeaTjIM6e01ZrwxHs6vdJIQ6fHuWI3Evs'
        }
      };
      const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Erro ao buscar filmes');
      }
      const data = await response.json();
      setSearchResults(data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.original_title,
        imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ''
      })));

    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os filmes. Por favor, tente novamente mais tarde.');

    }
  };
  const addToPlaylist = (id: number, title: string) => {

    console.log(`Filme adicionado à playlist: ${title}`);
  };
  
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicionar Filme</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do filme"
            value={movieName}
            onChangeText={setMovieName}
          />
          <Button title="Buscar" onPress={handleSearch} />
          <ScrollView style={styles.scrollView}>
            {searchResults.map((result, index) => (
              <MovieResult
                key={index}
                id={result.id}
                title={result.title}
                imageUrl={result.imageUrl}
                onAddToPlaylist={() => addToPlaylist(result.id, result.title)}
              />
            ))}
          </ScrollView>

          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 200,
  },
});

export default AddMovieModal;
