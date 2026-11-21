import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import { Feather, Ionicons } from '@expo/vector-icons';

const READ_KEY = '@youtube_clone:notifications_read';

interface NotificationItem {
  id: string;
  channelName: string;
  avatar: string;
  text: string;
  time: string;
  thumbnail: string;
  // Destino ao tocar na notificação.
  target: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    channelName: 'Dev Master',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    text: 'Dev Master enviou: Como criar um App Expo com Expo Router em 2026',
    time: 'há 2 horas',
    thumbnail: 'https://picsum.photos/seed/video1/400/225',
    target: '/video/1',
  },
  {
    id: 'n2',
    channelName: 'UI Craft',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    text: 'UI Craft enviou: Clonando a Interface do YouTube no React Native',
    time: 'há 5 horas',
    thumbnail: 'https://picsum.photos/seed/video2/400/225',
    target: '/video/2',
  },
  {
    id: 'n3',
    channelName: 'Dev Master',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    text: 'Dev Master está ao vivo agora: Tirando dúvidas de React Native',
    time: 'há 1 dia',
    thumbnail: 'https://picsum.photos/seed/video3/400/225',
    target: '/channel/dev_master',
  },
  {
    id: 'n4',
    channelName: 'UI Craft',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    text: 'UI Craft respondeu ao seu comentário: "Boa pergunta! Veja o vídeo novo."',
    time: 'há 2 dias',
    thumbnail: 'https://picsum.photos/seed/video4/400/225',
    target: '/channel/ui_craft',
  },
  {
    id: 'n5',
    channelName: 'Dev Master',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    text: 'Dev Master enviou: Armazenamento local com AsyncStorage',
    time: 'há 4 dias',
    thumbnail: 'https://picsum.photos/seed/video5/400/225',
    target: '/channel/dev_master',
  },
  {
    id: 'n6',
    channelName: 'UI Craft',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    text: 'UI Craft enviou: Flexbox na prática em 10 minutos',
    time: 'há 1 semana',
    thumbnail: 'https://picsum.photos/seed/video6/400/225',
    target: '/channel/ui_craft',
  },
];

export default function NotificacoesScreen() {
  const router = useRouter();
  const [readIds, setReadIds] = useState<string[]>([]);

  // Carrega do armazenamento local quais notificações já foram lidas.
  useEffect(() => {
    async function loadRead() {
      try {
        const stored = await AsyncStorage.getItem(READ_KEY);
        if (!stored) return;

        const parsed: unknown = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((id) => typeof id === 'string')
        ) {
          setReadIds(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar notificações lidas:', error);
      }
    }

    loadRead();
  }, []);

  async function saveRead(ids: string[]) {
    setReadIds(ids);
    try {
      await AsyncStorage.setItem(READ_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('Erro ao salvar notificações lidas:', error);
    }
  }

  function handlePress(item: NotificationItem) {
    if (!readIds.includes(item.id)) {
      void saveRead([...readIds, item.id]);
    }
    router.push(item.target as any);
  }

  function markAllAsRead() {
    void saveRead(NOTIFICATIONS.map((item) => item.id));
  }

  const unreadCount = NOTIFICATIONS.filter(
    (item) => !readIds.includes(item.id)
  ).length;

  function renderItem({ item }: { item: NotificationItem }) {
    const isRead = readIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.card, !isRead && styles.cardUnread]}
        activeOpacity={0.8}
        onPress={() => handlePress(item)}
      >
        <View style={styles.dotArea}>
          {!isRead && <View style={styles.unreadDot} />}
        </View>

        <Image source={{ uri: item.avatar }} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.text} numberOfLines={3}>
            {item.text}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

        <Feather name="more-vertical" size={20} color="#ffffff" />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
        </View>

        <TouchableOpacity
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
          style={styles.iconButton}
        >
          <Ionicons
            name="checkmark-done"
            size={24}
            color={unreadCount === 0 ? '#555555' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        {unreadCount > 0
          ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}`
          : 'Tudo em dia'}
      </Text>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    color: '#aaaaaa',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 12,
    gap: 10,
  },
  cardUnread: {
    backgroundColor: '#1a1a2e',
  },
  dotArea: {
    width: 16,
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3ea6ff',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#272727',
  },
  info: {
    flex: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 19,
  },
  time: {
    color: '#aaaaaa',
    fontSize: 12,
    marginTop: 4,
  },
  thumbnail: {
    width: 80,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#272727',
  },
});
