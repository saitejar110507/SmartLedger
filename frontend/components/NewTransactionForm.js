import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function NewTransactionForm({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    const data = { name, amount: parseFloat(amount), date, category };

    fetch('https://your-codespace-url/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        Alert.alert('Success', res.message);
        onAdd(); // Refresh list
        setName('');
        setAmount('');
        setDate('');
        setCategory('');
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to add transaction');
        console.error(err);
      });
  };

  return (
    <View style={styles.form}>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Amount" style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput placeholder="Date (YYYY-MM-DD)" style={styles.input} value={date} onChangeText={setDate} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <Button title="Add Transaction" onPress={handleSubmit} />
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
});
