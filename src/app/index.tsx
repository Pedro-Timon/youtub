import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </TouchableOpacity>

      {/* Informações do Vídeo e Canal */}
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
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YouTube</Text>
      </View>

      {/* Feed principal */}
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
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
});