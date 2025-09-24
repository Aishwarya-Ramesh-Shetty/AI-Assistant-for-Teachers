import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TeacherDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/auth/login');
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Teacher Dashboard</Text>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mb-4"
        onPress={() => router.push('/dashboard/courses')}
      >
        <Text className="text-white">Manage Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-500 p-3 rounded mb-4"
        onPress={() => router.push('/dashboard/materials')}
      >
        <Text className="text-white">Upload Materials</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 p-3 rounded"
        onPress={handleLogout}
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
