import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VoceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você</Text>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>V</Text>
        </View>

        <View>
          <Text style={styles.name}>Usuário</Text>
          <Text style={styles.handle}>@usuario</Text>
        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.icon}>🕘</Text>
          <Text style={styles.optionText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.optionText}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.icon}>👍</Text>
          <Text style={styles.optionText}>Vídeos marcados com gostei</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.icon}>⬇️</Text>
          <Text style={styles.optionText}>Downloads</Text>
        </TouchableOpacity>
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

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  handle: {
    color: '#aaaaaa',
    fontSize: 14,
    marginTop: 4,
  },

  options: {
    marginTop: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },

  icon: {
    fontSize: 22,
    width: 45,
  },

  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
});