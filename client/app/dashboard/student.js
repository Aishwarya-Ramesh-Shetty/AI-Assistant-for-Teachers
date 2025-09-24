import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/auth/login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Dashboard Title */}
      <Text style={styles.title}>Student Dashboard</Text>
      <Text style={styles.subtitle}>Welcome! Manage your courses and profile here.</Text>

      {/* My Courses Card */}
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: '#8b5cf6', borderLeftWidth: 6 }]}
        onPress={() => router.push('/dashboard/studentCourses')}
      >
        <Text style={[styles.cardTitle, { color: '#8b5cf6' }]}>My Courses</Text>
        <Text style={styles.cardDesc}>
          View and manage all the courses you are enrolled in.
        </Text>
      </TouchableOpacity>

      {/* Logout Card */}
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: '#ef4444', borderLeftWidth: 6 }]}
        onPress={handleLogout}
      >
        <Text style={[styles.cardTitle, { color: '#ef4444' }]}>Logout</Text>
        <Text style={styles.cardDesc}>
          Sign out of your account safely and securely.
        </Text>
      </TouchableOpacity>

      {/* Profile Settings Card */}
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: '#3b82f6', borderLeftWidth: 6 }]}
        onPress={() => alert('Feature Coming Soon!')}
      >
        <Text style={[styles.cardTitle, { color: '#3b82f6' }]}>Profile Settings</Text>
        <Text style={styles.cardDesc}>
          Update your profile, change password, and customize preferences.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 8,
    textAlign: 'center',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40, // increased margin to create more space before first card
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
});
