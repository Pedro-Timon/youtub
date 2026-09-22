import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather, FontAwesome } from '@expo/vector-icons';

import { MOCK_VIDEOS, VideoItem } from '../constants/mockData';

export default function HomeScreen() {
  const router = useRouter();

  const handleVideoPress = (id: string) => {
    router.push(`/video/${id}` as any);
  };

  const handleChannelPress = (channelId: string) => {
    router.push(`/channel/${channelId}` as any);
  };

  const renderVideoCard = ({ item }: { item: VideoItem }) => (
    <View style={styles.cardContainer}>
      {/* Thumbnail do Vídeo */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleVideoPress(item.id)}
        style={styles.thumbnailContainer}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        {item.duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Detalhes do Vídeo e do Canal */}
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => handleChannelPress(item.channel.id)}>
          <Image source={{ uri: item.channel.avatar }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.textDetails}>
          <TouchableOpacity onPress={() => handleVideoPress(item.id)}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>

          <Text style={styles.metadataText} numberOfLines={1}>
            <Text onPress={() => handleChannelPress(item.channel.id)}>
              {item.channel.name}
            </Text>
            {' • '}
            {item.views}
            {' • '}
            {item.postedAt}
          </Text>
        </View>

        <TouchableOpacity style={styles.moreOptions}>
          <Feather name="more-vertical" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Topo / Cabeçalho */}
      <View style={styles.header}>
        {/* Logo Lado Esquerdo */}
        <View style={styles.logoContainer}>
          <FontAwesome name="youtube-play" size={26} color="#FF0000" />
          <Text style={styles.headerTitle}>YouTube</Text>
        </View>

        {/* Ícones Lado Direito */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="cast" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista Principal de Vídeos */}
      <FlatList
        data={MOCK_VIDEOS}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
    backgroundColor: '#0f0f0f',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: -0.8,
    marginLeft: 6,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#1f1f1f',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  textDetails: {
    flex: 1,
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 4,
  },
  metadataText: {
    color: '#aaa',
    fontSize: 12,
  },
  moreOptions: {
    paddingLeft: 8,
  },
});