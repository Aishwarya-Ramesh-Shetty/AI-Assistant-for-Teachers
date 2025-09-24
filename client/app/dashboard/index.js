import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    const redirectBasedOnRole = async () => {
      const role = await AsyncStorage.getItem('userType');

      if (role === 'teacher') {
        router.replace('/dashboard/teacher');
      } else if (role === 'student') {
        router.replace('/dashboard/student');
      } else {
        router.replace('/auth/login');
      }
    };

    redirectBasedOnRole();
  }, []);

  return null;
}
