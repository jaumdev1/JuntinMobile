import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GlobalStyles from '../../styles';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
interface CardProps {
  id: string;
  name: string;
  color: string;
  ownerName: string;
  category: string;
  peopleCount: number;
  moviesCount: number;
}

interface Movie {
  id: string;
  title: string;
}

interface RouteParams {
  cardData: CardProps;
}

const MainJuntin: React.FC = () => {
  const route = useRoute();
  const { cardData } = route.params as RouteParams;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
 
  useEffect(() => {
    navigation.setOptions({ title: '', });
    setLoading(false)
  }, [cardData.name, navigation]);

   const handleAddMovie = () => {
    setIsModalVisible(true);
  };

  const handleSearchMovie = (movieName: string) => {
    console.log('Buscar filme:', movieName);
    setIsModalVisible(false); 


  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>{cardData.name}</Text>
      <View style={styles.infoContainer}>
          {/* Informações de pessoas e filmes */}
          <View style={styles.info}>
          <Text style={styles.infoTextValue}>{cardData.peopleCount || 0}</Text>
            <Text style={styles.infoText}>People(s)</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextValue}>{cardData.moviesCount || 0}</Text>
            <Text style={styles.infoText}>Movie(s)</Text>
          </View>
        </View>
      </View>
         {/* Botão "Adicionar Filme" */}
         <TouchableOpacity style={styles.addButton} onPress={handleAddMovie}>
        <Text style={styles.buttonText}>Adicionar Filme</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Movies</Text>
      <View style={styles.movies}>

      <MovieCard  id='34123132' key={34123132} name='Dead Poet Society' ownerName='joao'>
      
      </MovieCard>  
      <MovieCard id='34123132' key={341231322} name='Dead Poet Society' ownerName='joao'>
      
      </MovieCard>  
      <MovieCard id='34123132' key={341231323} name='Dead Poet Society' ownerName='joao'>
      
      </MovieCard>  
      
      </View>
     
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {movies.map((movie) => (
            <Text key={movie.id}>{movie.title}</Text>
          ))}
        </View>
      )}

<MovieModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onSearch={handleSearchMovie} />
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#222', 
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  movies:{
   padding:5,
    gap:5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  header:{
    flexDirection:'column',
    width: '100%',
    backgroundColor:'#222',
    fontFamily: 'RobotoMono-Regular',
    padding:20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3, 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    fontFamily: 'RobotoMono-Regular',
    
  },
  title: {
    fontSize: 24,
    color:"#fff",
    fontFamily: 'RobotoMono-Regular',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    padding:20,
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
   
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#fff',
   
  },
  infoTextValue:{
    color: '#fff',
  },
});

export default MainJuntin;
