import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SongCard({ song }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: song.album.images[0].url }} style={styles.image} />
      <View>
        <Text style={styles.title}>{song.name}</Text>
        <Text style={styles.artist}>{song.artists.map(a => a.name).join(', ')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  artist: {
    color: '#555'
  }
});
