import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_VIDEOS } from '../constants/mockData';

export default function InscricoesScreen() {
  const router = useRouter();

  // Remove canais duplicados a partir do MOCK_VIDEOS
  const channels = Array.from(
    new Map(MOCK_VIDEOS.map((v) => [v.channel.id, v.channel])).values()
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      <Text style={styles.title}>Inscrições</Text>
      <Text style={styles.subtitle}>Canais inscritos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {channels.map((channel) => (
          <TouchableOpacity
            key={channel.id}
            style={styles.channelRow}
            onPress={() => router.push(`/channel/${channel.id}` as any)}
          >
            <Image source={{ uri: channel.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.subscribers}>{channel.subscribers}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: '#272727',
  },
  info: {
    justifyContent: 'center',
  },
  channelName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  subscribers: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});