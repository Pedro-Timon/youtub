import { View, Text, StyleSheet } from 'react-native';

export default function ShortsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shorts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20,
  },
});