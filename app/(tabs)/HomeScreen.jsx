import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    Linking,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

// 📱 Responsive Design Configuration
// - Mobile (< 768px): 2 columns, compact cards
// - Tablet (768-1023px): 4 columns, medium cards  
// - Desktop (≥ 1024px): 6 columns, large cards with enhanced spacing
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isLargeScreen = SCREEN_WIDTH > 768;

// ⚠️ Replace with your YouTube Data API v3 key from https://console.cloud.google.com/
const YOUTUBE_API_KEY = "AIzaSyCGz_3lXwrvLSKjep6YuSYp-P4mxzlCss8";

// ⚠️ For user authentication, add your OAuth Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "348329748433-ir1rt27jb75fsjpjm8957p9kgo4kukbl.apps.googleusercontent.com";

// 🎵 Global Music Categories - Rotates daily
// Using YouTube Search API instead of playlists (more reliable!)
const INDIAN_MUSIC_CATEGORIES = [
  // Indian Music - Hindi/Bollywood
  { query: "Bollywood songs 2024", name: "🇮🇳 Bollywood Hits 2024", region: "IN" },
  { query: "Arijit Singh songs", name: "🇮🇳 Best of Arijit Singh", region: "IN" },
  { query: "90s Bollywood songs", name: "🇮🇳 90s Bollywood Classics", region: "IN" },
  { query: "romantic Hindi songs", name: "🇮🇳 Romantic Hindi Songs", region: "IN" },
  { query: "AR Rahman songs", name: "🇮🇳 A.R. Rahman Hits", region: "IN" },
  { query: "Kishore Kumar songs", name: "🇮🇳 Kishore Kumar Classics", region: "IN" },
  { query: "Lata Mangeshkar songs", name: "🇮🇳 Lata Mangeshkar", region: "IN" },
  { query: "old Hindi songs", name: "🇮🇳 Old Hindi Classics", region: "IN" },
  { query: "Shreya Ghoshal songs", name: "🇮🇳 Shreya Ghoshal", region: "IN" },
  { query: "Sonu Nigam songs", name: "🇮🇳 Sonu Nigam Hits", region: "IN" },
  
  // Indian Music - Regional
  { query: "Punjabi songs 2024", name: "🇮🇳 Latest Punjabi Music", region: "IN" },
  { query: "Tamil songs 2024", name: "🇮🇳 Tamil Hits", region: "IN" },
  { query: "Telugu songs 2024", name: "🇮🇳 Telugu Music", region: "IN" },
  { query: "Bengali songs", name: "🇮🇳 Bengali Music", region: "IN" },
  { query: "Marathi songs", name: "🇮🇳 Marathi Songs", region: "IN" },
  { query: "Malayalam songs", name: "🇮🇳 Malayalam Hits", region: "IN" },
  { query: "Kannada songs", name: "🇮🇳 Kannada Music", region: "IN" },
  { query: "Bhojpuri songs", name: "🇮🇳 Bhojpuri Hits", region: "IN" },
  { query: "Gujarati songs", name: "🇮🇳 Gujarati Music", region: "IN" },
  
  // Indian Music - Genres & Styles
  { query: "Indian classical music", name: "🇮🇳 Classical Indian Music", region: "IN" },
  { query: "Desi hip hop rap", name: "🇮🇳 Desi Hip Hop", region: "IN" },
  { query: "Sufi songs", name: "🇮🇳 Sufi Music", region: "IN" },
  { query: "Ghazal songs", name: "🇮🇳 Ghazals", region: "IN" },
  { query: "Bhangra songs", name: "🇮🇳 Bhangra", region: "IN" },
  { query: "Indian folk music", name: "🇮🇳 Folk Music", region: "IN" },
  { query: "Qawwali songs", name: "🇮🇳 Qawwali", region: "IN" },
  { query: "Indipop songs", name: "🇮🇳 Indi-Pop", region: "IN" },
  { query: "Bollywood party songs", name: "🇮🇳 Bollywood Party", region: "IN" },
  { query: "Devotional Hindi songs", name: "🇮🇳 Devotional Music", region: "IN" },
  
  // Indian Classical Ragas
  { query: "Hindustani classical ragas", name: "🎵 Hindustani Ragas", region: "IN" },
  { query: "Carnatic classical ragas", name: "🎵 Carnatic Ragas", region: "IN" },
  { query: "morning ragas bhairav", name: "🌅 Morning Ragas", region: "IN" },
  { query: "evening ragas yaman", name: "🌆 Evening Ragas", region: "IN" },
  { query: "night ragas darbari", name: "🌙 Night Ragas", region: "IN" },
  { query: "monsoon ragas megh malhar", name: "🌧️ Monsoon Ragas", region: "IN" },
  { query: "raga bhairavi classical", name: "🎵 Raga Bhairavi", region: "IN" },
  { query: "raga yaman classical", name: "🎵 Raga Yaman", region: "IN" },
  { query: "raga bhupali classical", name: "🎵 Raga Bhupali", region: "IN" },
  { query: "raga darbari classical", name: "🎵 Raga Darbari", region: "IN" },
  { query: "instrumental ragas sitar", name: "🎸 Instrumental Ragas", region: "IN" },
  { query: "vocal classical ragas", name: "🎤 Vocal Ragas", region: "IN" },
  
  // Korean Music (K-Pop)
  { query: "K-pop 2024", name: "🇰🇷 K-Pop Hits", region: "KR" },
  { query: "BTS songs", name: "🇰🇷 BTS", region: "KR" },
  { query: "Blackpink songs", name: "🇰🇷 BLACKPINK", region: "KR" },
  { query: "Seventeen kpop", name: "🇰🇷 Seventeen", region: "KR" },
  { query: "NewJeans kpop", name: "🇰🇷 NewJeans", region: "KR" },
  { query: "Stray Kids", name: "🇰🇷 Stray Kids", region: "KR" },
  
  // Latin Music
  { query: "reggaeton 2024", name: "🇨🇴 Reggaeton Hits", region: "MX" },
  { query: "Bad Bunny songs", name: "🇵🇷 Bad Bunny", region: "MX" },
  { query: "Latin pop 2024", name: "🌎 Latin Pop", region: "MX" },
  { query: "Shakira songs", name: "🇨🇴 Shakira", region: "CO" },
  { query: "salsa music", name: "💃 Salsa", region: "MX" },
  { query: "bachata music", name: "🎶 Bachata", region: "MX" },
  { query: "J Balvin songs", name: "🇨🇴 J Balvin", region: "CO" },
  
  // Arabic Music
  { query: "Arabic pop songs 2024", name: "🇪🇬 Arabic Pop", region: "AE" },
  { query: "Arabic music", name: "🇸🇦 Arabic Hits", region: "AE" },
  { query: "Amr Diab songs", name: "🇪🇬 Amr Diab", region: "EG" },
  { query: "Arabic love songs", name: "💕 Arabic Love Songs", region: "AE" },
  
  // African Music
  { query: "Afrobeats 2024", name: "🇳🇬 Afrobeats", region: "NG" },
  { query: "Amapiano 2024", name: "🇿🇦 Amapiano", region: "ZA" },
  { query: "Burna Boy songs", name: "🇳🇬 Burna Boy", region: "NG" },
  { query: "Wizkid songs", name: "🇳🇬 Wizkid", region: "NG" },
  
  // Japanese Music
  { query: "J-pop 2024", name: "🇯🇵 J-Pop", region: "JP" },
  { query: "anime songs", name: "🇯🇵 Anime Music", region: "JP" },
  { query: "city pop japan", name: "🇯🇵 City Pop", region: "JP" },
  
  // Turkish Music
  { query: "Turkish pop songs 2024", name: "🇹🇷 Turkish Pop", region: "TR" },
  { query: "Turkish music", name: "🇹🇷 Turkish Hits", region: "TR" },
  
  // Brazilian Music
  { query: "Brazilian funk 2024", name: "🇧🇷 Brazilian Funk", region: "BR" },
  { query: "samba music", name: "🇧🇷 Samba", region: "BR" },
  { query: "bossa nova", name: "🇧🇷 Bossa Nova", region: "BR" },
  
  // French Music
  { query: "French pop music", name: "🇫🇷 French Pop", region: "FR" },
  { query: "French songs 2024", name: "🇫🇷 French Hits", region: "FR" },
  
  // Spanish Music
  { query: "Spanish pop songs", name: "🇪🇸 Spanish Pop", region: "ES" },
  { query: "flamenco music", name: "🇪🇸 Flamenco", region: "ES" },
  
  // Italian Music
  { query: "Italian pop songs", name: "🇮🇹 Italian Pop", region: "IT" },
  { query: "Italian music 2024", name: "🇮🇹 Italian Hits", region: "IT" },
  
  // German Music
  { query: "German pop songs", name: "🇩🇪 German Pop", region: "DE" },
  { query: "Deutsch rap", name: "🇩🇪 German Rap", region: "DE" },
  
  // UK Music
  { query: "UK drill music", name: "🇬🇧 UK Drill", region: "GB" },
  { query: "British pop songs", name: "🇬🇧 British Pop", region: "GB" },
  { query: "grime music", name: "🇬🇧 Grime", region: "GB" },
  
  // Caribbean Music
  { query: "dancehall music", name: "🇯🇲 Dancehall", region: "JM" },
  { query: "reggae music", name: "🇯🇲 Reggae", region: "JM" },
  { query: "soca music", name: "🌴 Soca", region: "TT" },
  
  // International Pop & Electronic
  { query: "top pop songs 2024", name: "🌍 Global Pop Hits", region: "US" },
  { query: "EDM music 2024", name: "🎧 EDM & Dance", region: "US" },
  { query: "house music", name: "🏠 House Music", region: "US" },
  { query: "techno music", name: "⚡ Techno", region: "DE" },
  { query: "trance music", name: "🌊 Trance", region: "NL" },
  { query: "dubstep music", name: "🔊 Dubstep", region: "GB" },
  
  // US Music - Hip Hop & R&B
  { query: "hip hop 2024", name: "🎤 Hip Hop", region: "US" },
  { query: "R&B songs 2024", name: "🎵 R&B Vibes", region: "US" },
  { query: "trap music 2024", name: "💎 Trap Music", region: "US" },
  { query: "old school hip hop", name: "📻 Old School Hip Hop", region: "US" },
  { query: "Drake songs", name: "🇨🇦 Drake", region: "US" },
  { query: "Kendrick Lamar", name: "🎤 Kendrick Lamar", region: "US" },
  
  // US Music - Other Genres
  { query: "country music 2024", name: "🤠 Country Music", region: "US" },
  { query: "rock music classic", name: "🎸 Classic Rock", region: "US" },
  { query: "alternative rock", name: "🎸 Alternative Rock", region: "US" },
  { query: "indie music 2024", name: "🎨 Indie Music", region: "US" },
  { query: "jazz music", name: "🎷 Jazz", region: "US" },
  { query: "blues music", name: "🎺 Blues", region: "US" },
  { query: "soul music", name: "✨ Soul Music", region: "US" },
  { query: "funk music", name: "🕺 Funk", region: "US" },
  { query: "metal music", name: "🤘 Metal", region: "US" },
  
  // Classic & Timeless
  { query: "80s music hits", name: "📼 80s Classics", region: "US" },
  { query: "90s music hits", name: "💿 90s Hits", region: "US" },
  { query: "2000s pop songs", name: "📱 2000s Pop", region: "US" },
  { query: "disco music", name: "🪩 Disco", region: "US" },
  
  // Relaxing & Mood Music
  { query: "lofi hip hop", name: "☕ Lo-Fi Beats", region: "US" },
  { query: "chill music", name: "😌 Chill Vibes", region: "US" },
  { query: "acoustic music", name: "🎸 Acoustic", region: "US" },
  { query: "piano music relaxing", name: "🎹 Piano Relaxation", region: "US" },
  { query: "meditation music", name: "🧘 Meditation", region: "US" },
];

