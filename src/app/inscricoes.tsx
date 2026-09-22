import { StyleSheet, Text, View } from 'react-native';

export default function InscricoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscrições</Text>

      <Text style={styles.subtitle}>Canais inscritos</Text>

      <View style={styles.channel}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>

        <Text style={styles.channelName}>Canal de Exemplo</Text>
      </View>

      <View style={styles.channel}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>T</Text>
        </View>

        <Text style={styles.channelName}>Tecnologia</Text>
      </View>

      <View style={styles.channel}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>G</Text>
        </View>

        <Text style={styles.channelName}>Games</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
  },

  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  channelName: {
    color: '#ffffff',
    fontSize: 16,
  },
});