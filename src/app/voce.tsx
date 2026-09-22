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

// @ts-ignore
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { MOCK_VIDEOS } from '../constants/mockData';

export default function VoceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header com Ações */}
      <View style={styles.header}>
        <Text style={styles.title}>Você</Text>
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
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="settings" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cartão de Perfil */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: MOCK_VIDEOS[0].channel.avatar }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Matheus Campos</Text>
            <Text style={styles.handle}>@matheuscampos • Ver canal</Text>
          </View>
        </View>

        {/* Seção de Histórico Recente */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.historyContainer}
        >
          {MOCK_VIDEOS.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.historyCard}
              onPress={() => router.push(`/video/${video.id}` as any)}
            >
              <Image source={{ uri: video.thumbnail }} style={styles.historyThumbnail} />
              <Text style={styles.historyTitle} numberOfLines={2}>
                {video.title}
              </Text>
              <Text style={styles.historyChannel} numberOfLines={1}>
                {video.channel.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de Opções da Conta */}
        <View style={styles.optionsList}>
          <TouchableOpacity style={styles.optionRow}>
            <MaterialIcons name="playlist-play" size={24} color="#ffffff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Playlists</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Feather name="thumbs-up" size={22} color="#ffffff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Vídeos marcados com gostei</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Feather name="download" size={22} color="#ffffff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Downloads</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <MaterialIcons name="local-movies" size={22} color="#ffffff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Seus filmes</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#272727',
  },
  profileInfo: {
    justifyContent: 'center',
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  handle: {
    color: '#aaaaaa',
    fontSize: 13,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#3a3a3a',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  viewAllText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  historyContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  historyCard: {
    width: 140,
  },
  historyThumbnail: {
    width: 140,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#272727',
    marginBottom: 6,
  },
  historyTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  historyChannel: {
    color: '#aaaaaa',
    fontSize: 11,
    marginTop: 2,
  },
  optionsList: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#272727',
    paddingTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionIcon: {
    width: 36,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 15,
  },
});