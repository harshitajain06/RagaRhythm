import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

// ⚠️ Replace these with your credentials
const client_id = "d16a098717694a05a9a40f9a15d90a85";
const client_secret = "8aed1c266486482a9732edd33e553670";

// Example playlist: Spotify "Today's Top Hits"
const playlistId = "2wIQvE3M5kaxi5BSlCnHoE";

export default function SpotifyPlaylist() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔑 Step 1: Get Access Token
  const getAccessToken = async () => {
    try {
      const authHeader =
        "Basic " + btoa(client_id + ":" + client_secret);

      const tokenResponse = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: authHeader,
          },
          body: "grant_type=client_credentials",
        }
      );

      const tokenData = await tokenResponse.json();
      if (tokenData.access_token) {
        return tokenData.access_token;
      } else {
        throw new Error(tokenData.error_description || "Failed to get token");
      }
    } catch (err) {
      throw new Error("Token fetch error: " + err.message);
    }
  };

  // 🔑 Step 2: Fetch Playlist
  const getPlaylist = async () => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setPlaylist(data);
    } catch (err) {
      setError(err.message);
      console.error("Playlist fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.text}>Loading playlist...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>❌ Error: {error}</Text>
      </View>
    );
  }

  if (!playlist || !playlist.tracks) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>⚠️ No playlist data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playlist.name}</Text>
      <FlatList
        data={playlist.tracks?.items || []}
        keyExtractor={(item, index) => item?.track?.id ?? index.toString()}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            {item?.track?.album?.images?.[0]?.url && (
              <Image
                source={{ uri: item.track.album.images[0].url }}
                style={styles.albumArt}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.trackName}>{item?.track?.name}</Text>
              <Text style={styles.artistName}>
                {item?.track?.artists?.map((a) => a.name).join(", ")}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1DB954",
    marginBottom: 12,
    textAlign: "center",
  },
  trackItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 8,
  },
  albumArt: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 6,
  },
  trackName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  artistName: {
    color: "#ccc",
    fontSize: 14,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
