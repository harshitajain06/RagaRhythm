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
  const [expandedCategories, setExpandedCategories] = useState({});
  const isWeb = Platform.OS === 'web';

  // Function to categorize songs based on content analysis
  const categorizeSongs = (songs) => {
    const categories = {
      'Classical': [],
      'Folk': [],
      'Devotional': [],
      'Fusion': [],
      'Ghazal': [],
      'Qawwali': [],
      'Film/Bollywood': [],
      'Instrumental': [],
      'Semi-Classical': [],
      'Regional': [],
      'Pop': [],
      'Rock': [],
      'Hip-Hop/Rap': [],
      'R&B/Soul': [],
      'Electronic/EDM': [],
      'Jazz': [],
      'Country': [],
      'Metal': [],
      'Blues': [],
      'Alternative/Indie': [],
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
      // Ghazal music keywords
      else if (combinedText.includes('ghazal') || 
               combinedText.includes('urdu') || 
               combinedText.includes('nazm') || 
               combinedText.includes('shayari') ||
               combinedText.includes('mehdi hassan') ||
               combinedText.includes('jagjit singh') ||
               combinedText.includes('ghulam ali') ||
               combinedText.includes('pankaj udhas') ||
               combinedText.includes('talat aziz')) {
        category = 'Ghazal';
      }
      // Qawwali music keywords
      else if (combinedText.includes('qawwali') || 
               combinedText.includes('nusrat') || 
               combinedText.includes('rahat fateh') || 
               combinedText.includes('dargah') ||
               combinedText.includes('nizami') ||
               combinedText.includes('sabri') ||
               combinedText.includes('aziz mian') ||
               combinedText.includes('wadali')) {
        category = 'Qawwali';
      }
      // Film/Bollywood music keywords
      else if (combinedText.includes('film') || 
               combinedText.includes('bollywood') || 
               combinedText.includes('movie') || 
               combinedText.includes('cinema') ||
               combinedText.includes('soundtrack') ||
               combinedText.includes('playback') ||
               combinedText.includes('lata mangeshkar') ||
               combinedText.includes('kishore kumar') ||
               combinedText.includes('mohd rafi') ||
               combinedText.includes('asha bhosle') ||
               combinedText.includes('kumar sanu') ||
               combinedText.includes('alka yagnik') ||
               combinedText.includes('arijit singh') ||
               combinedText.includes('shreya ghoshal') ||
               combinedText.includes('sonu nigam')) {
        category = 'Film/Bollywood';
      }
      // Instrumental music keywords
      else if (combinedText.includes('instrumental') || 
               combinedText.includes('orchestra') || 
               combinedText.includes('symphony') || 
               combinedText.includes('concerto') ||
               combinedText.includes('ensemble') ||
               combinedText.includes('pure music') ||
               combinedText.includes('without vocals') ||
               combinedText.includes('no lyrics')) {
        category = 'Instrumental';
      }
      // Semi-Classical music keywords
      else if (combinedText.includes('thumri') || 
               combinedText.includes('dadra') || 
               combinedText.includes('tappa') || 
               combinedText.includes('chaiti') ||
               combinedText.includes('kajri') ||
               combinedText.includes('hori') ||
               combinedText.includes('tillana') ||
               combinedText.includes('javali') ||
               combinedText.includes('padam') ||
               combinedText.includes('varnam') ||
               combinedText.includes('light classical') ||
               combinedText.includes('semi classical')) {
        category = 'Semi-Classical';
      }
      // Regional music keywords
      else if (combinedText.includes('regional') || 
               combinedText.includes('assamese') || 
               combinedText.includes('oriya') || 
               combinedText.includes('sindhi') ||
               combinedText.includes('kashmiri') ||
               combinedText.includes('konkani') ||
               combinedText.includes('manipuri') ||
               combinedText.includes('nagaland') ||
               combinedText.includes('tribal') ||
               combinedText.includes('goan') ||
               combinedText.includes('rajasthani') ||
               combinedText.includes('haryanvi') ||
               combinedText.includes('bihari')) {
        category = 'Regional';
      }
      // Pop music keywords
      else if (combinedText.includes('pop') || 
               combinedText.includes('taylor swift') || 
               combinedText.includes('ariana grande') || 
               combinedText.includes('billie eilish') ||
               combinedText.includes('dua lipa') ||
               combinedText.includes('ed sheeran') ||
               combinedText.includes('bruno mars') ||
               combinedText.includes('the weeknd') ||
               combinedText.includes('justin bieber') ||
               combinedText.includes('katy perry') ||
               combinedText.includes('lady gaga') ||
               combinedText.includes('miley cyrus') ||
               combinedText.includes('selena gomez') ||
               combinedText.includes('shawn mendes') ||
               combinedText.includes('harry styles')) {
        category = 'Pop';
      }
      // Rock music keywords
      else if (combinedText.includes('rock') || 
               combinedText.includes('guitar solo') || 
               combinedText.includes('heavy guitar') || 
               combinedText.includes('queen') ||
               combinedText.includes('the beatles') ||
               combinedText.includes('led zeppelin') ||
               combinedText.includes('pink floyd') ||
               combinedText.includes('rolling stones') ||
               combinedText.includes('nirvana') ||
               combinedText.includes('foo fighters') ||
               combinedText.includes('linkin park') ||
               combinedText.includes('imagine dragons') ||
               combinedText.includes('coldplay') ||
               combinedText.includes('radiohead')) {
        category = 'Rock';
      }
      // Hip-Hop/Rap music keywords
      else if (combinedText.includes('hip hop') || 
               combinedText.includes('hip-hop') || 
               combinedText.includes('rap') || 
               combinedText.includes('rapper') ||
               combinedText.includes('eminem') ||
               combinedText.includes('drake') ||
               combinedText.includes('kendrick lamar') ||
               combinedText.includes('kanye west') ||
               combinedText.includes('travis scott') ||
               combinedText.includes('post malone') ||
               combinedText.includes('cardi b') ||
               combinedText.includes('nicki minaj') ||
               combinedText.includes('lil') ||
               combinedText.includes('tupac') ||
               combinedText.includes('notorious b.i.g') ||
               combinedText.includes('jay-z') ||
               combinedText.includes('snoop dogg')) {
        category = 'Hip-Hop/Rap';
      }
      // R&B/Soul music keywords
      else if (combinedText.includes('r&b') || 
               combinedText.includes('rnb') || 
               combinedText.includes('soul') || 
               combinedText.includes('smooth') ||
               combinedText.includes('beyoncé') ||
               combinedText.includes('rihanna') ||
               combinedText.includes('usher') ||
               combinedText.includes('alicia keys') ||
               combinedText.includes('john legend') ||
               combinedText.includes('frank ocean') ||
               combinedText.includes('sza') ||
               combinedText.includes('daniel caesar') ||
               combinedText.includes('marvin gaye') ||
               combinedText.includes('stevie wonder') ||
               combinedText.includes('aretha franklin')) {
        category = 'R&B/Soul';
      }
      // Electronic/EDM music keywords
      else if (combinedText.includes('electronic') || 
               combinedText.includes('edm') || 
               combinedText.includes('techno') || 
               combinedText.includes('house') ||
               combinedText.includes('trance') ||
               combinedText.includes('dubstep') ||
               combinedText.includes('drum and bass') ||
               combinedText.includes('dnb') ||
               combinedText.includes('dj') ||
               combinedText.includes('calvin harris') ||
               combinedText.includes('avicii') ||
               combinedText.includes('martin garrix') ||
               combinedText.includes('david guetta') ||
               combinedText.includes('marshmello') ||
               combinedText.includes('skrillex') ||
               combinedText.includes('kygo') ||
               combinedText.includes('zedd')) {
        category = 'Electronic/EDM';
      }
      // Jazz music keywords
      else if (combinedText.includes('jazz') || 
               combinedText.includes('swing') || 
               combinedText.includes('bebop') || 
               combinedText.includes('improvisation') ||
               combinedText.includes('miles davis') ||
               combinedText.includes('john coltrane') ||
               combinedText.includes('louis armstrong') ||
               combinedText.includes('ella fitzgerald') ||
               combinedText.includes('duke ellington') ||
               combinedText.includes('billie holiday') ||
               combinedText.includes('chet baker') ||
               combinedText.includes('charlie parker') ||
               combinedText.includes('herbie hancock')) {
        category = 'Jazz';
      }
      // Country music keywords
      else if (combinedText.includes('country') || 
               combinedText.includes('nashville') || 
               combinedText.includes('bluegrass') || 
               combinedText.includes('honky tonk') ||
               combinedText.includes('taylor swift country') ||
               combinedText.includes('johnny cash') ||
               combinedText.includes('dolly parton') ||
               combinedText.includes('willie nelson') ||
               combinedText.includes('keith urban') ||
               combinedText.includes('carrie underwood') ||
               combinedText.includes('luke bryan') ||
               combinedText.includes('blake shelton') ||
               combinedText.includes('shania twain')) {
        category = 'Country';
      }
      // Metal music keywords
      else if (combinedText.includes('metal') || 
               combinedText.includes('metallica') || 
               combinedText.includes('iron maiden') || 
               combinedText.includes('black sabbath') ||
               combinedText.includes('slayer') ||
               combinedText.includes('megadeth') ||
               combinedText.includes('judas priest') ||
               combinedText.includes('pantera') ||
               combinedText.includes('slipknot') ||
               combinedText.includes('system of a down') ||
               combinedText.includes('death metal') ||
               combinedText.includes('thrash') ||
               combinedText.includes('heavy metal') ||
               combinedText.includes('power metal')) {
        category = 'Metal';
      }
      // Blues music keywords
      else if (combinedText.includes('blues') || 
               combinedText.includes('b.b. king') || 
               combinedText.includes('muddy waters') || 
               combinedText.includes('robert johnson') ||
               combinedText.includes('john lee hooker') ||
               combinedText.includes('howlin wolf') ||
               combinedText.includes('buddy guy') ||
               combinedText.includes('eric clapton blues') ||
               combinedText.includes('delta blues') ||
               combinedText.includes('chicago blues')) {
        category = 'Blues';
      }
      // Alternative/Indie music keywords
      else if (combinedText.includes('alternative') || 
               combinedText.includes('indie') || 
               combinedText.includes('grunge') || 
               combinedText.includes('shoegaze') ||
               combinedText.includes('post-punk') ||
               combinedText.includes('arctic monkeys') ||
               combinedText.includes('the strokes') ||
               combinedText.includes('tame impala') ||
               combinedText.includes('vampire weekend') ||
               combinedText.includes('the killers') ||
               combinedText.includes('florence') ||
               combinedText.includes('lana del rey') ||
               combinedText.includes('bon iver') ||
               combinedText.includes('sufjan stevens')) {
        category = 'Alternative/Indie';
      }
      // Fusion music keywords
      else if (combinedText.includes('fusion') || 
               combinedText.includes('modern') || 
               combinedText.includes('contemporary') || 
               combinedText.includes('experimental') ||
               combinedText.includes('world') ||
               combinedText.includes('ambient') ||
               combinedText.includes('chill') ||
               combinedText.includes('lounge') ||
               combinedText.includes('acoustic') ||
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

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Classical': return '📁';
      case 'Folk': return '📁';
      case 'Devotional': return '📁';
      case 'Fusion': return '📁';
      case 'Ghazal': return '📁';
      case 'Qawwali': return '📁';
      case 'Film/Bollywood': return '📁';
      case 'Instrumental': return '📁';
      case 'Semi-Classical': return '📁';
      case 'Regional': return '📁';
      case 'Pop': return '📁';
      case 'Rock': return '📁';
      case 'Hip-Hop/Rap': return '📁';
      case 'R&B/Soul': return '📁';
      case 'Electronic/EDM': return '📁';
      case 'Jazz': return '📁';
      case 'Country': return '📁';
      case 'Metal': return '📁';
      case 'Blues': return '📁';
      case 'Alternative/Indie': return '📁';
      default: return '📁';
    }
  };

  const getCategoryMusicIcon = (category) => {
    switch (category) {
      case 'Classical': return '🎼';
      case 'Folk': return '🎵';
      case 'Devotional': return '🙏';
      case 'Fusion': return '🎶';
      case 'Ghazal': return '💝';
      case 'Qawwali': return '🕌';
      case 'Film/Bollywood': return '🎬';
      case 'Instrumental': return '🎻';
      case 'Semi-Classical': return '🎹';
      case 'Regional': return '🌏';
      case 'Pop': return '🎤';
      case 'Rock': return '🎸';
      case 'Hip-Hop/Rap': return '🎙️';
      case 'R&B/Soul': return '🎺';
      case 'Electronic/EDM': return '🎧';
      case 'Jazz': return '🎷';
      case 'Country': return '🤠';
      case 'Metal': return '🤘';
      case 'Blues': return '🎹';
      case 'Alternative/Indie': return '🎨';
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
    const mainCategories = [
      'Classical', 
      'Folk', 
      'Devotional', 
      'Fusion',
      'Ghazal',
      'Qawwali',
      'Film/Bollywood',
      'Instrumental',
      'Semi-Classical',
      'Regional',
      'Pop',
      'Rock',
      'Hip-Hop/Rap',
      'R&B/Soul',
      'Electronic/EDM',
      'Jazz',
      'Country',
      'Metal',
      'Blues',
      'Alternative/Indie'
    ];
    const songsPerCategory = Math.ceil(totalSongs / mainCategories.length);
    
    songs.forEach((song, index) => {
      const categoryIndex = Math.floor(index / songsPerCategory);
      const category = mainCategories[categoryIndex] || 'Other';
      
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
