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

export default function InscricoesScreen() {
  const router = useRouter();

  // Extrai canais únicos para o carrossel horizontal do topo
  const channels = Array.from(
    new Map(MOCK_VIDEOS.map((v) => [v.channel.id, v.channel])).values()
  );

  const renderVideoCard = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.9}
      onPress={() => router.push(`/video/${item.id}` as any)}
    >
      {/* Thumbnail com badge de duração */}
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        {item.duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        )}
      </View>

      {/* Informações do Vídeo e Canal */}
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => router.push(`/channel/${item.channel.id}` as any)}>
          <Image source={{ uri: item.channel.avatar }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.textDetails}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.metadataText} numberOfLines={1}>
            <Text onPress={() => router.push(`/channel/${item.channel.id}` as any)}>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* @ts-ignore */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header Superior Padrão do App */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <FontAwesome name="youtube-play" size={26} color="#FF0000" />
          <Text style={styles.headerTitle}>YouTube</Text>
        </View>

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

      {/* Abas de Navegação Horizontal do Topo */}
      <View style={styles.subNavContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subNavContent}>
          <TouchableOpacity 
            style={styles.subNavItem}
            onPress={() => router.push('/' as any)}
          >
            <Text style={styles.subNavText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.subNavItem, styles.subNavItemActive]}>
            <Text style={[styles.subNavText, styles.subNavTextActive]}>Inscrições</Text>
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

      {/* Conteúdo com Carrossel de Canais e Feed de Vídeos */}
      <FlatList
        data={MOCK_VIDEOS}
        keyExtractor={(item) => `sub-video-${item.id}`}
        renderItem={renderVideoCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          /* Carrossel Horizontal de Canais Inscritos no Topo */
          <View style={styles.channelsCarouselWrapper}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.channelsScrollContent}
            >
              {channels.map((channel, index) => (
                <TouchableOpacity
                  key={channel.id}
                  style={styles.channelItem}
                  onPress={() => router.push(`/channel/${channel.id}` as any)}
                >
                  <View style={[styles.channelAvatarContainer, index === 0 && styles.channelAvatarActive]}>
                    <Image source={{ uri: channel.avatar }} style={styles.channelAvatar} />
                    {/* Bolinha de notificação azul simulada igual ao app real */}
                    {index % 2 === 0 && <View style={styles.notificationDot} />}
                  </View>
                  <Text style={styles.channelItemName} numberOfLines={1}>
                    {channel.name}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Botão "Todos" no fim do carrossel */}
              <TouchableOpacity style={styles.channelItem}>
                <View style={styles.allButtonCircle}>
                  <Text style={styles.allButtonText}>Todos</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        }
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
  channelsCarouselWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
    paddingVertical: 12,
    backgroundColor: '#0f0f0f',
  },
  channelsScrollContent: {
    paddingHorizontal: 16,
    gap: 16,
    alignItems: 'center',
  },
  channelItem: {
    alignItems: 'center',
    width: 64,
  },
  channelAvatarContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  channelAvatarActive: {
    borderColor: '#3ea6ff', // Borda azul simulando canal com novidades
  },
  channelAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  notificationDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3ea6ff',
    borderWidth: 2,
    borderColor: '#0f0f0f',
  },
  channelItemName: {
    color: '#ffffff',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  allButtonCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#272727',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allButtonText: {
    color: '#3ea6ff',
    fontSize: 13,
    fontWeight: 'bold',
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
} as any);