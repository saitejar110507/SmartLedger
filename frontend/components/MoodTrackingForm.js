import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function MoodTrackingForm({ onMoodAdd }) {
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    const data = { mood, comment, date: new Date().toISOString().split('T')[0] };

    // Send the mood data to FastAPI
    fetch('https://your-codespace-url/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        Alert.alert('Success', 'Mood recorded successfully');
        onMoodAdd(); // Refresh the mood list
        setMood('');
        setComment('');
      })
      .catch((err) => {
        Alert.alert('Error', 'Failed to record mood');
        console.error(err);
      });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.header}>How are you feeling today?</Text>
      <TextInput
        placeholder="Mood (e.g., happy, sad, stressed)"
        style={styles.input}
        value={mood}
        onChangeText={setMood}
      />
      <TextInput
        placeholder="Add a comment (optional)"
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit Mood" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
