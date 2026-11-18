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
import { MOCK_VIDEOS } from '../constants/mockData';

export default function MusicaScreen() {
  const router = useRouter();

  const musicVideos = MOCK_VIDEOS.map((video, index) => ({
    ...video,
    duration: index % 2 === 0 ? '3:45' : '4:25',
    title: index % 2 === 0 ? 'Mc Don Juan - Versão Acústica (Clipe Oficial)' : 'Zé Vaqueiro - Tenho Medo (slowed + reverb)',
    views: `${(index + 1) * 1.5} mi`,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* @ts-ignore */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header Superior */}
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

      {/* Abas de Navegação Horizontal */}
      <View style={styles.subNavContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subNavContent}>
          <TouchableOpacity 
            style={styles.subNavItem}
            onPress={() => router.push('/' as any)}
          >
            <Text style={styles.subNavText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.subNavItem} 
            onPress={() => router.push('/inscricoes' as any)}
          >
            <Text style={styles.subNavText}>Inscrições</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.subNavItem, styles.subNavItemActive]}>
            <Text style={[styles.subNavText, styles.subNavTextActive]}>Música</Text>
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

      {/* Lista de Vídeos Musicais */}
      <FlatList
        data={musicVideos}
        keyExtractor={(item) => `music-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.9}
            onPress={() => router.push(`/video/${item.id}` as any)}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.durationBadge}>
                <Feather name="music" size={10} color="#ffffff" style={{ marginRight: 3 }} />
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Image source={{ uri: item.channel.avatar }} style={styles.avatar} />

              <View style={styles.textDetails}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.metadataText} numberOfLines={1}>
                  {item.channel.name} • {item.views} visualizações • há 4 anos
                </Text>
              </View>

              <TouchableOpacity style={styles.moreOptions}>
                <Feather name="more-vertical" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 11,
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