import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

// ⚠️ Replace with your YouTube Data API v3 key from https://console.cloud.google.com/
const YOUTUBE_API_KEY = "AIzaSyCGz_3lXwrvLSKjep6YuSYp-P4mxzlCss8";

// ⚠️ For user authentication, add your OAuth Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "348329748433-ir1rt27jb75fsjpjm8957p9kgo4kukbl.apps.googleusercontent.com";

// You can change this to any YouTube playlist ID or use 'mostPopular' for trending videos
const YOUTUBE_PLAYLIST_ID = "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"; // Example: YouTube Music Official Chart

// Mode: 'public' or 'user'
const MODE = "user"; // Change to 'user' to fetch current user's playlists

export default function YouTubeHomeScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState("Trending Music");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // 🎥 Fetch YouTube Videos
  const fetchYouTubeVideos = async () => {
    try {
      // Option 1: Fetch from a specific playlist
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
      );

      const playlistData = await playlistResponse.json();

      if (playlistData.error) {
        throw new Error(playlistData.error.message || "Failed to fetch videos");
      }

      // Get playlist details
      const playlistDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${YOUTUBE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
      );

      const playlistDetailsData = await playlistDetailsResponse.json();
      
      if (playlistDetailsData.items && playlistDetailsData.items.length > 0) {
        setPlaylistTitle(playlistDetailsData.items[0].snippet.title);
      }

      // Format the data
      const formattedVideos = playlistData.items?.map((item) => ({
        id: item.contentDetails?.videoId || item.id,
        title: item.snippet?.title,
        channel: item.snippet?.channelTitle,
        thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
        publishedAt: item.snippet?.publishedAt,
      })) || [];

      setVideos(formattedVideos);
    } catch (err) {
      setError(err.message);
      console.error("YouTube fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Alternative: Fetch Most Popular Videos (uncomment to use)
  // const fetchPopularVideos = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=25&key=${YOUTUBE_API_KEY}`
  //     );
  //
  //     const data = await response.json();
  //
  //     if (data.error) {
  //       throw new Error(data.error.message || "Failed to fetch videos");
  //     }
  //
  //     const formattedVideos = data.items?.map((item) => ({
  //       id: item.id,
  //       title: item.snippet?.title,
  //       channel: item.snippet?.channelTitle,
  //       thumbnail: item.snippet?.thumbnails?.medium?.url,
  //       publishedAt: item.snippet?.publishedAt,
  //     })) || [];
  //
  //     setVideos(formattedVideos);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("YouTube fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

      console.log("Auth Result:", result);

      if (result.type === "success") {
        const { access_token } = result.params;

        if (access_token) {
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
        throw new Error(result.error?.message || "Authentication failed");
      } else {
        // User cancelled
        console.log("User cancelled authentication");
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
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const url = token
        ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}`
        : `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;

      const response = await fetch(url, { headers });
      const data = await response.json();

      if (data.error) {
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
        // Public mode - fetch public playlist
        fetchYouTubeVideos();
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
        <Text style={styles.title}>{playlistTitle}</Text>
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
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000",
    flex: 1,
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
  playlistSelector: {
    marginBottom: 16,
  },
  playlistChip: {
    backgroundColor: "#282828",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    maxWidth: 200,
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
