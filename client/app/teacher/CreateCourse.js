import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function CreateCourse() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const router = useRouter();

  const createCourse = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      // Replace with your backend API endpoint
      await axios.post('http://10.210.73.231:5000/api/teacher/create-course', {
        name,
        description,
        accessKey,
      });
      Alert.alert('Success', 'Course created successfully!');
      router.push('/teacher/courses'); // navigate back to courses
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to create course. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => router.push('/teacher/dashboard')}
      >
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>➕ Create New Course</Text>

      <TextInput
        placeholder="Course Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Course Description"
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        placeholder="Access Key (optional)"
        style={styles.input}
        value={accessKey}
        onChangeText={setAccessKey}
      />

      <TouchableOpacity style={styles.createBtn} onPress={createCourse}>
        <Text style={styles.createBtnText}>Create Course</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  backBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  createBtn: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
