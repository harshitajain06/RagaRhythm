import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function PracticeLoopsScreen() {
  const [selectedRaga, setSelectedRaga] = useState(null);
  const [tempo, setTempo] = useState(60); // BPM
  const [selectedTaal, setSelectedTaal] = useState('Teental');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [sound, setSound] = useState(null);
  const [metronomeInterval, setMetronomeInterval] = useState(null);
  const [currentBeat, setCurrentBeat] = useState(0);
  const isWeb = Platform.OS === 'web';

  // Ragas with their notes (swaras)
  const ragas = [
    {
      name: 'Yaman',
      aroha: 'Sa Re Ga Ma# Pa Dha Ni Sa',
      avaroha: 'Sa Ni Dha Pa Ma# Ga Re Sa',
      description: 'Evening raga with teevra Ma (sharp 4th)',
      mood: 'Peaceful, devotional',
      level: 'Beginner',
    },
    {
      name: 'Bhairav',
      aroha: 'Sa Re♭ Ga Ma Pa Dha♭ Ni Sa',
      avaroha: 'Sa Ni Dha♭ Pa Ma Ga Re♭ Sa',
      description: 'Morning raga, serious and devotional',
      mood: 'Serious, majestic',
      level: 'Intermediate',
    },
    {
      name: 'Bhupali',
      aroha: 'Sa Re Ga Pa Dha Sa',
      avaroha: 'Sa Dha Pa Ga Re Sa',
      description: 'Pentatonic raga, simple and joyful',
      mood: 'Joyful, bright',
      level: 'Beginner',
    },
    {
      name: 'Darbari Kanada',
      aroha: 'Sa Re♭ Ga Ma Pa Dha♭ Ni♭ Sa',
      avaroha: 'Sa Ni♭ Dha♭ Pa Ma Ga Re♭ Sa',
      description: 'Late night raga, slow and majestic',
      mood: 'Serious, contemplative',
      level: 'Advanced',
    },
    {
      name: 'Malkauns',
      aroha: 'Sa Ga♭ Ma Dha♭ Ni♭ Sa',
      avaroha: 'Sa Ni♭ Dha♭ Ma Ga♭ Sa',
      description: 'Pentatonic late night raga',
      mood: 'Deep, mysterious',
      level: 'Intermediate',
    },
    {
      name: 'Bageshri',
      aroha: 'Sa Ga Ma Dha Ni Sa',
      avaroha: 'Sa Ni Dha Ma Ga Ma Re Sa',
      description: 'Night raga, romantic and serene',
      mood: 'Romantic, peaceful',
      level: 'Intermediate',
    },
  ];

  // Taals (rhythmic cycles)
  const taals = [
    { name: 'Teental', beats: 16, divisions: '4+4+4+4', description: 'Most common taal' },
    { name: 'Jhaptaal', beats: 10, divisions: '2+3+2+3', description: 'Asymmetric taal' },
    { name: 'Ektaal', beats: 12, divisions: '2+2+2+2+2+2', description: 'Slow, contemplative' },
    { name: 'Rupak', beats: 7, divisions: '3+2+2', description: 'Light, fast taal' },
  ];

  useEffect(() => {
    // Configure audio mode
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.error('Error configuring audio:', error);
      }
    };
    
    configureAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (metronomeInterval) {
        clearInterval(metronomeInterval);
      }
    };
  }, [sound, metronomeInterval]);

  // Play metronome click sound
  const playClick = async (isStrongBeat = false) => {
    try {
      if (Platform.OS === 'web') {
        // For web, use Web Audio API to generate a beep
        if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Higher pitch and volume for strong beat (sam)
          oscillator.frequency.value = isStrongBeat ? 1200 : 800;
          oscillator.type = 'sine';
          
          // Volume envelope
          const volume = isStrongBeat ? 0.4 : 0.2;
          gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
          
          // Close audio context after sound plays
          setTimeout(() => {
            audioContext.close();
          }, 100);
        }
      } else {
        // For mobile devices
        // Use haptic feedback for tactile response
        if (isStrongBeat) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } else {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        
        // For now, haptic feedback is the primary indicator on mobile
        // Audio can be added later with proper sound files
      }
    } catch (error) {
      console.error('Error in playClick:', error);
    }
  };

  const startPractice = async () => {
    if (!selectedRaga) {
      Alert.alert('Select a Raga', 'Please select a raga to practice first.');
      return;
    }

    setIsPlaying(true);
    setCurrentBeat(0);

    // Calculate interval in milliseconds from BPM
    const intervalMs = (60 / tempo) * 1000;

    // Get selected taal info
    const taalInfo = taals.find(t => t.name === selectedTaal);
    const totalBeats = taalInfo?.beats || 16;

    // Start metronome
    let beatCount = 0;
    
    // Play first beat immediately
    await playClick(true);

    const interval = setInterval(async () => {
      beatCount = (beatCount + 1) % totalBeats;
      setCurrentBeat(beatCount);
      
      // First beat of cycle is stronger (sam)
      const isStrongBeat = beatCount === 0;
      await playClick(isStrongBeat);
    }, intervalMs);

    setMetronomeInterval(interval);

    const platformMessage = Platform.OS === 'web' 
      ? '\n\n🔊 Listen for audio clicks!\nFirst beat (sam) is higher pitched.'
      : '\n\n📳 Feel the haptic vibrations!\nFirst beat (sam) is stronger.';
    
    Alert.alert(
      '🎵 Practice Started',
      `Raga: ${selectedRaga.name}\nTempo: ${tempo} BPM (${(60/tempo).toFixed(2)}s per beat)\nTaal: ${selectedTaal} (${totalBeats} beats)${platformMessage}\n\n👀 Watch the visual indicator below!`,
      [{ text: 'OK' }]
    );
  };

  const stopPractice = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
    
    if (metronomeInterval) {
      clearInterval(metronomeInterval);
      setMetronomeInterval(null);
    }
    
    if (sound) {
      sound.stopAsync();
    }
  };

  const searchYouTube = (query) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' practice')}`;
    WebBrowser.openBrowserAsync(url);
  };

  const createCustomLoop = () => {
    if (!customNotes.trim()) {
      Alert.alert('Enter Notes', 'Please enter the notes for your custom loop.');
      return;
    }
    
    Alert.alert(
      'Custom Loop Created',
      `Notes: ${customNotes}\nTempo: ${tempo} BPM\nTaal: ${selectedTaal}`,
      [{ text: 'OK' }]
    );
    setShowCustomModal(false);
    setCustomNotes('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎼 Practice Loops</Text>
        <Text style={styles.subtitle}>
          Practice ragas with tanpura drone and metronome
        </Text>
      </View>

      {/* Controls Section */}
      <View style={styles.controlsCard}>
        <Text style={styles.cardTitle}>⚙️ Practice Settings</Text>
        
        {/* Tempo Control */}
        <View style={styles.controlItem}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>Tempo (BPM)</Text>
            <Text style={styles.tempoValue}>{tempo}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={40}
            maximumValue={200}
            step={5}
            value={tempo}
            onValueChange={setTempo}
            minimumTrackTintColor="#667eea"
            maximumTrackTintColor="#333"
            thumbTintColor="#667eea"
          />
          <View style={styles.tempoLabels}>
            <Text style={styles.tempoLabel}>Slow</Text>
            <Text style={styles.tempoLabel}>Medium</Text>
            <Text style={styles.tempoLabel}>Fast</Text>
          </View>
        </View>

        {/* Taal Selection */}
        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Taal (Rhythm Cycle)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.taalContainer}>
              {taals.map((taal) => (
                <TouchableOpacity
                  key={taal.name}
                  style={[
                    styles.taalChip,
                    selectedTaal === taal.name && styles.taalChipActive
                  ]}
                  onPress={() => setSelectedTaal(taal.name)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.taalName,
                      selectedTaal === taal.name && styles.taalNameActive
                    ]}
                  >
                    {taal.name}
                  </Text>
                  <Text style={styles.taalBeats}>{taal.beats} beats</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Raga Selection */}
      <View style={styles.ragasCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🎵 Select Raga</Text>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setShowCustomModal(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color="#667eea" />
            <Text style={styles.customButtonText}>Custom</Text>
          </TouchableOpacity>
        </View>

        {ragas.map((raga, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ragaCard,
              selectedRaga?.name === raga.name && styles.ragaCardActive
            ]}
            onPress={() => setSelectedRaga(raga)}
            activeOpacity={0.8}
          >
            <View style={styles.ragaHeader}>
              <View style={styles.ragaTitleRow}>
                <Text style={styles.ragaName}>{raga.name}</Text>
                <View style={[styles.levelBadge, styles[`level${raga.level}`]]}>
                  <Text style={styles.levelText}>{raga.level}</Text>
                </View>
              </View>
              <Text style={styles.ragaMood}>💭 {raga.mood}</Text>
            </View>
            
            <Text style={styles.ragaDescription}>{raga.description}</Text>
            
            <View style={styles.notesSection}>
              <View style={styles.notesRow}>
                <Text style={styles.notesLabel}>Aroha (Ascending):</Text>
                <Text style={styles.notes}>{raga.aroha}</Text>
              </View>
              <View style={styles.notesRow}>
                <Text style={styles.notesLabel}>Avaroha (Descending):</Text>
                <Text style={styles.notes}>{raga.avaroha}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.youtubeButton}
              onPress={() => searchYouTube(`${raga.name} raga`)}
            >
              <Ionicons name="logo-youtube" size={18} color="#FF0000" />
              <Text style={styles.youtubeButtonText}>Find on YouTube</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Play/Stop Button */}
      {selectedRaga && (
        <View style={styles.playSection}>
          {!isPlaying ? (
            <TouchableOpacity
              style={[styles.playButton, isWeb && styles.playButtonWeb]}
              onPress={startPractice}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={24} color="#fff" />
              <Text style={styles.playButtonText}>Start Practice</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.beatIndicator}>
                <Text style={styles.beatIndicatorLabel}>Current Beat:</Text>
                <View style={styles.beatCounter}>
                  <Text style={styles.beatNumber}>{currentBeat + 1}</Text>
                  <Text style={styles.beatTotal}>/ {taals.find(t => t.name === selectedTaal)?.beats || 16}</Text>
                </View>
                <View style={styles.visualMetronome}>
                  {Array.from({ length: taals.find(t => t.name === selectedTaal)?.beats || 16 }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.beatDot,
                        currentBeat === index && styles.beatDotActive,
                        index === 0 && styles.beatDotSam
                      ]}
                    />
                  ))}
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.stopButton, isWeb && styles.stopButtonWeb]}
                onPress={stopPractice}
                activeOpacity={0.8}
              >
                <Ionicons name="stop" size={24} color="#fff" />
                <Text style={styles.stopButtonText}>Stop Practice</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Custom Loop Modal */}
      <Modal
        visible={showCustomModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Custom Loop</Text>
            
            <TextInput
              style={styles.notesInput}
              placeholder="Enter notes (e.g., Sa Re Ga Ma Pa)"
              placeholderTextColor="#666"
              value={customNotes}
              onChangeText={setCustomNotes}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setShowCustomModal(false);
                  setCustomNotes('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCreateButton}
                onPress={createCustomLoop}
              >
                <Text style={styles.modalCreateText}>Create Loop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Practice Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.cardTitle}>💡 Practice Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Start slow, gradually increase tempo</Text>
          <Text style={styles.tipItem}>• Focus on pitch accuracy first</Text>
          <Text style={styles.tipItem}>• Practice aroha and avaroha separately</Text>
          <Text style={styles.tipItem}>• Record yourself to track progress</Text>
          <Text style={styles.tipItem}>• Practice daily for at least 15-30 minutes</Text>
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
  controlItem: {
    marginBottom: 20,
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
  },
  tempoValue: {
    fontSize: 20,
    color: '#667eea',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  tempoLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempoLabel: {
    fontSize: 12,
    color: '#888',
  },
  taalContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
  },
  taalChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  taalChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  taalName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 4,
  },
  taalNameActive: {
    color: '#fff',
  },
  taalBeats: {
    fontSize: 12,
    color: '#888',
  },
  ragasCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  customButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  ragaCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  ragaCardActive: {
    borderColor: '#667eea',
    backgroundColor: '#2a2a45',
  },
  ragaHeader: {
    marginBottom: 12,
  },
  ragaTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ragaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBeginner: {
    backgroundColor: '#4CAF50',
  },
  levelIntermediate: {
    backgroundColor: '#FF9800',
  },
  levelAdvanced: {
    backgroundColor: '#F44336',
  },
  levelText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  ragaMood: {
    fontSize: 14,
    color: '#aaa',
  },
  ragaDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 20,
  },
  notesSection: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesRow: {
    marginBottom: 8,
  },
  notesLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  youtubeButtonText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
  playSection: {
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 18,
    borderRadius: 12,
  },
  playButtonWeb: {
    cursor: 'pointer',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  beatIndicator: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  beatIndicatorLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  beatCounter: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  beatNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#667eea',
  },
  beatTotal: {
    fontSize: 24,
    color: '#888',
    marginLeft: 8,
  },
  visualMetronome: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    maxWidth: 300,
  },
  beatDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },
  beatDotActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
    transform: [{ scale: 1.5 }],
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  beatDotSam: {
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  stopButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 18,
    borderRadius: 12,
  },
  stopButtonWeb: {
    cursor: 'pointer',
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tipsList: {
    gap: 10,
  },
  tipItem: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCreateButton: {
    flex: 1,
    backgroundColor: '#667eea',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCreateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

