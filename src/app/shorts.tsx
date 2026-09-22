import { StyleSheet, Text, View } from 'react-native';

export default function ShortsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shorts</Text>

      <View style={styles.videoArea}>
        <Text style={styles.videoText}>Short em destaque</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 16,
  },

  videoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    marginTop: 16,
  },

  videoText: {
    color: '#ffffff',
    fontSize: 18,
  },
});