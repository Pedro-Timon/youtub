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
import { Feather, Ionicons } from '@expo/vector-icons';
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

        {/* Estatísticas e Meta-informações */}
        <Text style={styles.metrics}>
          {video.views} • {video.postedAt}
        </Text>

        {/* Informações do Canal */}
        <View style={styles.channelContainer}>
          <TouchableOpacity style={styles.channelLeft} onPress={handleChannelPress}>
            <Image source={{ uri: video.channel.avatar }} style={styles.avatar} />
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{video.channel.name}</Text>
              <Text style={styles.subscribers}>{video.channel.subscribers}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.subscribeActions}>
            <TouchableOpacity style={styles.bellButton}>
              <Feather name="bell" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Inscrever-se</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de Ações Interativas (Pílulas) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsBar}
        >
          {/* Botão de Like/Dislike Unificado */}
          <View style={styles.likeDislikeGroup}>
            <TouchableOpacity style={styles.likeButton}>
              <Feather name="thumbs-up" size={16} color="#fff" />
              <Text style={styles.actionText}>12 mil</Text>
            </TouchableOpacity>
            <View style={styles.dividerVertical} />
            <TouchableOpacity style={styles.dislikeButton}>
              <Feather name="thumbs-down" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Botão Partilhar */}
          <TouchableOpacity style={styles.pillButton}>
            <Feather name="share-2" size={16} color="#fff" />
            <Text style={styles.actionText}>Partilhar</Text>
          </TouchableOpacity>

          {/* Botão Remix */}
          <TouchableOpacity style={styles.pillButton}>
            <Ionicons name="repeat-outline" size={18} color="#fff" />
            <Text style={styles.actionText}>Remix</Text>
          </TouchableOpacity>

          {/* Botão Transferir */}
          <TouchableOpacity style={styles.pillButton}>
            <Feather name="download" size={16} color="#fff" />
            <Text style={styles.actionText}>Transferir</Text>
          </TouchableOpacity>

          {/* Botão Guardar */}
          <TouchableOpacity style={styles.pillButton}>
            <Feather name="bookmark" size={16} color="#fff" />
            <Text style={styles.actionText}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Card de Preview de Comentários */}
        <TouchableOpacity style={styles.commentsCard}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Comentários</Text>
            <Text style={styles.commentsCount}>3</Text>
          </View>

          <View style={styles.commentPreview}>
            <Image
              source={{ uri: video.channel.avatar }}
              style={styles.commentAvatar}
            />
            <Text style={styles.commentText} numberOfLines={2}>
              Pior que estou usando a outra build e gostando bastante do resultado!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Lista de Recomendados */}
        <View style={styles.sectionDivider} />

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
              <Text style={styles.relatedMetrics}>
                {item.views} • {item.postedAt}
              </Text>
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
    padding: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 4,
  },
  metrics: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 12,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  channelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  channelInfo: {
    justifyContent: 'center',
  },
  channelName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subscribers: {
    color: '#aaa',
    fontSize: 11,
  },
  subscribeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bellButton: {
    padding: 8,
    backgroundColor: '#272727',
    borderRadius: 18,
  },
  subscribeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  subscribeText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 13,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    paddingRight: 12,
  },
  likeDislikeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dislikeButton: {
    paddingLeft: 8,
  },
  dividerVertical: {
    width: 1,
    height: 16,
    backgroundColor: '#3f3f3f',
    marginHorizontal: 8,
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  commentsCard: {
    backgroundColor: '#272727',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  commentsTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  commentsCount: {
    color: '#aaa',
    fontSize: 12,
  },
  commentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  commentText: {
    color: '#eee',
    fontSize: 12,
    flex: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#272727',
    marginBottom: 16,
  },
  relatedCard: {
    flexDirection: 'row',
    marginBottom: 16,
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
    lineHeight: 18,
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