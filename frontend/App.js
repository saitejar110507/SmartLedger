import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import NewTransactionForm from './components/NewTransactionForm';
import MoodTrackingForm from './components/MoodTrackingForm'; // Import MoodTrackingForm

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [moods, setMoods] = useState([]);

  const fetchTransactions = () => {
    fetch('https://your-codespace-url/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data.transactions))
      .catch(err => console.error(err));
  };

  const fetchMoods = () => {
    fetch('https://your-codespace-url/moods')
      .then(res => res.json())
      .then(data => setMoods(data.moods))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTransactions();
    fetchMoods(); // Fetch moods data
  }, []);

  const renderTransactionItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name} - ${item.amount}</Text>
      <Text style={styles.date}>{item.date} | {item.category}</Text>
    </View>
  );

  const renderMoodItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.mood}</Text>
      <Text style={styles.date}>{item.date}</Text>
      {item.comment && <Text>{item.comment}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>SmartLedger</Text>

      <MoodTrackingForm onMoodAdd={fetchMoods} /> {/* Mood tracking form */}
      <NewTransactionForm onAdd={fetchTransactions} /> {/* Transaction form */}

      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTransactionItem}
      />

      <Text style={styles.header}>Mood Tracker</Text>
      <FlatList
        data={moods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMoodItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { marginVertical: 8, backgroundColor: '#f1f1f1', padding: 15, borderRadius: 8 },
  name: { fontSize: 16 },
  date: { fontSize: 12, color: '#555' },
});
