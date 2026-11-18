import { useRouter } from 'expo-router';
import {
  FlatList,
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
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

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
      {/* @ts-ignore */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Topo / Cabeçalho Principal */}
      <View style={styles.header}>
        {/* Logo Lado Esquerdo */}
        <View style={styles.logoContainer}>
          <FontAwesome name="youtube-play" size={26} color="#FF0000" />
          <Text style={styles.headerTitle}>YouTube</Text>
        </View>

        {/* Ícones Lado Direito (Atualizados conforme a print: Mensagens, Notificações, Pesquisa) */}
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/mensagens' as any)}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/notificacoes' as any)}
          >
            <View>
              <Feather name="bell" size={20} color="#ffffff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>9+</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/pesquisa' as any)}
          >
            <Feather name="search" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Abas de Navegação Horizontal (Início, Inscrições, Música, Ao vivo, Mais) */}
      <View style={styles.subNavContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subNavContent}>
          <TouchableOpacity style={[styles.subNavItem, styles.subNavItemActive]}>
            <Text style={[styles.subNavText, styles.subNavTextActive]}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subNavItem} 
            onPress={() => router.push('/inscricoes' as any)}
          >
            <Text style={styles.subNavText}>Inscrições</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subNavItem} 
            onPress={() => router.push('/musica' as any)}
          >
            <Text style={styles.subNavText}>Música</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subNavItem} 
            onPress={() => router.push('/ao-vivo' as any)}
          >
            <Text style={styles.subNavText}>Ao vivo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subNavItem} 
            onPress={() => router.push('/mais' as any)}
          >
            <Text style={styles.subNavText}>Mais</Text>
          </TouchableOpacity>
        </ScrollView>
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
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingHorizontal: 3,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  subNavContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
    paddingVertical: 8,
    backgroundColor: '#0f0f0f',
  },
  subNavContent: {
    paddingHorizontal: 16,
    gap: 20,
    alignItems: 'center',
  },
  subNavItem: {
    paddingVertical: 4,
  },
  subNavItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000',
  },
  subNavText: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '500',
  },
  subNavTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 12,
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
} as any);