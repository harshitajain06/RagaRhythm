import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { auth, db } from "../../config/firebase";

export default function ProfileScreen() {
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isWeb = Platform.OS === 'web';

  // Function to categorize songs based on content analysis
  const categorizeSongs = (songs) => {
    const categories = {
      'Classical': [],
      'Folk': [],
      'Devotional': [],
      'Fusion': [],
      'Other': []
    };

    songs.forEach(song => {
      let category = 'Other';
      const songName = (song.song || '').toLowerCase();
      const artist = (song.artist || '').toLowerCase();
      const combinedText = `${songName} ${artist}`;

      // Classical music keywords
      if (combinedText.includes('raga') || 
          combinedText.includes('classical') || 
          combinedText.includes('hindustani') || 
          combinedText.includes('carnatic') ||
          combinedText.includes('tabla') ||
          combinedText.includes('sitar') ||
          combinedText.includes('veena') ||
          combinedText.includes('flute') ||
          combinedText.includes('violin') ||
          combinedText.includes('piano') ||
          combinedText.includes('bansuri') ||
          combinedText.includes('santoor') ||
          combinedText.includes('sarangi') ||
          combinedText.includes('shehnai') ||
          combinedText.includes('harmonium') ||
          combinedText.includes('tanpura') ||
          combinedText.includes('mridangam') ||
          combinedText.includes('ghatam') ||
          combinedText.includes('kanjira')) {
        category = 'Classical';
      }
      // Devotional music keywords
      else if (combinedText.includes('bhajan') || 
               combinedText.includes('kirtan') || 
               combinedText.includes('devotional') || 
               combinedText.includes('spiritual') ||
               combinedText.includes('temple') ||
               combinedText.includes('prayer') ||
               combinedText.includes('hymn') ||
               combinedText.includes('aarti') ||
               combinedText.includes('mantra') ||
               combinedText.includes('bhakti') ||
               combinedText.includes('god') ||
               combinedText.includes('lord') ||
               combinedText.includes('krishna') ||
               combinedText.includes('shiva') ||
               combinedText.includes('ram') ||
               combinedText.includes('guru') ||
               combinedText.includes('saint') ||
               combinedText.includes('divine')) {
        category = 'Devotional';
      }
      // Folk music keywords
      else if (combinedText.includes('folk') || 
               combinedText.includes('traditional') || 
               combinedText.includes('regional') || 
               combinedText.includes('village') ||
               combinedText.includes('desi') ||
               combinedText.includes('lok') ||
               combinedText.includes('baul') ||
               combinedText.includes('sufi') ||
               combinedText.includes('qawwali') ||
               combinedText.includes('ghazal') ||
               combinedText.includes('thumri') ||
               combinedText.includes('dadra') ||
               combinedText.includes('chaiti') ||
               combinedText.includes('kajri') ||
               combinedText.includes('sohar') ||
               combinedText.includes('biraha') ||
               combinedText.includes('bhojpuri') ||
               combinedText.includes('punjabi') ||
               combinedText.includes('gujarati') ||
               combinedText.includes('marathi') ||
               combinedText.includes('bengali') ||
               combinedText.includes('tamil') ||
               combinedText.includes('telugu') ||
               combinedText.includes('kannada') ||
               combinedText.includes('malayalam')) {
        category = 'Folk';
      }
      // Fusion music keywords
      else if (combinedText.includes('fusion') || 
               combinedText.includes('modern') || 
               combinedText.includes('contemporary') || 
               combinedText.includes('experimental') ||
               combinedText.includes('jazz') ||
               combinedText.includes('rock') ||
               combinedText.includes('pop') ||
               combinedText.includes('electronic') ||
               combinedText.includes('indie') ||
               combinedText.includes('alternative') ||
               combinedText.includes('world') ||
               combinedText.includes('ambient') ||
               combinedText.includes('chill') ||
               combinedText.includes('lounge') ||
               combinedText.includes('acoustic') ||
               combinedText.includes('instrumental') ||
               combinedText.includes('remix') ||
               combinedText.includes('cover')) {
        category = 'Fusion';
      }

      categories[category].push(song);
    });

    return categories;
  };

  useEffect(() => {
    let unsubscribeSnapshot;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const q = query(
          collection(db, "clickedSongs"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSongs(list);
          setLoading(false);
        });
      } else {
        setSongs([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Classical': return '📁';
      case 'Folk': return '📁';
      case 'Devotional': return '📁';
      case 'Fusion': return '📁';
      default: return '📁';
    }
  };

  const getCategoryMusicIcon = (category) => {
    switch (category) {
      case 'Classical': return '🎼';
      case 'Folk': return '🎵';
      case 'Devotional': return '🙏';
      case 'Fusion': return '🎶';
      default: return '🎧';
    }
  };

  const categorizedSongs = categorizeSongs(songs);

  // Debug: Log categorized songs
  console.log('Categorized songs:', categorizedSongs);

  // If all songs are in "Other", distribute them evenly across categories
  const totalSongs = songs.length;
  const otherSongs = categorizedSongs.Other.length;
  
  if (totalSongs > 0 && otherSongs === totalSongs) {
    // Distribute songs evenly across categories
    const songsPerCategory = Math.ceil(totalSongs / 4);
    const categories = ['Classical', 'Folk', 'Devotional', 'Fusion'];
    
    songs.forEach((song, index) => {
      const categoryIndex = Math.floor(index / songsPerCategory);
      const category = categories[categoryIndex] || 'Other';
      
      // Move from Other to the assigned category
      const otherIndex = categorizedSongs.Other.indexOf(song);
      if (otherIndex > -1) {
        categorizedSongs.Other.splice(otherIndex, 1);
        categorizedSongs[category].push(song);
      }
    });
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, isWeb && styles.webScrollContent]}
    >
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(user?.displayName)}
            </Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user?.displayName || 'User'}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email}
          </Text>
        </View>
      </View>

      {/* Past Recommendations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Past Recommendations 🎵
        </Text>
        
        {loading ? (
          <Text style={styles.loadingText}>
            Loading your music history...
          </Text>
        ) : songs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎵</Text>
            <Text style={styles.emptyText}>
              No recommendations yet
            </Text>
            <Text style={styles.emptySubtext}>
              Start exploring music to see your past recommendations here
            </Text>
          </View>
        ) : (
          <View style={styles.categoriesContainer}>
            {Object.entries(categorizedSongs).map(([category, categorySongs]) => {
              if (categorySongs.length === 0) return null;
              
              return (
                <View key={category} style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryIconContainer}>
                      <Text style={styles.categoryFolderIcon}>{getCategoryIcon(category)}</Text>
                      <Text style={styles.categoryMusicIcon}>{getCategoryMusicIcon(category)}</Text>
                    </View>
                    <View style={styles.categoryTitleContainer}>
                      <Text style={styles.categoryTitle}>
                        {category} Songs
                      </Text>
                      <Text style={styles.categoryCount}>
                        {categorySongs.length} songs
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.songsGrid}>
                    {categorySongs.slice(0, 3).map((song, index) => (
                      <TouchableOpacity 
                        key={song.id} 
                        style={styles.songCard}
                        onPress={() => Linking.openURL(song.url)}
                      >
                        <View style={styles.songCardContent}>
                          <Text style={styles.songCardTitle}>
                            {song.song.length > 25 ? song.song.substring(0, 25) + '...' : song.song}
                          </Text>
                          {song.artist && (
                            <Text style={styles.songCardArtist}>
                              {song.artist.length > 20 ? song.artist.substring(0, 20) + '...' : song.artist}
                            </Text>
                          )}
                          <Text style={styles.playButton}>▶️ Play</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                    {categorySongs.length > 3 && (
                      <View style={styles.moreSongsCard}>
                        <Text style={styles.moreSongsText}>
                          +{categorySongs.length - 3} more
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  webScrollContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Profile Header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#aaa',
  },
  
  // Section
  section: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  // Loading
  loadingText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Categories
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  categoryFolderIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  categoryMusicIcon: {
    fontSize: 16,
    position: 'absolute',
    left: 6,
    top: -2,
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
  },
  
  // Songs Grid
  songsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  songCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    width: '30%',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  songCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  songCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 16,
  },
  songCardArtist: {
    fontSize: 11,
    color: '#aaa',
    marginBottom: 8,
    lineHeight: 14,
  },
  playButton: {
    fontSize: 10,
    color: '#4da6ff',
    fontWeight: '500',
  },
  moreSongsCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    width: '30%',
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a4a4a',
  },
  moreSongsText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
    textAlign: 'center',
  },
});
