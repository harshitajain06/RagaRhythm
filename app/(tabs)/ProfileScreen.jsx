import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SongCard from '../../components/SongCard';

export default function ProfileScreen({ route }) {
  const { username, stats, folders, songs } = route.params || {
    username: "XYZ",
    stats: { chats: 58, saves: 150, folders: 28 },
    folders: ["Rainy Day Depression"],
    songs: []
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text>{stats.chats} Chats</Text>
        <Text>{stats.saves} Saves</Text>
        <Text>{stats.folders} Folders</Text>
      </View>
      <Text style={styles.sectionTitle}>Past Recommendations</Text>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <SongCard song={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { alignItems: 'center', marginBottom: 20 },
  username: { fontSize: 22, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});
