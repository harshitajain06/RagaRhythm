// SuggestionScreen.js
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { OpenAI } from "openai";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebase"; // adjust path to your firebase.js

// Function to get API key from Firebase
const getApiKeyFromFirebase = async () => {
  try {
    const apiKeyDoc = await getDoc(doc(db, "configSaketh", "openai"));
    if (apiKeyDoc.exists()) {
      return apiKeyDoc.data().apiKey;
    } else {
      console.error("API key not found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching API key from Firebase:", error);
    return null;
  }
};

export default function SuggestionScreen() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [apiKey, setApiKey] = useState(null);

  // Load API key from Firebase on component mount
  useEffect(() => {
    const loadApiKey = async () => {
      const key = await getApiKeyFromFirebase();
      setApiKey(key);
    };
    loadApiKey();
  }, []);

  const analyzeMoodAndSuggestSongs = async () => {
    if (!userInput.trim()) return;

    if (!apiKey) {
      setSuggestions(["API key not available. Please check Firebase configuration."]);
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a music recommender. Based on the user's feelings, suggest 5 songs that match their mood. Return only song title and artist in bullet points.",
          },
          { role: "user", content: userInput },
        ],
      });

      const result =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate suggestions.";

      // Convert GPT output into an array of song strings
      const songList = result
        .split("\n")
        .map((line) => line.replace(/^[-•\d.]+\s*/, "").trim()) // remove bullets/numbers
        .filter((line) => line.length > 0);

      setSuggestions(songList);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions(["Something went wrong. Try again later."]);
    } finally {
      setLoading(false);
    }
  };

  const openSong = async (song) => {
    const query = encodeURIComponent(song + " song");
    const url = `https://www.youtube.com/results?search_query=${query}`;

    // Save clicked song to Firestore
    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "clickedSongs"), {
          uid: auth.currentUser.uid,
          song,
          url,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error saving clicked song:", err);
    }

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mood-based Song Suggestions 🎶</Text>

      <TextInput
        style={styles.input}
        placeholder="How are you feeling today?"
        placeholderTextColor="#888"
        value={userInput}
        onChangeText={setUserInput}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={analyzeMoodAndSuggestSongs}
      >
        <Text style={styles.buttonText}>Get Suggestions</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007BFF" />}

      <ScrollView style={styles.resultBox}>
        {suggestions.map((song, index) => (
          <TouchableOpacity key={index} onPress={() => openSong(song)}>
            <Text style={styles.linkText}>🎵 {song}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultBox: {
    marginTop: 10,
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#4da6ff",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
