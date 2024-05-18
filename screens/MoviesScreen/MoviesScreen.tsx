import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GlobalStyles from '../../styles';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import { Juntin } from '../../interfaces/Juntin/Juntin';
import { CardDataContext, CardDataProvider } from '../../context/CardDataContext';
import AddMovieModal from '../../components/MovieModal/AddMovieModal/AddMovieModal';
import JuntinMovieService from '../../services/JuntinMovieService';
import { Movie } from '../../interfaces/Movie/Movie';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../interfaces/RoutesRootParam/RootParamList';
import JuntinService from '../../services/JuntinService';


interface RouteParams {
  card: Juntin;
}

const MoviesScreen: React.FC = () => {
  const route = useRoute();
  const { card } = route.params as RouteParams;
  const context = useContext(CardDataContext);

  if (!context) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }

  const { juntinData, setJuntinData } = context;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);


  type NavigationProp = StackNavigationProp<RootParamList>;
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    setJuntinData(card);
    setLoading(false);
    fetchJuntinPlay();
  }, []);

  useEffect(() => {

    if (juntinData) {
      fetchMovies();
    }
  }, [juntinData]);

  const onRefresh = async () => {

    await fetchMovies();
    await fetchJuntinPlay();

  };
  const fetchJuntinPlay = async () => {
    if (juntinData && juntinData.id) {
      const newJuntin = await JuntinService.getJuntin(card.id);
      setJuntinData(newJuntin);
    }
  }
  const fetchMovies = async () => {

    setRefreshing(true);
    if (juntinData && juntinData.id) {
      let newMovies = await JuntinMovieService.getJuntinMovies(juntinData.id, movies.length);
      setMovies([...movies, ...newMovies]);
    }
    setRefreshing(false);
  }
  const removeMovies = async (position: number) => {
    const newMovies = [...movies];
    newMovies.splice(position, 1);
    setMovies(newMovies);
  }

  const handleAddMovie = () => {
    setIsModalVisible(true);
  };
  const handleSearchMovie = (movieName: string) => {
    setIsModalVisible(false);
  };


  const styles = StyleSheet.create({
    addButton: {
      backgroundColor: card.color,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width: 150,
    },
    buttonText: {
      color: card.textColor,
      fontSize: 18,
      textAlign: 'center',
    },

    header: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: card.color,
      fontFamily: 'RobotoMono-Regular',
      padding: 20,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 0.3,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
    },
    container: {
      flex: 1,
      padding: 10,

    },
    title: {
      fontSize: 24,
      color: card.textColor,
      fontFamily: 'RobotoMono-Regular',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      width: '100%',
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
      color: card.textColor,

    },
    infoTextValue: {
      color: card.textColor,
    },
    headerSubtitle: {
      width: '100%',
      alignItems: 'flex-end',
      paddingHorizontal: 10,
    },
    containerMovies: {
      padding: 10,
      gap: 18,

    },
    subtitleHeader: {
      alignItems: 'center',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    containerResultMovies: {
      width: '100%',
      gap: 10,

    },
    moviesScreen: {
      flex: 1,
      padding: 10,
    },
    historicText:{
      textDecorationLine: 'underline',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'RobotoMono-Regular',
    }
  });
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>{juntinData.name}</Text>
        <View style={styles.infoContainer}>

          <View style={styles.info}>
            <Text style={styles.infoTextValue}>{juntinData.peopleCount || 0}</Text>
            <Text style={styles.infoText}>People(s)</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextValue}>{juntinData.moviesCount || 0}</Text>
            <Text style={styles.infoText}>Movie(s)</Text>
          </View>
        </View>
      </View>



      <View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMovie}>
          <Text style={styles.buttonText}>Add Movie</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.subtitleHeader}>
        <Text style={styles.subtitle}>Movies</Text>
        <TouchableOpacity

          onPress={() => navigation.navigate('HistoricJuntinPlay')}>
          <Text style={styles.historicText}>Historic</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.containerMovies}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchMovies}
          />
        }
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item: movie, index }: any) => (
          <MovieCard
            color={card.color}
            textColor={card.textColor}

            urlImage={movie.urlImage}
            id={movie.id}
            key={movie.tmdbId}
            description={movie.description}
            name={movie.title}
            checked={movie.isViewedToUser}
            ownerName={movie.userName}
            position={index}
            removeMovies={removeMovies} />
        )}
        onEndReached={fetchMovies}
        onEndReachedThreshold={0.5}
      />

      <MovieModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}
        onSearch={handleSearchMovie}
        onRefresh={onRefresh} juntin={card} />

    </View>
  );
};


export default MoviesScreen;
