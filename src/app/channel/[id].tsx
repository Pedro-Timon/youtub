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

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Procura os dados do canal com base nos vídeos de teste
  const videoWithChannel = MOCK_VIDEOS.find((v) => v.channel.id === id) || MOCK_VIDEOS[0];
  const { channel } = videoWithChannel;

  const channelVideos = MOCK_VIDEOS.filter((v) => v.channel.id === channel.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Cabeçalho de Navegação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{channel.name}</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner do Canal */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/800/200' }}
            style={styles.bannerImage}
          />
        </View>

        {/* Informações do Perfil */}
        <View style={styles.profileSection}>
          <Image source={{ uri: channel.avatar }} style={styles.avatar} />
          <Text style={styles.channelTitle}>{channel.name}</Text>
          <Text style={styles.channelHandle}>@{channel.id} • {channel.subscribers}</Text>

          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Inscrever-se</Text>
          </TouchableOpacity>
        </View>

        {/* Separador e Lista de Vídeos do Autor */}
        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Vídeos</Text>

        <View style={styles.videoList}>
          {channelVideos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.videoCard}
              onPress={() => router.push(`/video/${item.id}` as any)}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.videoMetrics}>
                  {item.views} • {item.postedAt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 4,
  },
  bannerContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#272727',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginTop: -36,
    borderWidth: 3,
    borderColor: '#0f0f0f',
    marginBottom: 8,
  },
  channelTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  channelHandle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  subscribeButton: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  subscribeText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#272727',
    marginHorizontal: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  videoList: {
    paddingHorizontal: 16,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnail: {
    width: 120,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  videoMetrics: {
    color: '#aaa',
    fontSize: 11,
  },
});