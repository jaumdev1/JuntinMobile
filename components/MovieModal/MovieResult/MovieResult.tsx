import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface MovieResultProps {
  id: number;
  title: string;
  imageUrl: string;
  onAddToPlaylist: () => void;
}

const MovieResult: React.FC<MovieResultProps> = ({ id, title, imageUrl, onAddToPlaylist }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onAddToPlaylist}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.addButton} onPress={onAddToPlaylist}>Adicionar</Text>
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
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  addButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default MovieResult;
export type { MovieResultProps };
