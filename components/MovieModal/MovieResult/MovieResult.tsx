import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MovieResultProps } from '../../../interfaces/MovieResult/MovieResultProps';


const MovieResult: React.FC<MovieResultProps> = ({ id, title, urlImage, description, tmdbId, onAddToPlaylist }) => {

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: urlImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.addButton} onPress={onAddToPlaylist}>Add</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 15
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default MovieResult;
export type { MovieResultProps };
