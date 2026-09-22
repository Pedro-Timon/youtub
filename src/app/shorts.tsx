import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ShortsScreen() {
  const router = useRouter();

  // Dados mockados do Shorts
  const shortData = {
    channelId: 'dev_master',
    channelName: '@dev_master',
    channelAvatar: 'https://github.com/identicons/dev_master.png',
    title: 'Como criar um App Expo com Expo Router em 2026',
    likes: '142 mil',
    comments: '1.230',
  };

  const handleOpenChannel = () => {
    router.push(`/channel/${shortData.channelId}`);
  };

  return (
    <View style={styles.container}>
      {/* Imagem / Vídeo de fundo do Shorts */}
      <Image
        source={{ uri: 'https://picsum.photos/800/1200' }}
        style={styles.backgroundImage}
      />

      {/* Header superior do Shorts */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shorts</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="camera" size={22} color="#ffffff" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Ações Laterais (Curtir, Comentários, Compartilhar, Remix) */}
      <View style={styles.rightBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up-outline" size={28} color="#ffffff" />
          <Text style={styles.actionText}>{shortData.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-down-outline" size={28} color="#ffffff" />
          <Text style={styles.actionText}>Não gostei</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="insert-comment" size={26} color="#ffffff" />
          <Text style={styles.actionText}>{shortData.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={26} color="#ffffff" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="repeat-outline" size={26} color="#ffffff" />
          <Text style={styles.actionText}>Remix</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé do Shorts: Canal e Título */}
      <View style={styles.bottomOverlay}>
        <View style={styles.channelRow}>
          {/* Clique no Avatar ou Nome direciona para o Canal */}
          <TouchableOpacity 
            style={styles.channelInfo} 
            onPress={handleOpenChannel}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: shortData.channelAvatar }}
              style={styles.avatar}
            />
            <Text style={styles.channelName}>{shortData.channelName}</Text>
          </TouchableOpacity>

          {/* Botão Inscrever-se */}
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Inscrever-se</Text>
          </TouchableOpacity>
        </View>

        {/* Descrição / Título do Shorts */}
        <Text style={styles.shortTitle} numberOfLines={2}>
          {shortData.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  rightBar: {
    position: 'absolute',
    right: 12,
    bottom: 90,
    alignItems: 'center',
    zIndex: 10,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 16,
    right: 80,
    bottom: 20,
    zIndex: 10,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#333333',
  },
  channelName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: '#cc0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subscribeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shortTitle: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 18,
  },
});