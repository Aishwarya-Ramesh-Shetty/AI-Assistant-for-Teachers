import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://your-backend.com/api/courses'); // replace with backend
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createCourse = async () => {
    if (!courseName) return;
    try {
      await axios.post('https://your-backend.com/api/courses', { name: courseName });
      setCourseName('');
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Manage Courses</Text>

      <TextInput
        placeholder="New Course Name"
        className="border p-2 mb-4 rounded"
        value={courseName}
        onChangeText={setCourseName}
      />
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mb-4"
        onPress={createCourse}
      >
        <Text className="text-white text-center font-semibold">Add Course</Text>
      </TouchableOpacity>

      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="border p-4 rounded mb-2">
            <Text className="text-lg">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
