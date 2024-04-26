import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../components/Card/Card';

const Home = () => {
  const playlists = [
    {
      nameJuntin: "Filmesmeuamigos",
      color: "#6eb2de",
      owner: "joao",
      category: "terror"
    },
    {
      nameJuntin: "OutraPlaylist",
      color: "#6eb2de",
      owner: "outroDono",
      category: "comédia"
    },
    {
      nameJuntin: "MaisUmaPlaylist",
      color: "#6eb2de",
      owner: "outroDono",
      category: "ação"
    },
    {
      nameJuntin: "MaisUmaPlaylist",
      color: "#6eb2de",
      owner: "outroDono",
      category: "ação"
    },
    {
      nameJuntin: "MaisUmaPlaylist",
      color: "#6eb2de",
      owner: "outroDono",
      category: "ação"
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Your Juntin's</Text>
      {playlists.map((playlist, index) => (
        <Card
          key={index}
          name={playlist.nameJuntin}
          color={playlist.color}
          ownerName={playlist.owner}
          category={playlist.category}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default Home;
