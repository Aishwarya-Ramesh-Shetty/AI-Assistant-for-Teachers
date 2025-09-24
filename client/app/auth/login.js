import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('http://10.210.73.231:5000/api/auth/login', { email, password });

      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('userType', res.data.user.role);

      if (res.data.user.role === 'teacher') router.replace('/dashboard/teacher');
      else router.replace('/dashboard/student');

    } catch (err) {
      Alert.alert('Login Failed', err.response?.data?.message || 'Try again');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <Text
        style={styles.signupText}
        onPress={() => router.push('/auth/signup')}
      >
        Don’t have an account? Sign Up
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', marginBottom: 15 },
  button: { width: '100%', marginVertical: 10, padding: 5 },
  signupText: { marginTop: 10, color: '#1e90ff', fontWeight: 'bold' },
});