// Function to get today's music category based on day of year
const getTodaysCategory = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % INDIAN_MUSIC_CATEGORIES.length;
  return INDIAN_MUSIC_CATEGORIES[index];
};

// Get today's Indian music category
const todaysCategory = getTodaysCategory();

// Mode: 'public' or 'user'
const MODE = "public"; // Change to 'user' to fetch current user's playlists

export default function YouTubeHomeScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState(todaysCategory.name);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(todaysCategory.query);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  // 🎵 Search for Music Videos by Category
  const searchIndianMusic = async (searchQuery = todaysCategory.query, categoryName = todaysCategory.name, regionCode = todaysCategory.region) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=10&regionCode=${regionCode}&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (data.error) {
        console.error("Search failed:", data.error);
        throw new Error(data.error.message || "Failed to search videos");
      }

      // Format the data
      const formattedVideos = data.items?.map((item) => ({
        id: item.id?.videoId || item.id,
        title: item.snippet?.title,
        channel: item.snippet?.channelTitle,
        thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
        publishedAt: item.snippet?.publishedAt,
      })) || [];

      setVideos(formattedVideos);
      setPlaylistTitle(categoryName);
      setSelectedCategory(searchQuery);
    } catch (err) {
      setError(err.message);
      console.error("YouTube search error:", err);
      // Try fallback to trending
      try {
        await fetchPopularMusicVideos();
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback: Fetch popular music videos from India
  const fetchPopularMusicVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&regionCode=IN&videoCategoryId=10&maxResults=25&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch videos");
      }

      const formattedVideos = data.items?.map((item) => ({
        id: item.id,
        title: item.snippet?.title,
        channel: item.snippet?.channelTitle,
        thumbnail: item.snippet?.thumbnails?.medium?.url,
        publishedAt: item.snippet?.publishedAt,
      })) || [];

      setVideos(formattedVideos);
      setPlaylistTitle("Trending Music in India");
    } catch (err) {
      throw err;
    }
  };


  // 🔗 Open video in YouTube app or browser
  const openVideo = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(youtubeUrl).catch((err) =>
      console.error("Failed to open video:", err)
    );
  };

  // 🔐 Google OAuth Authentication for User Playlists
  const authenticateWithGoogle = async () => {
    console.log("🔵 Sign in button clicked!");
    console.log("Client ID:", GOOGLE_CLIENT_ID);
    
    try {
      setLoading(true);
      setError(null);

      // Create the redirect URI for Expo
      const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
      });

      console.log("🔗 Redirect URI:", redirectUri);
      console.log("⚠️ IMPORTANT: Add this redirect URI to Google Cloud Console under 'Authorized redirect URIs'");

      // OAuth endpoints
      const discovery = {
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenEndpoint: "https://oauth2.googleapis.com/token",
      };

      // Start OAuth flow
      const authRequestConfig = {
        clientId: GOOGLE_CLIENT_ID,
        scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
        redirectUri,
        responseType: AuthSession.ResponseType.Token,
      };

      const authRequest = new AuthSession.AuthRequest(authRequestConfig);
      await authRequest.makeAuthUrlAsync(discovery);

      const result = await authRequest.promptAsync(discovery, {
        useProxy: true,
      });

      console.log("✅ Auth Result:", result);
      console.log("📋 Result type:", result.type);
      console.log("📋 Full result:", JSON.stringify(result, null, 2));

      if (result.type === "success") {
        const { access_token } = result.params;

        if (access_token) {
          console.log("🎉 Access token received!");
          // Store the token
          await AsyncStorage.setItem("youtube_access_token", access_token);
          setAccessToken(access_token);
          setIsAuthenticated(true);

          // Fetch user playlists
          await fetchUserPlaylists(access_token);
          
          Alert.alert("Success", "Signed in successfully!");
        } else {
          throw new Error("No access token received");
        }
      } else if (result.type === "error") {
        console.error("❌ Auth error:", result.error);
        console.error("❌ Error params:", result.params);
        throw new Error(result.error?.message || result.params?.error_description || "Authentication failed");
      } else if (result.type === "dismiss" || result.type === "cancel") {
        // User cancelled
        console.log("⚠️ User cancelled authentication");
        setLoading(false);
        return;
      } else {
        console.warn("⚠️ Unknown result type:", result.type);
        console.warn("Full result:", result);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "Failed to sign in");
      Alert.alert(
        "Sign In Failed",
        err.message || "Failed to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 📋 Fetch User's Playlists (requires OAuth token)
  const fetchUserPlaylists = async (token) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Failed to fetch your playlists");
      }

      setUserPlaylists(data.items || []);
      
      // Auto-select first playlist
      if (data.items && data.items.length > 0) {
        loadPlaylistVideos(data.items[0].id, token);
        setPlaylistTitle(data.items[0].snippet.title);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user playlists:", err);
    }
  };

  // 🎵 Load videos from selected playlist
  const loadPlaylistVideos = async (playlistId, token = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const url = token
        ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}`
        : `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;

      const response = await fetch(url, { headers });
      const data = await response.json();

      if (data.error) {
        console.warn("Playlist load failed:", data.error.message);
        // Fallback to popular music
        if (!token) {
          await fetchPopularMusicVideos();
          return;
        }
        throw new Error(data.error.message || "Failed to fetch videos");
      }

      const formattedVideos =
        data.items?.map((item) => ({
          id: item.contentDetails?.videoId || item.id,
          title: item.snippet?.title,
          channel: item.snippet?.channelTitle,
          thumbnail:
            item.snippet?.thumbnails?.medium?.url ||
            item.snippet?.thumbnails?.default?.url,
          publishedAt: item.snippet?.publishedAt,
        })) || [];

      setVideos(formattedVideos);
      setSelectedPlaylist(playlistId);
    } catch (err) {
      setError(err.message);
      console.error("Error loading playlist videos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check for stored token on mount
  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("youtube_access_token");
      if (storedToken) {
        setAccessToken(storedToken);
        setIsAuthenticated(true);
        return storedToken;
      }
    } catch (err) {
      console.error("Error checking auth:", err);
    }
    return null;
  };

  useEffect(() => {
    const initializeScreen = async () => {
      if (MODE === "user") {
        // Check if user is authenticated
        const token = await checkAuthentication();
        if (token) {
          await fetchUserPlaylists(token);
        } else {
          setLoading(false);
          // Show login prompt
        }
      } else {
        // Public mode - search for today's Indian music category
        searchIndianMusic();
      }
    };

    initializeScreen();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.text}>Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>❌ Error: {error}</Text>
        <Text style={styles.subText}>
          {MODE === "user"
            ? "Make sure you've set up OAuth credentials. See YOUTUBE_SETUP.md"
            : "Make sure you've added your YouTube API key at the top of HomeScreen.jsx"}
        </Text>
      </View>
    );
  }

  // Show login screen for user mode when not authenticated
  if (MODE === "user" && !isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Sign in with Google</Text>
          <Text style={styles.text}>
            Sign in to access your YouTube playlists
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={authenticateWithGoogle}
          >
            <Text style={styles.loginButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchModeButton}
            onPress={() => {
              // Switch to public mode by changing MODE constant and reloading
              Alert.alert(
                "Switch Mode",
                "To use public playlists instead, change MODE to 'public' at the top of HomeScreen.jsx"
              );
            }}
          >
            <Text style={styles.switchModeText}>Browse public playlists instead</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>⚠️ No videos found</Text>
        {MODE === "user" && userPlaylists.length === 0 && (
          <Text style={styles.subText}>
            You don't have any playlists yet. Create one on YouTube!
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.subtitle}>🎵 Today's Featured Music</Text>
        <Text style={styles.title}>{playlistTitle}</Text>
          <Text style={styles.playlistInfo}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • Changes Daily
          </Text>
        </View>
        {MODE === "user" && isAuthenticated && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={async () => {
              await AsyncStorage.removeItem("youtube_access_token");
              setIsAuthenticated(false);
              setAccessToken(null);
              setUserPlaylists([]);
              setVideos([]);
            }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Browse Categories Button (Public Mode) */}
      {MODE === "public" && (
        <TouchableOpacity
          style={styles.browseCategoriesButton}
          onPress={() => setShowCategoriesModal(true)}
          activeOpacity={0.8}
        >
          <View style={styles.browseCategoriesContent}>
            <View style={styles.browseCategoriesLeft}>
              <Text style={styles.browseCategoriesIcon}>🌍</Text>
              <View>
                <Text style={styles.browseCategoriesTitle}>Browse Music Categories</Text>
                <Text style={styles.browseCategoriesSubtitle}>
                  {INDIAN_MUSIC_CATEGORIES.length} categories from around the world
                </Text>
              </View>
            </View>
            <Text style={styles.browseCategoriesArrow}>›</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Categories Modal */}
      <Modal
        visible={showCategoriesModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoriesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>🌍 Music Categories</Text>
                <Text style={styles.modalSubtitle}>
                  {INDIAN_MUSIC_CATEGORIES.length} categories • Tap to explore
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCategoriesModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Categories Grid */}
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalCategoriesGrid}
              showsVerticalScrollIndicator={true}
            >
              {INDIAN_MUSIC_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.query}
                  style={[
                    styles.modalCategoryCard,
                    selectedCategory === category.query && styles.modalCategoryCardActive,
                  ]}
                  onPress={() => {
                    searchIndianMusic(category.query, category.name, category.region);
                    setShowCategoriesModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  {todaysCategory.query === category.query && (
                    <View style={styles.todayBadgeContainer}>
                      <Text style={styles.todayBadge}>⭐ TODAY</Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.modalCategoryCardText,
                      selectedCategory === category.query &&
                        styles.modalCategoryCardTextActive,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* User Playlists Selector */}
      {MODE === "user" && userPlaylists.length > 0 && (
        <View style={styles.playlistSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {userPlaylists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                style={[
                  styles.playlistChip,
                  selectedPlaylist === playlist.id && styles.playlistChipActive,
                ]}
                onPress={() => {
                  setPlaylistTitle(playlist.snippet.title);
                  loadPlaylistVideos(playlist.id, accessToken);
                }}
              >
                <Text
                  style={[
                    styles.playlistChipText,
                    selectedPlaylist === playlist.id &&
                      styles.playlistChipTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {playlist.snippet.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={videos}
        keyExtractor={(item, index) => item?.id ?? index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => openVideo(item.id)}
            activeOpacity={0.7}
          >
            {item?.thumbnail && (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
            )}
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item?.title}
              </Text>
              <Text style={styles.channelName} numberOfLines={1}>
                {item?.channel}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Additional responsive breakpoint
const isExtraLargeScreen = SCREEN_WIDTH >= 1024; // Desktop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 16,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    marginTop: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0000",
    marginBottom: 4,
  },
  playlistInfo: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  signOutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#282828",
    borderRadius: 6,
  },
  signOutText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "600",
  },
  // Browse Categories Button
  browseCategoriesButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    ...(isWeb && {
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
  },
  browseCategoriesContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  browseCategoriesLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  browseCategoriesIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  browseCategoriesTitle: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  browseCategoriesSubtitle: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  browseCategoriesArrow: {
    fontSize: 32,
    color: "#FF0000",
    fontWeight: "300",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "flex-end",
    ...(isLargeScreen && {
      justifyContent: "center",
      alignItems: "center",
    }),
  },
  modalContent: {
    backgroundColor: "#0f0f0f",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    ...(isLargeScreen && {
      borderRadius: 24,
      maxHeight: "85%",
      width: "90%",
      maxWidth: 1200,
    }),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  modalTitle: {
    fontSize: isLargeScreen ? 24 : 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    ...(isWeb && {
      cursor: "pointer",
    }),
  },
  closeButtonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "400",
  },
  modalScrollView: {
    flex: 1,
  },
  modalCategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: isExtraLargeScreen ? 14 : isLargeScreen ? 12 : 10,
    paddingBottom: 40,
  },
  modalCategoryCard: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: isExtraLargeScreen ? 20 : isLargeScreen ? 16 : 14,
    paddingVertical: isExtraLargeScreen ? 16 : isLargeScreen ? 14 : 12,
    borderRadius: 14,
    minWidth: isExtraLargeScreen 
      ? Math.floor((SCREEN_WIDTH * 0.85 - 120) / 6) 
      : isLargeScreen 
        ? Math.floor((SCREEN_WIDTH * 0.85 - 100) / 5) 
        : Math.floor((SCREEN_WIDTH - 80) / 2),
    maxWidth: isExtraLargeScreen ? 200 : isLargeScreen ? 180 : 170,
    flex: isWeb ? 1 : 0,
    flexBasis: isExtraLargeScreen 
      ? "15%" 
      : isLargeScreen 
        ? "18%" 
        : "47%",
    minHeight: isLargeScreen ? 68 : 58,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    ...(isWeb && {
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
  },
  modalCategoryCardActive: {
    backgroundColor: "#FF0000",
    borderColor: "#FF4444",
    borderWidth: 2,
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  modalCategoryCardText: {
    color: "#e0e0e0",
    fontSize: isLargeScreen ? 13.5 : 12.5,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  modalCategoryCardTextActive: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  todayBadgeContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 10,
  },
  todayBadge: {
    backgroundColor: "#FFD700",
    color: "#000",
    fontSize: isExtraLargeScreen ? 10 : isLargeScreen ? 9 : 8,
    fontWeight: "900",
    paddingHorizontal: isLargeScreen ? 8 : 6,
    paddingVertical: isLargeScreen ? 4 : 3,
    borderRadius: 10,
    overflow: "hidden",
    letterSpacing: 0.8,
    borderWidth: 1.5,
    borderColor: "#000",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  // Old Playlist Selector (for user mode)
  playlistSelector: {
    marginBottom: 16,
  },
  playlistChip: {
    backgroundColor: "#282828",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    maxWidth: 250,
    position: "relative",
  },
  playlistChipActive: {
    backgroundColor: "#FF0000",
  },
  playlistChipText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "500",
  },
  playlistChipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  videoItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  thumbnail: {
    width: 120,
    height: 90,
    backgroundColor: "#282828",
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  videoTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 20,
  },
  channelName: {
    color: "#aaa",
    fontSize: 13,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  subText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loginButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    minWidth: 200,
    elevation: 4,
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  switchModeButton: {
    marginTop: 16,
    padding: 12,
  },
  switchModeText: {
    color: "#aaa",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
