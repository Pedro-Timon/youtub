import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather } from '@expo/vector-icons';

import { searchVideos } from '../services/youtubeApi';

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium?: {
        url: string;
      };
      high?: {
        url: string;
      };
    };
  };
}

export default function PesquisaScreen() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    const searchTerm = query.trim();

    if (!searchTerm || loading) {
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setVideos([]);

    try {
      const results = await searchVideos(searchTerm);
      setVideos(results as YouTubeVideo[]);
    } catch (err) {
      console.error('Erro na pesquisa:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível realizar a pesquisa.'
      );
    } finally {
      setLoading(false);
    }
  }

  // Abre o vídeo dentro do app (tela video/[id]), que também salva no histórico.
  function handleVideoPress(videoId: string) {
    router.push(`/video/${videoId}` as any);
  }

  function renderVideo({ item }: { item: YouTubeVideo }) {
    const thumbnail =
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url;

    return (
      <TouchableOpacity
        style={styles.videoCard}
        activeOpacity={0.8}
        onPress={() => handleVideoPress(item.id.videoId)}
      >
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
          />
        )}

        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.snippet.title}
          </Text>

          <Text style={styles.channelName} numberOfLines={1}>
            {item.snippet.channelTitle}
          </Text>

          <Text style={styles.date}>
            {new Date(item.snippet.publishedAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>

        <Feather
          name="more-vertical"
          size={20}
          color="#ffffff"
        />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* @ts-ignore */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pesquisar</Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#aaaaaa" />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar no YouTube"
          placeholderTextColor="#888888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Feather name="x" size={20} color="#aaaaaa" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading || !query.trim()}
        >
          <Feather
            name="search"
            size={22}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerMessage}>
          <ActivityIndicator size="large" color="#ff0000" />
          <Text style={styles.messageText}>
            Buscando vídeos...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerMessage}>
          <Feather name="alert-circle" size={32} color="#ff5555" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.videoId}
          renderItem={renderVideo}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerMessage}>
          <Feather name="search" size={40} color="#777777" />
          <Text style={styles.messageText}>
            Pesquise vídeos para encontrar resultados.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    height: 55,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#0f0f0f',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 46,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  resultsList: {
    paddingBottom: 20,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  thumbnail: {
    width: 145,
    height: 82,
    borderRadius: 8,
    backgroundColor: '#272727',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  channelName: {
    color: '#aaaaaa',
    fontSize: 12,
    marginBottom: 3,
  },
  date: {
    color: '#888888',
    fontSize: 11,
  },
  centerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 12,
  },
  messageText: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff7777',
    fontSize: 14,
    textAlign: 'center',
  },
} as any);