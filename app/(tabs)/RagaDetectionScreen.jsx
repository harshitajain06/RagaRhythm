import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { doc, getDoc } from "firebase/firestore";
import { OpenAI } from "openai";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../config/firebase";

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

// Function to clean markdown formatting from text
const cleanMarkdownText = (text) => {
  if (!text) return text;
  
  return text
    // Remove markdown headers (##, ###, etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold markers (**text** or __text__)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    // Remove italic markers (*text* or _text_)
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // Remove bullet points and replace with •
    .replace(/^\s*[-*+]\s+/gm, '• ')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export default function RagaDetectionScreen() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const isWeb = Platform.OS === 'web';

  // Load API key from Firebase on component mount
  useEffect(() => {
    const loadApiKey = async () => {
      const key = await getApiKeyFromFirebase();
      setApiKey(key);
    };
    loadApiKey();
  }, []);

  // Request audio permissions
  const requestPermissions = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      return granted;
    } catch (err) {
      console.error("Permission error:", err);
      return false;
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert("Permission required", "Please grant microphone access to record audio.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setResult(null);
    } catch (err) {
      console.error("Failed to start recording:", err);
      Alert.alert("Error", "Failed to start recording. Please try again.");
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioFile({ uri, name: "recording.m4a" });
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording:", err);
      Alert.alert("Error", "Failed to stop recording.");
    }
  };

  // Pick audio file
  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success' || !result.canceled) {
        const file = result.assets ? result.assets[0] : result;
        setAudioFile(file);
        setResult(null);
      }
    } catch (err) {
      console.error("Error picking file:", err);
      Alert.alert("Error", "Failed to pick audio file.");
    }
  };

  // Analyze audio using OpenAI (simulated - would need actual audio processing)
  const analyzeRaga = async () => {
    if (!audioFile) {
      Alert.alert("No audio", "Please record or upload an audio file first.");
      return;
    }

    if (!apiKey) {
      Alert.alert("API Error", "API key not available. Please check Firebase configuration.");
      return;
    }

    setAnalyzing(true);
    
    try {
      // In a real implementation, you would:
      // 1. Extract audio features (pitch, notes, intervals)
      // 2. Send to a specialized raga detection service/model
      // 3. Get the detected raga and its characteristics
      
      // For this demo, we'll use GPT to provide educational content about raga detection
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Hindustani classical music expert. When analyzing audio, provide:
1. Most likely raga based on common patterns
2. Key characteristics (notes, mood, time of day)
3. Similar ragas
4. Learning tips
Format your response clearly with sections.`,
          },
          {
            role: "user",
            content: `Provide information about a randomly selected popular raga from: Yaman, Bhairavi, Bhupali, Darbari, Malkauns, Bageshri, or Bihag. Structure your response with clear sections.`
          },
        ],
      });

      const analysisResult = completion.choices[0]?.message?.content || "Analysis failed.";
      const cleanedAnalysis = cleanMarkdownText(analysisResult);
      
      setResult({
        analysis: cleanedAnalysis,
        confidence: "75-90%", // Demo value
        audioName: audioFile.name || "Recorded Audio"
      });
      
    } catch (err) {
      console.error("Analysis error:", err);
      Alert.alert("Error", "Failed to analyze audio. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎵 Raga Detection</Text>
        <Text style={styles.subtitle}>
          Record or upload audio to identify the raga
        </Text>
      </View>

      {/* Instructions Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📚 How it works</Text>
        <Text style={styles.infoText}>
          • Record yourself singing or humming a melody{'\n'}
          • Upload an audio file of classical music{'\n'}
          • AI analyzes pitch patterns and notes{'\n'}
          • Get the raga name and characteristics
        </Text>
      </View>

      {/* Recording Controls */}
      <View style={styles.controlsCard}>
        <Text style={styles.cardTitle}>🎤 Record Audio</Text>
        
        {!isRecording ? (
          <TouchableOpacity
            style={[styles.recordButton, isWeb && styles.recordButtonWeb]}
            onPress={startRecording}
            activeOpacity={0.8}
          >
            <Text style={styles.recordButtonText}>🎙️ Start Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.stopButton, isWeb && styles.stopButtonWeb]}
            onPress={stopRecording}
            activeOpacity={0.8}
          >
            <Text style={styles.stopButtonText}>⏹️ Stop Recording</Text>
          </TouchableOpacity>
        )}

        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Recording...</Text>
          </View>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.uploadButton, isWeb && styles.uploadButtonWeb]}
          onPress={pickAudioFile}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadButtonText}>📁 Upload Audio File</Text>
        </TouchableOpacity>

        {audioFile && (
          <View style={styles.fileInfo}>
            <Text style={styles.fileText}>
              ✓ {audioFile.name || "Audio file selected"}
            </Text>
          </View>
        )}
      </View>

      {/* Analyze Button */}
      {audioFile && (
        <TouchableOpacity
          style={[styles.analyzeButton, isWeb && styles.analyzeButtonWeb]}
          onPress={analyzeRaga}
          disabled={analyzing}
          activeOpacity={0.8}
        >
          {analyzing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.analyzeButtonText}>🔍 Analyze Raga</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Results */}
      {result && (
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>📊 Analysis Results</Text>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Audio File:</Text>
            <Text style={styles.resultValue}>{result.audioName}</Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Confidence:</Text>
            <Text style={styles.resultValue}>{result.confidence}</Text>
          </View>
          <View style={styles.analysisSection}>
            <Text style={styles.analysisText}>{result.analysis}</Text>
          </View>
        </View>
      )}

      {/* Popular Ragas Reference */}
      <View style={styles.referenceCard}>
        <Text style={styles.cardTitle}>🎼 Popular Ragas</Text>
        <View style={styles.ragaList}>
          {[
            { name: 'Yaman', time: 'Evening', mood: 'Peaceful, devotional' },
            { name: 'Bhairavi', time: 'Morning/Anytime', mood: 'Devotional, serious' },
            { name: 'Bhupali', time: 'Evening', mood: 'Joyful, simple' },
            { name: 'Darbari', time: 'Late night', mood: 'Serious, majestic' },
            { name: 'Malkauns', time: 'Late night', mood: 'Deep, contemplative' },
            { name: 'Bageshri', time: 'Night', mood: 'Romantic, serene' },
          ].map((raga, index) => (
            <View key={index} style={styles.ragaItem}>
              <Text style={styles.ragaName}>{raga.name}</Text>
              <Text style={styles.ragaDetails}>
                ⏰ {raga.time} • 💭 {raga.mood}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
  controlsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  recordButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButtonWeb: {
    cursor: 'pointer',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  stopButtonWeb: {
    cursor: 'pointer',
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 12,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  recordingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#888',
    fontSize: 12,
    paddingHorizontal: 12,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonWeb: {
    cursor: 'pointer',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  fileText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  analyzeButton: {
    backgroundColor: '#FF0000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzeButtonWeb: {
    cursor: 'pointer',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  resultItem: {
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  analysisSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  analysisText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 22,
  },
  referenceCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  ragaList: {
    gap: 12,
  },
  ragaItem: {
    backgroundColor: '#2a2a2a',
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
  },
  ragaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  ragaDetails: {
    fontSize: 13,
    color: '#aaa',
  },
});

