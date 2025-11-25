import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const isWeb = Platform.OS === 'web';

  // Categorize songs based on keywords
  const categorizeSongs = (songs) => {
    const categoryKeywords = {
      'Classical': ['raga', 'classical', 'hindustani', 'carnatic', 'tabla', 'sitar', 'veena', 'bansuri', 'santoor'],
      'Devotional': ['bhajan', 'kirtan', 'devotional', 'spiritual', 'temple', 'prayer', 'aarti', 'mantra', 'bhakti'],
      'Folk': ['folk', 'traditional', 'lok', 'baul', 'bhojpuri', 'punjabi', 'gujarati', 'marathi', 'bengali', 'tamil'],
      'Ghazal': ['ghazal', 'urdu', 'nazm', 'shayari', 'jagjit singh', 'ghulam ali'],
      'Qawwali': ['qawwali', 'nusrat', 'rahat fateh', 'dargah', 'nizami', 'sabri'],
      'Film/Bollywood': ['film', 'bollywood', 'movie', 'cinema', 'soundtrack', 'arijit singh', 'shreya ghoshal'],
      'Instrumental': ['instrumental', 'orchestra', 'symphony', 'concerto', 'without vocals'],
      'Semi-Classical': ['thumri', 'dadra', 'tappa', 'tillana', 'light classical', 'semi classical'],
      'Regional': ['assamese', 'oriya', 'sindhi', 'kashmiri', 'konkani', 'tribal', 'rajasthani', 'haryanvi'],
      'Pop': ['pop', 'taylor swift', 'ariana grande', 'billie eilish', 'ed sheeran', 'bruno mars'],
      'Rock': ['rock', 'guitar solo', 'queen', 'the beatles', 'led zeppelin', 'nirvana', 'coldplay'],
      'Hip-Hop/Rap': ['hip hop', 'hip-hop', 'rap', 'rapper', 'eminem', 'drake', 'kendrick lamar'],
      'R&B/Soul': ['r&b', 'rnb', 'soul', 'beyoncé', 'rihanna', 'alicia keys', 'marvin gaye'],
      'Electronic/EDM': ['electronic', 'edm', 'techno', 'house', 'trance', 'dubstep', 'dj', 'avicii'],
      'Jazz': ['jazz', 'swing', 'bebop', 'miles davis', 'john coltrane', 'ella fitzgerald'],
      'Country': ['country', 'nashville', 'bluegrass', 'johnny cash', 'dolly parton'],
      'Metal': ['metal', 'metallica', 'iron maiden', 'slayer', 'thrash', 'heavy metal'],
      'Blues': ['blues', 'b.b. king', 'muddy waters', 'delta blues'],
      'Alternative/Indie': ['alternative', 'indie', 'grunge', 'arctic monkeys', 'tame impala'],
      'Fusion': ['fusion', 'modern', 'contemporary', 'experimental', 'world', 'ambient', 'remix']
    };

    const categories = Object.keys(categoryKeywords).reduce((acc, key) => ({ ...acc, [key]: [] }), { 'Other': [] });

    songs.forEach(song => {
      const text = `${song.song || ''} ${song.artist || ''}`.toLowerCase();
      const category = Object.entries(categoryKeywords).find(([_, keywords]) => 
        keywords.some(keyword => text.includes(keyword))
      )?.[0] || 'Other';
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

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categoryIcons = {
    'Classical': '🎼', 'Folk': '🎵', 'Devotional': '🙏', 'Fusion': '🎶',
    'Ghazal': '💝', 'Qawwali': '🕌', 'Film/Bollywood': '🎬', 'Instrumental': '🎻',
    'Semi-Classical': '🎹', 'Regional': '🌏', 'Pop': '🎤', 'Rock': '🎸',
    'Hip-Hop/Rap': '🎙️', 'R&B/Soul': '🎺', 'Electronic/EDM': '🎧', 'Jazz': '🎷',
    'Country': '🤠', 'Metal': '🤘', 'Blues': '🎹', 'Alternative/Indie': '🎨'
  };

  const categorizedSongs = categorizeSongs(songs);

  // Show login prompt if user is not logged in
  if (!loading && !user) {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, styles.centerContent, isWeb && styles.webScrollContent]}
      >
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginIcon}>🔐</Text>
          <Text style={styles.loginPromptTitle}>Login Required</Text>
          <Text style={styles.loginPromptSubtitle}>
            Login to view your profile, listening history, and personalized recommendations
          </Text>
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('LoginRegister')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login / Sign Up</Text>
          </TouchableOpacity>
          
          <Text style={styles.loginPromptFooter}>
            You can still explore music without logging in
          </Text>
        </View>
      </ScrollView>
    );
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
                      <Text style={styles.categoryFolderIcon}>📁</Text>
                      <Text style={styles.categoryMusicIcon}>{categoryIcons[category] || '🎧'}</Text>
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
                    {(expandedCategories[category] ? categorySongs : categorySongs.slice(0, 3)).map((song, index) => (
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
                      <TouchableOpacity 
                        style={styles.moreSongsCard}
                        onPress={() => toggleCategory(category)}
                      >
                        <Text style={styles.moreSongsText}>
                          {expandedCategories[category] 
                            ? '▲ Show less' 
                            : `+${categorySongs.length - 3} more`}
                        </Text>
                      </TouchableOpacity>
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webScrollContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Login Prompt Styles
  loginPromptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    maxWidth: 400,
  },
  loginIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  loginPromptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginPromptSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    minWidth: 200,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginPromptFooter: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
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
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
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
    borderColor: '#4da6ff',
    cursor: 'pointer',
  },
  moreSongsText: {
    fontSize: 12,
    color: '#4da6ff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
