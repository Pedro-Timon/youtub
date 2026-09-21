import { useLocalSearchParams, useRouter } from 'expo-router';
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

// @ts-ignore
import { Feather } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '../../constants/mockData';

export default function VideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Busca o vídeo correspondente ao ID recebido na rota
  const video = MOCK_VIDEOS.find((v) => v.id === id) || MOCK_VIDEOS[0];

  const handleChannelPress = () => {
    router.push(`/channel/${video.channel.id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Player de Vídeo / Preview */}
      <View style={styles.playerContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.playerThumbnail} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título do Vídeo */}
        <Text style={styles.title}>{video.title}</Text>

        {/* Estatísticas */}
        <Text style={styles.metrics}>
          {video.views} • {video.postedAt}
        </Text>

        {/* Informações do Canal */}
        <TouchableOpacity style={styles.channelContainer} onPress={handleChannelPress}>
          <Image source={{ uri: video.channel.avatar }} style={styles.avatar} />
          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>{video.channel.name}</Text>
            <Text style={styles.subscribers}>{video.channel.subscribers}</Text>
          </View>
          <View style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Inscrever-se</Text>
          </View>
        </TouchableOpacity>

        {/* Recomendados */}
        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Recomendados</Text>

        {MOCK_VIDEOS.filter((v) => v.id !== video.id).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.relatedCard}
            onPress={() => router.push(`/video/${item.id}` as any)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.relatedThumbnail} />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.relatedChannel}>{item.channel.name}</Text>
              <Text style={styles.relatedMetrics}>{item.views}</Text>
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
  },
  playerContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    position: 'relative',
  },
  playerThumbnail: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metrics: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 16,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#272727',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subscribers: {
    color: '#aaa',
    fontSize: 12,
  },
  subscribeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  subscribeText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#272727',
    marginVertical: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  relatedCard: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  relatedThumbnail: {
    width: 120,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
  },
  relatedInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  relatedTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  relatedChannel: {
    color: '#aaa',
    fontSize: 11,
  },
  relatedMetrics: {
    color: '#aaa',
    fontSize: 11,
  },
});