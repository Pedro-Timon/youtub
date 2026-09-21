import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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

const TABS = ['Início', 'Vídeos', 'Playlists', 'Posts'];

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Início');

  const videoWithChannel = MOCK_VIDEOS.find((v) => v.channel.id === id) || MOCK_VIDEOS[0];
  const { channel } = videoWithChannel;
  const channelVideos = MOCK_VIDEOS.filter((v) => v.channel.id === channel.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{channel.name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Feather name="search" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/800/200' }}
            style={styles.bannerImage}
          />
        </View>

        {/* Perfil (Avatar à esquerda + Informações) */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: channel.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.channelTitle}>{channel.name}</Text>
            <Text style={styles.channelHandle}>@{channel.id}</Text>
            <Text style={styles.channelStats}>
              {channel.subscribers} • {channelVideos.length} vídeos
            </Text>
          </View>
        </View>

        {/* Bio / Descrição */}
        <TouchableOpacity style={styles.bioContainer}>
          <Text style={styles.bioText} numberOfLines={1}>
            Conteúdo sobre programação e desenvolvimento mobile... <Text style={styles.moreText}>mais</Text>
          </Text>
        </TouchableOpacity>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.pillButton, styles.subscribedButton]}>
            <Feather name="bell" size={16} color="#fff" />
            <Text style={styles.subscribedText}>Inscrito</Text>
            <Feather name="chevron-down" size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pillButton, styles.memberButton]}>
            <Ionicons name="star" size={16} color="#fff" />
            <Text style={styles.memberText}>Seja membro</Text>
          </TouchableOpacity>
        </View>

        {/* Abas do Canal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Seção "Para você" (Carrossel Horizontal) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Para você</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {channelVideos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.carouselCard}
              onPress={() => router.push(`/video/${item.id}` as any)}
            >
              <View style={styles.thumbnailWrapper}>
                <Image source={{ uri: item.thumbnail }} style={styles.carouselThumbnail} />
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>11:45</Text>
                </View>
              </View>
              <Text style={styles.carouselTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.carouselMetrics}>
                {item.views} • {item.postedAt}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  bannerContainer: {
    width: '100%',
    height: 90,
    backgroundColor: '#272727',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  channelTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  channelHandle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  channelStats: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  bioText: {
    color: '#aaa',
    fontSize: 12,
  },
  moreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
  },
  subscribedButton: {
    flex: 1,
    backgroundColor: '#272727',
  },
  subscribedText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  memberButton: {
    flex: 1,
    backgroundColor: '#272727',
  },
  memberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 20,
  },
  tabItem: {
    paddingVertical: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 24,
  },
  carouselCard: {
    width: 200,
  },
  thumbnailWrapper: {
    position: 'relative',
    width: 200,
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f1f1f',
    marginBottom: 6,
  },
  carouselThumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 2,
  },
  carouselMetrics: {
    color: '#aaa',
    fontSize: 11,
  },
});