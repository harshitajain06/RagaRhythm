// SuggestionScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { OpenAI } from "openai";

// ⚠️ Put your key here (for testing only, better to keep in .env or app.json in production)
const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true, // required for RN/Expo
});

export default function SuggestionScreen() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const analyzeMoodAndSuggestSongs = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setSuggestions("");

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a music recommender. Based on the user's feelings, suggest 5 songs that match their mood. Provide results in bullet points.",
          },
          { role: "user", content: userInput },
        ],
      });

      const result =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn’t generate suggestions.";
      setSuggestions(result);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.resultText}>{suggestions}</Text>
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
  resultText: {
    fontSize: 16,
    color: "#ddd",
    lineHeight: 22,
  },
});
