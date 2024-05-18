import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { CardDataContext } from '../../context/CardDataContext';
import { MovieHistoric } from '../../interfaces/Movie/MovieHistoric';
import JuntinMovieService from '../../services/JuntinMovieService';
import HistoricMovieCard from '../../components/HistoricMovieCard/HistoricMovieCard';



const HistoricJuntinPlay: React.FC = () => {
    const context = useContext(CardDataContext);
    const [movies, setMovies] = useState<MovieHistoric[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    
  if (!context) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }


  const { juntinData, setJuntinData } = context;

  useEffect(() => {
    fecthHistoricJuntinMovies();

  }, [juntinData]);

const fecthHistoricJuntinMovies = async () => {
setRefreshing(true);
var newMovies = await JuntinMovieService.getHistoricJuntinMovies(juntinData.id, movies.length);
setMovies([...movies, ...newMovies]);
setRefreshing(false);
}


const styles = StyleSheet.create({
    addButton: {
      backgroundColor: juntinData.color,
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
      color: juntinData.textColor,
      fontSize: 18,
      textAlign: 'center',
    },

    header: {
      flexDirection: 'column',
      width: '100%',
      backgroundColor: juntinData.color,
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
      color: juntinData.textColor,
      fontFamily: 'RobotoMono-Regular',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
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
      color: juntinData.textColor,

    },
    infoTextValue: {
      color: juntinData.textColor,
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
      padding: 10,
    },
    containerResultMovies: {
      width: '100%',
      gap: 10,

    },
    moviesScreen: {
      flex: 1,
      padding: 10,
    }
  });
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Historic</Text>
            <FlatList
        contentContainerStyle={styles.containerMovies}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fecthHistoricJuntinMovies}
          />
        }
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item: movie }: any) => (
          <HistoricMovieCard color={juntinData.color}
            textColor={juntinData.textColor}
            urlImage={movie.urlImage}
            id={movie.id}
            key={movie.tmdbId}
            description={movie.description}
            name={movie.title}
            checked={movie.isViewedToUser}
            ownerName={movie.userName} />
        )}
        onEndReached={fecthHistoricJuntinMovies}
        onEndReachedThreshold={0.5}
      />
        </View>
    );
};

export default HistoricJuntinPlay;