import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { db, auth } from "../../config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfileScreen() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let unsubscribeSnapshot;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
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
        });
      } else {
        setSongs([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Clicked Songs 🎧</Text>

      <ScrollView style={styles.listBox}>
        {songs.length === 0 ? (
          <Text style={styles.emptyText}>No songs clicked yet.</Text>
        ) : (
          songs.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.linkText}>🎵 {item.song}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  heading: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  listBox: { backgroundColor: "#1e1e1e", padding: 15, borderRadius: 10 },
  emptyText: { color: "#aaa", textAlign: "center", marginTop: 20 },
  linkText: {
    fontSize: 16,
    color: "#4da6ff",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
